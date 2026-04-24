/**
 * sync-decks-from-base.ts
 *
 * Pulls the "Decks" records from 飞书多维表格 (Lark Base) and
 * overwrites the `decks` array in content/decks.ts. The Base is
 * the editing surface for 运营; this file turns it into the static
 * TypeScript source the Next.js site consumes at build time.
 *
 * Usage:
 *   npm run sync:decks        # reads .env.local, writes content/decks.ts
 *
 * After running, always `git diff content/decks.ts` to eyeball the
 * changes before committing. The sync is additive to version control:
 * every refresh leaves a commit trail, so you can bisect or revert a
 * bad Base edit.
 *
 * Why not run at Vercel build time:
 *   - deploy health would bind to Lark API availability
 *   - token rotation / quota hiccups would block production pushes
 *   - committed snapshots give us an obvious rollback unit
 *
 * Auth model (2026-04-24 — switched from lark-cli user identity to
 * a proper Lark self-built application):
 *   `Shixiang-website-publish` 自建应用 issues a tenant_access_token,
 *   which authorizes Bitable reads via the `bitable:app:readonly`
 *   scope. The app must be added as a Base collaborator (Reader+).
 *   This makes the sync CI-friendly (no personal token), unblocking
 *   future webhook-triggered publishes.
 *
 *   Cover attachment downloads still need `drive:drive:readonly`,
 *   which is pending admin approval. Until that scope lands, the
 *   sync skips the network download and simply preserves whichever
 *   cover file already lives in public/covers/<slug>.<ext>. New
 *   cover uploads in Base will log a warning telling the operator
 *   to place the file manually until the scope is approved.
 *
 * Required env vars (from .env.local or shell):
 *   LARK_APP_ID           Self-built app's App ID (cli_…)
 *   LARK_APP_SECRET       Self-built app's App Secret
 *   LARK_BASE_APP_TOKEN   Decks Base 的 app_token (URL 里的 /base/<token> 段)
 *   LARK_BASE_TABLE_ID    Decks 表的 table_id (tblXXXX)
 *
 * See docs/operations-decks-base.md for the Base schema and the
 * human workflow.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// ----- env ---------------------------------------------------------------

function loadDotEnvLocal(): void {
  try {
    const raw = readFileSync(resolve(".env.local"), "utf-8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      const [, k, v] = m;
      if (process.env[k] === undefined) {
        process.env[k] = v.replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // .env.local is optional — env vars may come from the shell
  }
}

loadDotEnvLocal();

const APP_ID = process.env.LARK_APP_ID;
const APP_SECRET = process.env.LARK_APP_SECRET;
const BASE_APP_TOKEN = process.env.LARK_BASE_APP_TOKEN;
const BASE_TABLE_ID = process.env.LARK_BASE_TABLE_ID;

if (!APP_ID || !APP_SECRET || !BASE_APP_TOKEN || !BASE_TABLE_ID) {
  console.error(
    "[sync-decks] Missing env vars: need LARK_APP_ID + LARK_APP_SECRET + LARK_BASE_APP_TOKEN + LARK_BASE_TABLE_ID."
  );
  console.error(
    "[sync-decks] Copy .env.local.example to .env.local and fill all four."
  );
  process.exit(1);
}

// ----- Lark OpenAPI client -----------------------------------------------
//
// Direct fetch against open.feishu.cn using a tenant_access_token issued
// to the `Shixiang-website-publish` self-built app. Token is cached for
// the duration of the process (sync runs are single-shot, ~5s).

const LARK_HOST = "https://open.feishu.cn";

let cachedTenantToken: string | undefined;

async function getTenantAccessToken(): Promise<string> {
  if (cachedTenantToken) return cachedTenantToken;
  const res = await fetch(`${LARK_HOST}/open-apis/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET }),
  });
  const body = (await res.json()) as { code: number; msg?: string; tenant_access_token?: string };
  if (!res.ok || body.code !== 0 || !body.tenant_access_token) {
    throw new Error(
      `tenant_access_token request failed (http=${res.status}, code=${body.code}): ${body.msg ?? "unknown"}`
    );
  }
  cachedTenantToken = body.tenant_access_token;
  return cachedTenantToken;
}

interface LarkApiResponse<T> {
  code: number;
  msg?: string;
  data?: T;
}

async function larkApi<T>(method: string, path: string, query?: Record<string, string | number | undefined>): Promise<T> {
  const token = await getTenantAccessToken();
  const url = new URL(`${LARK_HOST}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  const body = (await res.json()) as LarkApiResponse<T>;
  if (!res.ok || body.code !== 0) {
    throw new Error(
      `${method} ${path} failed (http=${res.status}, code=${body.code}): ${body.msg ?? JSON.stringify(body).slice(0, 200)}`
    );
  }
  if (body.data === undefined) {
    throw new Error(`${method} ${path} returned no data`);
  }
  return body.data;
}

interface BaseRecord {
  record_id: string;
  fields: Record<string, unknown>;
}

/**
 * Fetch all records from the configured Base table via the Bitable
 * v1 list-records endpoint. The OpenAPI shape already matches our
 * BaseRecord interface (record_id + fields-as-object), no zipping
 * needed unlike the prior lark-cli tabular format.
 *
 * Pagination via page_token; safety cap of 20 pages × 100 records.
 */
