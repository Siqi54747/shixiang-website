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
 * Auth model:
 *   Piggyback on the local `lark-cli` install's logged-in user
 *   identity (Siqi). No separate Lark app / tenant token to manage.
 *   Prerequisite: the user has run `lark-cli auth login --domain base`
 *   at least once; the CLI refreshes tokens automatically thereafter.
 *   Since sync is always a local, manual operation (never in CI), a
 *   user-bound token is the right fit — no "headless bot app must be
 *   added as Base collaborator" step required.
 *
 * Required env vars (from .env.local or shell):
 *   LARK_BASE_APP_TOKEN   Decks Base 的 app_token (URL 里的 /base/<token> 段)
 *   LARK_BASE_TABLE_ID    Decks 表的 table_id (tblXXXX)
 *
 * See docs/operations-decks-base.md for the Base schema and the
 * human workflow.
 */

import { execFileSync } from "node:child_process";
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

const BASE_APP_TOKEN = process.env.LARK_BASE_APP_TOKEN;
const BASE_TABLE_ID = process.env.LARK_BASE_TABLE_ID;

if (!BASE_APP_TOKEN || !BASE_TABLE_ID) {
  console.error(
    "[sync-decks] Missing env vars: LARK_BASE_APP_TOKEN / LARK_BASE_TABLE_ID."
  );
  console.error(
    "[sync-decks] Copy .env.local.example to .env.local and fill the 2 Base identifiers."
  );
  process.exit(1);
}

// ----- Lark CLI client ---------------------------------------------------
//
// Every Lark interaction shells out to `lark-cli` with --as user so we
// ride on whoever did `lark-cli auth login` locally. Errors from the
// CLI bubble up via the stderr of its child process.

function larkCli(args: string[]): string {
  try {
    const out = execFileSync("lark-cli", args, {
      encoding: "utf-8",
      maxBuffer: 64 * 1024 * 1024,
    });
    return out;
  } catch (err) {
    const e = err as { status?: number; stderr?: Buffer | string; stdout?: Buffer | string; message?: string };
    const stderr = e.stderr ? e.stderr.toString() : "";
    const stdout = e.stdout ? e.stdout.toString() : "";
    throw new Error(
      `lark-cli ${args.join(" ")} failed (code=${e.status ?? "?"}): ${stderr || stdout || e.message || "unknown"}`
    );
  }
}

interface BaseRecord {
  record_id: string;
  fields: Record<string, unknown>;
}

/**
 * Fetch all records from the configured Base table, normalized to the
 * { record_id, fields: { <colName>: <val> } } shape the rest of this
 * script expects.
 *
 * lark-cli's +record-list returns a tabular format rather than a list
 * of record objects:
 *   {
 *     data: {
 *       fields: ["Slug", "Intro", ...],       // column names, in order
 *       data: [["slug1", "...", ...], ...],   // each sub-array = one row
 *       record_id_list: ["recXXX", ...],
 *       has_more, ...
 *     }
 *   }
 * We zip `fields` with each row to rebuild a per-record dict.
 */
function fetchAllRecords(): BaseRecord[] {
  const all: BaseRecord[] = [];
  let offset = 0;
  const limit = 100;
  for (let page = 0; page < 20; page++) {
    const raw = larkCli([
      "base",
      "+record-list",
      "--base-token",
      BASE_APP_TOKEN as string,
      "--table-id",
      BASE_TABLE_ID as string,
      "--limit",
      String(limit),
      "--offset",
      String(offset),
      "--as",
      "user",
    ]);
    const body = JSON.parse(raw) as {
      ok: boolean;
      data?: {
        data?: unknown[][];
        fields?: string[];
        record_id_list?: string[];
        has_more?: boolean;
      };
      error?: unknown;
    };
    if (!body.ok || !body.data) {
      throw new Error(`record-list failed: ${JSON.stringify(body.error ?? body)}`);
    }
    const colNames = body.data.fields ?? [];
    const rows = body.data.data ?? [];
    const ids = body.data.record_id_list ?? [];
    for (let i = 0; i < rows.length; i++) {
      const fields: Record<string, unknown> = {};
      const row = rows[i];
      for (let c = 0; c < colNames.length; c++) {
        fields[colNames[c]] = row[c];
      }
      all.push({ record_id: ids[i] ?? "", fields });
    }
    if (!body.data.has_more || rows.length === 0) break;
    offset += rows.length;
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
  // lark-cli returns single-select as ["optionName"]; readText
  // joins array elements so this collapses to the option name.
  return readText(v).trim();
}

function readUrl(v: unknown): string {
  // The Base URL column, when fetched via lark-cli, serializes as
  // "[url](url)" Markdown. Strip that shell to get the bare href.
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
 * Shells out to `lark-cli api GET /open-apis/drive/v1/medias/<token>/download`
 * with `--as user` (same identity used for record-list). lark-cli
 * handles user-token refresh and writes the binary response straight
 * to the `-o` path.
 *
 * File extension strategy:
 *   1. Prefer the extension from the attachment's original `name`.
 *   2. Fall back to `.jpg` if nothing sensible is there.
 *
 * Returns the public path (`/covers/<slug>.<ext>`) on success, or
 * undefined on failure (warn logged, not thrown — a missing cover
 * should never block the sync of the remaining data).
 */
function downloadCover(
  attachment: AttachmentRef,
  slug: string
): string | undefined {
  const nameExt = attachment.name.match(/\.([a-zA-Z0-9]+)$/)?.[1]?.toLowerCase();
  const ext =
    nameExt && /^(jpg|jpeg|png|webp|gif|avif)$/.test(nameExt)
      ? nameExt === "jpeg"
        ? "jpg"
        : nameExt
      : "jpg";

  const outDir = resolve("public/covers");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `${slug}.${ext}`);

  try {
    larkCli([
      "api",
      "GET",
      `/open-apis/drive/v1/medias/${attachment.file_token}/download`,
      "--as",
      "user",
      "-o",
      outPath,
    ]);
  } catch (err) {
    console.warn(
      `[sync-decks] cover download failed for '${slug}': ${(err as Error).message.slice(0, 200)}`
    );
    return undefined;
  }

  if (!existsSync(outPath)) {
    console.warn(
      `[sync-decks] cover download for '${slug}' produced no file at ${outPath}`
    );
    return undefined;
  }
  console.log(`[sync-decks] cover downloaded: ${outPath}`);
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
    embedUrl: normalizeDriveUrl(readUrl(f[COL.embedUrl])),
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

function main() {
  console.log("[sync-decks] fetching records from Base via lark-cli...");
  const records = fetchAllRecords();
  console.log(`[sync-decks] received ${records.length} records`);

  const decks = records.map(recordToDeck);
  validateDecks(decks);

  // Pair each record back to its deck so we can pull the Cover
  // attachment column (non-primitive, handled outside recordToDeck).
  // Serial — lark-cli shells one process per call and the cover count
  // is always tiny.
  for (let i = 0; i < records.length; i++) {
    const att = readFirstAttachment(records[i].fields[COL.cover]);
    if (!att) continue;
    const localPath = downloadCover(att, decks[i].slug);
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

try {
  main();
} catch (err) {
  console.error("[sync-decks] FAILED:", err instanceof Error ? err.message : err);
  process.exit(1);
}
