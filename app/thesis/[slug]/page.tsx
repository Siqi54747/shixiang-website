import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { marked } from "marked";
import { copy } from "@/content/copy";

interface Params {
  params: { slug: string };
}

const THESES_DIR = path.join(process.cwd(), "content/theses");

function readThesis(slug: string) {
  const file = path.join(THESES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

/**
 * Per-thesis long-form article page (Sequoia-style minimalist typography).
 *
 * Source of truth: `content/theses/<slug>.md` — fetched from the
 * `Siqi54747/UO-articles` archive. Image references in those markdown
 * files have been rewritten to absolute
 * `https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/...`
 * URLs so they resolve as soon as that repo's `images/` dir is pushed.
 *
 * Rendering pipeline:
 *   .md file  -> gray-matter (frontmatter + body split)
 *              -> marked (body → HTML string, GFM enabled)
 *              -> dangerouslySetInnerHTML inside a Tailwind `.prose` container.
 *
 * Layout: single narrow column (max-w 720px), left-aligned, serif
 * headline, Noto Sans SC body at 17px / leading 1.75. No TOC, no
 * sidebar. Links dressed in crimson.
 */
export function generateStaticParams() {
  return copy.thesis.entries.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params) {
  const entry = copy.thesis.entries.find((e) => e.slug === params.slug);
  const thesis = readThesis(params.slug);
  if (!entry) return {};
  const title = (thesis?.data.title as string | undefined) ?? entry.tag;
  const description =
    (thesis?.data.digest as string | undefined) ?? entry.desc;
  return {
    title: `${title} · ${copy.site.name}`,
    description,
  };
}

export default function ThesisDetailPage({ params }: Params) {
  const entry = copy.thesis.entries.find((e) => e.slug === params.slug);
  if (!entry) return notFound();

  const thesis = readThesis(params.slug);
  if (!thesis) return notFound();

  const fm = thesis.data as {
    title?: string;
    publish_date?: string;
    mp_name?: string;
    url?: string;
    digest?: string;
    cover?: string;
  };

  const html = marked.parse(thesis.content, {
    async: false,
    gfm: true,
    breaks: false,
  }) as string;

  return (
    <article className="px-6 md:px-24 py-10 md:py-16">
      <div className="mx-auto max-w-[720px]">
        <Link
          href="/"
          className="inline-block text-[14px] text-ink hover:text-crimson transition-colors"
        >
          ← Back to home
        </Link>

        <p className="mt-10 text-[11px] tracking-label uppercase text-crimson font-medium">
          {entry.tag}
        </p>

        <h1 className="font-serif text-[36px] md:text-[44px] lg:text-[52px] leading-[1.15] text-ink mt-3">
          {fm.title ?? entry.tag}
        </h1>

        {fm.digest && (
          <p className="mt-5 text-[17px] leading-[1.6] text-muted">
            {fm.digest}
          </p>
        )}

        <p className="mt-6 text-[13px] text-meta">
          {fm.publish_date ? `${fm.publish_date}` : ""}
          {fm.publish_date && fm.mp_name ? " · " : ""}
          {fm.mp_name ?? "海外独角兽"}
        </p>

        <div
          className="prose prose-lg mt-10 max-w-none
            prose-headings:font-serif prose-headings:text-ink prose-headings:font-medium
            prose-h2:mt-12 prose-h2:text-[24px]
            prose-h3:mt-10 prose-h3:text-[20px]
            prose-p:text-ink prose-p:leading-[1.8]
            prose-a:text-crimson prose-a:no-underline hover:prose-a:underline
            prose-strong:text-ink
            prose-img:rounded-sm prose-img:border prose-img:border-rule
            prose-blockquote:border-l-crimson prose-blockquote:text-muted prose-blockquote:font-normal prose-blockquote:not-italic
            prose-code:text-crimson prose-code:before:content-none prose-code:after:content-none
            prose-li:text-ink"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {fm.url && (
          <p className="mt-16 pt-8 border-t border-rule text-[13px] text-meta">
            原文首发于{" "}
            <a
              href={fm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson hover:underline"
            >
              海外独角兽微信公众号 ↗
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