async function fetchAllRecords(): Promise<BaseRecord[]> {
  const all: BaseRecord[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < 20; page++) {
    const data = await larkApi<{
      items?: BaseRecord[];
      page_token?: string;
      has_more?: boolean;
    }>("GET", `/open-apis/bitable/v1/apps/${BASE_APP_TOKEN}/tables/${BASE_TABLE_ID}/records`, {
      page_size: 100,
      page_token: pageToken,
    });
    for (const item of data.items ?? []) {
      all.push({ record_id: item.record_id, fields: item.fields ?? {} });
    }
    if (!data.has_more || !data.page_token) break;
    pageToken = data.page_token;
  }
  return all;
}

// ----- field coercion ----------------------------------------------------
//
// Lark Base returns field values in shapes that depend on the column
// type. These helpers normalize them to primitive TS values.

function readText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    return v
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "text" in item) {
          return String((item as { text: unknown }).text ?? "");
        }
        return "";
      })
      .join("");
  }
  if (typeof v === "object" && v !== null) {
    // URL field: { text, link }
    if ("text" in v) return String((v as { text: unknown }).text ?? "");
    if ("link" in v) return String((v as { link: unknown }).link ?? "");
  }
  return "";
}

function readIsoDate(v: unknown): string {
  // Base date fields come as ms-epoch numbers. Operations pick a date
  // in their UTC+8 calendar; the Base stores it as midnight Beijing
  // time (e.g. 2026-04-01 → epoch 1743436800000 = 2026-03-31T16:00:00Z).
  // Naively slicing toISOString() loses a day. Shift by +8h before
  // slicing so the YYYY-MM-DD matches what the operator sees in Base.
  if (typeof v === "number") {
    const shifted = new Date(v + 8 * 60 * 60 * 1000);
    if (Number.isFinite(shifted.getTime())) return shifted.toISOString().slice(0, 10);
  }
  const s = readText(v).trim();
  // Accept YYYY-MM-DD or YYYY/MM/DD directly
  const m = s.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  if (m) {
    const [, y, mo, d] = m;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return s;
}

function readCheckbox(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  const s = readText(v).toLowerCase().trim();
  return s === "true" || s === "yes" || s === "是" || s === "1";
}

function readSingleSelect(v: unknown): string {
  // OpenAPI returns single-select as a plain option-name string
  // (e.g. "published"); historic lark-cli wrapping returned an
  // array, which readText also flattens — works for both.
  return readText(v).trim();
}

function readUrl(v: unknown): string {
  // Bitable URL column comes back as { text, link } via the
  // OpenAPI; readText extracts `text` (= the URL the operator
  // pasted). We also keep a tolerance for "[url](url)" markdown
  // wrapping, in case anyone hand-edits the column type to
  // multi-line text.
  const s = readText(v).trim();
  const m = s.match(/^\[(.+?)\]\((.+?)\)$/);
  return m ? (m[2] || m[1]) : s;
}

function normalizeDriveUrl(url: string): string {
  // Operations fill Embed URL by pasting whatever Google Drive's
  // share dialog gave them — which could be any of:
  //   https://drive.google.com/file/d/<ID>/view
  //   https://drive.google.com/file/d/<ID>/view?usp=sharing
  //   https://drive.google.com/file/d/<ID>/view?usp=drive_link
  //   https://drive.google.com/file/d/<ID>/edit
  //   https://drive.google.com/file/d/<ID>/preview   (already correct)
  //   https://drive.google.com/open?id=<ID>
  //
  // iframe embedding only renders reliably with the /preview form
  // (decisions.md 2026-04-19 locked this). Canonicalize any Drive
  // URL that carries a file ID; leave non-Drive URLs untouched.
  if (!url) return url;
  const pathMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) {
    return `https://drive.google.com/file/d/${pathMatch[1]}/preview`;
  }
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/file/d/${openMatch[1]}/preview`;
  }
  return url;
}

function readCommaList(v: unknown): string[] {
  const s = readText(v);
  if (!s.trim()) return [];
  return s
    .split(/[,，\n]/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function readParagraphs(v: unknown): string[] | undefined {
  const s = readText(v);
  if (!s.trim()) return undefined;
  const blankSplit = s
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Heuristic: operations sometimes type a numbered list separating
  // items with single newlines instead of blank lines, which would
  // collapse into one big <p>. If a paragraph contains \n-separated
  // lines AND at least 2 of those lines start with a list marker
  // (`1.` / `2.` / `•` / `-`), treat each line as its own paragraph.
  // Plain prose with soft line breaks is left untouched.
  const out: string[] = [];
  for (const para of blankSplit) {
    if (!para.includes("\n")) {
      out.push(para);
      continue;
    }
    const lines = para.split(/\n/).map((l) => l.trim()).filter(Boolean);
    const listMarkerCount = lines.filter((l) => /^(\d+\.\s|[•·▪]\s|-\s)/.test(l)).length;
    if (lines.length >= 2 && listMarkerCount >= 2) {
      out.push(...lines);
    } else {
      out.push(para);
    }
  }
  return out.length > 0 ? out : undefined;
}

interface AttachmentRef {
  file_token: string;
  name: string;
  type?: string;
}

function readFirstAttachment(v: unknown): AttachmentRef | undefined {
  if (!Array.isArray(v) || v.length === 0) return undefined;
  const first = v[0];
  if (!first || typeof first !== "object") return undefined;
  const ft = (first as { file_token?: unknown }).file_token;
  if (typeof ft !== "string" || !ft) return undefined;
  return {
    file_token: ft,
    name: String((first as { name?: unknown }).name ?? ""),
    type: typeof (first as { type?: unknown }).type === "string"
      ? ((first as { type?: string }).type as string)
      : undefined,
  };
}

/**
 * Resolve the local cover path for a deck whose Base record carries
 * a Cover attachment. We do NOT download anything here — the
 * `drive:drive:readonly` scope on the self-built app is still under
 * admin review, so the network fetch would 403.
 *
 * Strategy until the scope lands:
 *   - if a file already exists at public/covers/<slug>.<ext> for any
 *     supported ext, reuse it (preserves the featured deck's cover
 *     across syncs)
 *   - if Base has a Cover attachment but no local file, log a warning
 *     so the operator knows to drop the file in by hand
 *
 * Once `drive:drive:readonly` is approved, swap this function back
 * to a real download via `larkApi("GET", "/open-apis/drive/v1/medias/<token>/download")`
 * (note: that endpoint returns binary, so it'll need a fetch path
 * separate from `larkApi<T>`).
 */
const COVER_EXT_PRIORITY = ["png", "jpg", "jpeg", "webp", "gif", "avif"] as const;

function findExistingCover(slug: string): string | undefined {
  const outDir = resolve("public/covers");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  for (const ext of COVER_EXT_PRIORITY) {
    if (existsSync(resolve(outDir, `${slug}.${ext}`))) {
      const normExt = ext === "jpeg" ? "jpg" : ext;
      return `/covers/${slug}.${normExt}`;
    }
  }
  return undefined;
}

// ----- Deck shape (matches content/decks.ts Deck interface) --------------

interface Deck {
  slug: string;
  title: string;
  subtitle: string;
  quarter: string;
  publishedDate: string;
  embedUrl: string;
  featured: boolean;
  status: "draft" | "published";
  relatedSlugs?: string[];
  intro?: string[];
  cover?: string;
  summary?: string;
}

// Base column-name → Deck field mapping. Keep in sync with
// docs/operations-decks-base.md.
const COL = {
  slug: "Slug",
  title: "Title (EN)",
  subtitle: "Subtitle (CN)",
  quarter: "Quarter",
  publishedDate: "Published Date",
  embedUrl: "Embed URL",
  featured: "Featured",
  status: "Status",
  relatedSlugs: "Related Slugs",
  intro: "Intro",
  cover: "Cover",
  summary: "Summary",
} as const;

function recordToDeck(record: BaseRecord): Deck {
  const f = record.fields;
  const status = readSingleSelect(f[COL.status]).toLowerCase();
  const relatedSlugs = readCommaList(f[COL.relatedSlugs]);
  const summary = readText(f[COL.summary]).trim();

  return {
    slug: readText(f[COL.slug]).trim(),
    title: readText(f[COL.title]).trim(),
    subtitle: readText(f[COL.subtitle]).trim(),
    quarter: readText(f[COL.quarter]).trim(),
    publishedDate: readIsoDate(f[COL.publishedDate]),
    embedUrl: normalizeDriveUrl(readUrl(f[COL.embedUrl])),
    featured: readCheckbox(f[COL.featured]),
    status: status === "draft" ? "draft" : "published",
    ...(relatedSlugs.length > 0 ? { relatedSlugs } : {}),
    intro: readParagraphs(f[COL.intro]),
    ...(summary ? { summary } : {}),
  };
}

function validateDecks(decks: Deck[]): void {
  const seenSlugs = new Set<string>();
  let featuredPublishedCount = 0;
  for (const d of decks) {
    if (!d.slug) {
      throw new Error(
        `Record missing slug: ${JSON.stringify(d).slice(0, 120)}...`
      );
    }
    if (seenSlugs.has(d.slug)) {
      throw new Error(`Duplicate slug: ${d.slug}`);
    }
    seenSlugs.add(d.slug);
    if (d.featured && d.status === "published") featuredPublishedCount++;
    if (!d.title || !d.subtitle || !d.quarter || !d.publishedDate) {
      throw new Error(
        `Deck '${d.slug}' missing required fields (title/subtitle/quarter/publishedDate)`
      );
    }
  }
  if (featuredPublishedCount > 1) {
    throw new Error(
      `Exactly one published deck can be featured, found ${featuredPublishedCount}.`
    );
  }
}

// ----- serialize back into content/decks.ts ------------------------------

function serialize(decks: Deck[]): string {
  const lines: string[] = [];
  for (const d of decks) {
    lines.push("  {");
    lines.push(`    slug: ${q(d.slug)},`);
    lines.push(`    title: ${q(d.title)},`);
    lines.push(`    subtitle: ${q(d.subtitle)},`);
    lines.push(`    quarter: ${q(d.quarter)},`);
    lines.push(`    publishedDate: ${q(d.publishedDate)},`);
    lines.push(`    embedUrl: ${q(d.embedUrl)},`);
    lines.push(`    featured: ${d.featured},`);
    lines.push(`    status: ${q(d.status)},`);
    if (d.relatedSlugs && d.relatedSlugs.length > 0) {
      lines.push(
        `    relatedSlugs: [${d.relatedSlugs.map(q).join(", ")}],`
      );
    }
    if (d.intro && d.intro.length > 0) {
      lines.push(`    intro: [`);
      for (const p of d.intro) lines.push(`      ${q(p)},`);
      lines.push(`    ],`);
    }
    if (d.cover) lines.push(`    cover: ${q(d.cover)},`);
    if (d.summary) lines.push(`    summary: ${q(d.summary)},`);
    lines.push("  },");
  }
  return lines.join("\n");
}

function q(s: string): string {
  // Double-quoted JSON-style escaping. Safe for the kind of content we
  // get from Base (strings, no control characters expected).
  return JSON.stringify(s);
}

function overwriteDecksArray(newBody: string): void {
  const filePath = resolve("content/decks.ts");
  const original = readFileSync(filePath, "utf-8");
  const start = "// SYNC:START";
  const end = "// SYNC:END";
  const startIdx = original.indexOf(start);
  const endIdx = original.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(
      `SYNC markers not found in ${filePath}; cannot splice decks array.`
    );
  }
  // Preserve the SYNC:START line (with its trailing comment) and the
  // `export const decks: Deck[] = [` line; replace only the items.
  const head =
    original.slice(0, startIdx) +
    start +
    " — `decks` array synced from 飞书 Lark Base, do not edit by hand\n" +
    "export const decks: Deck[] = [\n";
  const tail = "\n];\n" + end + original.slice(endIdx + end.length);
  writeFileSync(filePath, head + newBody + tail, "utf-8");
}

// ----- main --------------------------------------------------------------

async function main(): Promise<void> {
  console.log("[sync-decks] fetching records from Base via Lark OpenAPI...");
  const records = await fetchAllRecords();
  console.log(`[sync-decks] received ${records.length} records`);

  const decks = records.map(recordToDeck);
  validateDecks(decks);

  // Pair each record back to its deck so we can resolve the Cover
  // column (attachments are non-primitive, handled outside recordToDeck).
  // Until drive:drive:readonly is approved we don't download — we just
  // surface whichever file already lives in public/covers/.
  for (let i = 0; i < records.length; i++) {
    const att = readFirstAttachment(records[i].fields[COL.cover]);
    if (!att) continue;
    const localPath = findExistingCover(decks[i].slug);
    if (localPath) {
      decks[i].cover = localPath;
    } else {
      console.warn(
        `[sync-decks] cover attachment present in Base for '${decks[i].slug}' but no local file at public/covers/${decks[i].slug}.{png,jpg,…}. Drop it in manually until drive:drive:readonly is approved.`
      );
    }
  }

  // Sort newest first — matches getPublishedDecks() default ordering
  decks.sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

  const body = serialize(decks);
  overwriteDecksArray(body);
  console.log(
    `[sync-decks] wrote ${decks.length} decks to content/decks.ts`
  );
  console.log("[sync-decks] next: git diff content/decks.ts");
}

main().catch((err) => {
  console.error("[sync-decks] FAILED:", err instanceof Error ? err.message : err);
  process.exit(1);
});
