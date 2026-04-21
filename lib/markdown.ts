/**
 * Preprocessing rules for thesis markdown sourced from Siqi54747/UO-articles.
 *
 * The UO-articles archive is reasonably clean CommonMark, but since the
 * original source is a WeChat public-account export, it carries four
 * predictable quirks that hurt our Sequoia-minimalist thesis pages:
 *
 *   1. `****`  — adjacent bold runs concatenated with no separator
 *                ("**A****B**"), CommonMark's bold parser bails and
 *                leaves the `**` as literal text.
 *   2. leading cover-image link — the first body line of every article
 *                is `[![cover](url)](wechat-url)` (a thumbnail that
 *                links back to the original WeChat post). Since we show
 *                a source-link footer of our own, and the image URL
 *                often 404s on our side, this row renders as a stray
 *                horizontal rule. Strip it.
 *   3. "**NN.**\n\n**title**"
 *                — section numbers are emitted as a standalone bold
 *                paragraph followed by a separate bold paragraph for
 *                the heading. Visually splits onto two lines. Merge
 *                them.
 *   4. tail boilerplate — every article ends with a "排版：<name>"
 *                credit line, followed by a "延伸阅读" section that's
 *                just 4-6 related-article cards. Not relevant to our
 *                thesis page; strip from "排版：" onward.
 *
 * This function runs once per thesis on build (SSG), so cost is trivial.
 */
export function preprocessThesisMarkdown(body: string): string {
  let md = body;

  // Rule 1 — split welded bold runs
  md = md.replace(/\*{4,}/g, "** **");

  // Rule 4 — strip tail boilerplate (do this before other rules so we
  // don't waste cycles rewriting paragraphs we'll throw away)
  const tailMatch = md.match(/^[\s>]*排版[：:].*$/m);
  if (tailMatch && tailMatch.index !== undefined) {
    md = md.slice(0, tailMatch.index).trimEnd() + "\n";
  }

  // Rule 2 — strip leading cover-image link (first non-whitespace line
  // of body matches the image-wrapped-in-link pattern)
  md = md.replace(
    /^\s*\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*\n+/,
    ""
  );

  // Rule 3 — merge "**NN.**" standalone paragraph with the "**title**"
  // paragraph that follows it
  md = md.replace(
    /\*\*\s*(\d{1,2}\.)\s*\*\*\s*\n\s*\n\s*\*\*\s*([^\n]+?)\s*\*\*/g,
    "**$1 $2**"
  );

  return md;
}
