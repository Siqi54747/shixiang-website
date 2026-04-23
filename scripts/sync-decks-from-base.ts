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
 * Required env vars (from .env.local or shell):
 *   LARK_APP_ID           拾象飞书应用 app_id
 *   LARK_APP_SECRET       拾象飞书应用 app_secret
 *   LARK_BASE_APP_TOKEN   Decks Base 的 app_token (URL 里的 bascnXXXX 段)
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
    "[sync-decks] Missing env vars. Need LARK_APP_ID / LARK_APP_SECRET / LARK_BASE_APP_TOKEN / LARK_BASE_TABLE_ID."
  );
  console.error(
    "[sync-decks] Copy .env.local.example to .env.local and fill the values, or export them in your shell."
  );
  process.exit(1);
}

// ----- Lark API client ---------------------------------------------------

const LARK_BASE_URL = "https://open.feishu.cn/open-apis";

async function getTenantToken(): Promise<string> {
  const res = await fetch(
    `${LARK_BASE_URL}/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET }),
    }
  );
  const body = (await res.json()) as {
    code: number;
    msg: string;
    tenant_access_token?: string;
  };
  if (body.code !== 0 || !body.tenant_access_token) {
    throw new Error(`tenant_access_token failed: code=${body.code} msg=${body.msg}`);
  }
  return body.tenant_access_token;
}

interface BaseRecord {
  record_id: string;
  fields: Record<string, unknown>;
}

async function fetchAllRecords(token: string): Promise<BaseRecord[]> {
  const all: BaseRecord[] = [];
  let pageToken: string | undefined;
  // safety cap — we don't expect more than a handful of decks
  for (let i = 0; i < 20; i++) {
    const params = new URLSearchParams({ page_size: "100" });
    if (pageToken) params.set("page_token", pageToken);
    const url = `${LARK_BASE_URL}/bitable/v1/apps/${BASE_APP_TOKEN}/tables/${BASE_TABLE_ID}/records?${params}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = (await res.json()) as {
      code: number;
      msg: string;
      data?: {
        items?: BaseRecord[];
        has_more?: boolean;
        page_token?: string;
      };
    };
    if (body.code !== 0) {
      throw new Error(`records fetch failed: code=${body.code} msg=${body.msg}`);
    }
    all.push(...(body.data?.items ?? []));
    if (!body.data?.has_more) break;
    pageToken = body.data.page_token;
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
  // Base date fields come as ms-epoch numbers
  if (typeof v === "number") {
    const d = new Date(v);
    if (Number.isFinite(d.getTime())) return d.toISOString().slice(0, 10);
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
  // Lark 单选 returns string or { text }
  return readText(v).trim();
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
  const paras = s
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paras.length > 0 ? paras : undefined;
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
 * Download a cover attachment to public/covers/<slug>.<ext>.
 *
 * Uses Lark's drive media download endpoint; tenant access token has
 * read permission because the Lark app is a collaborator on the Base.
 *
 * File extension strategy:
 *   1. Prefer the extension from the attachment's original `name` (if any).
 *   2. Fall back to sniffing the Content-Type.
 *   3. Default to `.jpg` if nothing matches.
 *
 * Returns the public path (`/covers/<slug>.<ext>`) on success, or
 * undefined on failure (warn logged, not thrown — a missing cover
 * should never block the sync of the remaining data).
 */
async function downloadCover(
  token: string,
  attachment: AttachmentRef,
  slug: string
): Promise<string | undefined> {
  const url = `${LARK_BASE_URL}/drive/v1/medias/${encodeURIComponent(
    attachment.file_token
  )}/download`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.warn(
      `[sync-decks] cover download failed for '${slug}': HTTP ${res.status}`
    );
    return undefined;
  }
  const ctype = (res.headers.get("content-type") ?? "").toLowerCase();
  const nameExt = attachment.name.match(/\.([a-zA-Z0-9]+)$/)?.[1]?.toLowerCase();
  const ext =
    nameExt && /^(jpg|jpeg|png|webp|gif|avif)$/.test(nameExt)
      ? nameExt === "jpeg"
        ? "jpg"
        : nameExt
      : ctype.includes("png")
      ? "png"
      : ctype.includes("webp")
      ? "webp"
      : ctype.includes("gif")
      ? "gif"
      : ctype.includes("avif")
      ? "avif"
      : "jpg";

  const outDir = resolve("public/covers");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `${slug}.${ext}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
  console.log(
    `[sync-decks] cover downloaded: ${outPath} (${buf.length} bytes)`
  );
  return `/covers/${slug}.${ext}`;
}

// ----- Deck shape (matches content/decks.ts Deck interface) --------------

interface Deck {
  slug: string;
  title: string;
  subtitle: string;
  quarter: string;
  publishedDate: string;
  embedUrl: string;
  summary: string;
  featured: boolean;
  status: "draft" | "published";
  relatedSlugs?: string[];
  intro?: string[];
  cover?: string;
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
  summary: "Summary",
  featured: "Featured",
  status: "Status",
  relatedSlugs: "Related Slugs",
  intro: "Intro",
  cover: "Cover",
} as const;

function recordToDeck(record: BaseRecord): Deck {
  const f = record.fields;
  const status = readSingleSelect(f[COL.status]).toLowerCase();
  const relatedSlugs = readCommaList(f[COL.relatedSlugs]);

  return {
    slug: readText(f[COL.slug]).trim(),
    title: readText(f[COL.title]).trim(),
    subtitle: readText(f[COL.subtitle]).trim(),
    quarter: readText(f[COL.quarter]).trim(),
    publishedDate: readIsoDate(f[COL.publishedDate]),
    embedUrl: readText(f[COL.embedUrl]).trim(),
    summary: readText(f[COL.summary]).trim(),
    featured: readCheckbox(f[COL.featured]),
    status: status === "draft" ? "draft" : "published",
    ...(relatedSlugs.length > 0 ? { relatedSlugs } : {}),
    intro: readParagraphs(f[COL.intro]),
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
    if (!d.title || !d.subtitle || !d.quarter || !d.publishedDate || !d.summary) {
      throw new Error(
        `Deck '${d.slug}' missing required fields (title/subtitle/quarter/publishedDate/summary)`
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
    lines.push(`    summary: ${q(d.summary)},`);
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

async function main() {
  console.log("[sync-decks] fetching tenant_access_token...");
  const token = await getTenantToken();

  console.log("[sync-decks] fetching records from Base...");
  const records = await fetchAllRecords(token);
  console.log(`[sync-decks] received ${records.length} records`);

  const decks = records.map(recordToDeck);
  validateDecks(decks);

  // Pair each record back to its deck so we can pull the Cover
  // attachment column (non-primitive, handled outside recordToDeck).
  // Serial, not parallel — no good reason to hammer the drive API
  // and we're downloading a handful of files at most.
  for (let i = 0; i < records.length; i++) {
    const att = readFirstAttachment(records[i].fields[COL.cover]);
    if (!att) continue;
    const localPath = await downloadCover(token, att, decks[i].slug);
    if (localPath) decks[i].cover = localPath;
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
