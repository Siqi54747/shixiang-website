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

  // Rule 1 — stitch welded bold runs.
  //
  // `**A****B**` in the export is almost always one intended bold
  // ("AB") where the WeChat source had an inline style boundary that
  // survived as `****`. Older iterations of this rule split the run
  // into `** **`, which left two adjacent bolds that downstream rules
  // (Rule 3, P2) could not recognize as a single heading. Stitching
  // them back together produces the author's intended single strong
  // span and lets later structural rules fire correctly.
  md = md.replace(/\*{4,}/g, "");

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

/**
 * HTML-level post-processing after marked.parse.
 *
 * A systematic sweep of all four theses (2026-04-21) showed marked
 * leaves behind a meaningful amount of literal emphasis markers that
 * the pre-parse rules in preprocessThesisMarkdown() cannot reach —
 * because they live *inside* paragraphs, not as structural patterns:
 *
 *   agi-labs        21 bare **, 3 bare __
 *   robotics        42 bare **, 1 bare __
 *   ai-for-science 120 bare **, 0 bare __
 *   agent-native    18 bare **, 10 bare __
 *                  ---  ---
 *   total          201 bare **, 14 bare __
 *
 * Root cause patterns we observed:
 *   - opened bold mid-paragraph but closing `**` sits across a
 *     paragraph break — marked's emphasis rule forbids that, so it
 *     keeps the opener as literal text
 *   - CJK punctuation welded to `**` so opener/closer boundary
 *     detection fails in CommonMark's left-flanking / right-flanking
 *     rules
 *
 * Fixing either rigorously means either swapping to a more permissive
 * parser (markdown-it) or doing structural rewrites that risk damaging
 * correctly-authored markdown elsewhere. Both are disproportionate to
 * the payoff. Pragmatic fix: strip the residual `**` / `__` markers
 * from the produced HTML — we lose a handful of intended bolds (that
 * were already broken at the markdown layer) in exchange for clean
 * reading text. The post-processor runs after marked has already
 * converted all properly-balanced bolds to `<strong>`, so legitimate
 * emphasis is fully preserved.
 */
export function postprocessThesisHtml(html: string): string {
  let out = html;

  // Rule P1 — strip residual emphasis markers that marked couldn't
  // resolve (see function header). ** first, __ second.
  out = out.replace(/\*\*/g, "");
  out = out.replace(/__/g, "");

  // Rule P2 — promote short bold-only paragraphs to <h3>.
  // WeChat public-account export never emits `#`-style headings; all
  // "section titles" arrive as `<p><strong>…</strong></p>`. That
  // leaves the reading experience flat — 400 paragraphs all at the
  // same visual weight. Heuristic: a <p> whose *entire* content is a
  // single <strong> with ≤40 chars of plain text inside is almost
  // certainly a heading, not a running-text emphasis. Promote to <h3>.
  // (40 is chosen empirically: long thesis sentences typically exceed
  // this; headings like "投资主题 1：Environment" stay under it.)
  out = out.replace(
    /<p>\s*<strong>([^<>]{1,40})<\/strong>\s*<\/p>/g,
    "<h3>$1</h3>"
  );

  return out;
}
