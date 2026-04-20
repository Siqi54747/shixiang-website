import { copy } from "@/content/copy";

interface DeckEmbedProps {
  url: string;
  title: string;
}

/**
 * Generic deck preview iframe wrapper.
 *
 * Accepts any URL that returns a page designed to be iframed (no
 * X-Frame-Options: SAMEORIGIN). Currently used with Google Drive
 * preview URLs: `https://drive.google.com/file/d/<FILE_ID>/preview`.
 *
 * An empty `url` renders a placeholder block.
 *
 * Sizing: fills parent column width; aspect ratio 648:274 locked to
 * match Figma 156:2 (Report Detail — Plan B v1, 2026-04-20). The
 * parent column is lg:w-[648px], so at 1280×800 the iframe resolves
 * to exactly 648×274 — the dimension user tuned in Figma. Google
 * Drive's preview player letterboxes the underlying PDF to fit.
 */
export function DeckEmbed({ url, title }: DeckEmbedProps) {
  if (!url) {
    return (
      <div
        className="w-full border border-rule bg-cream flex items-center justify-center text-meta text-sm"
        style={{ aspectRatio: "4 / 3" }}
      >
        {copy.reportDetail.embedPlaceholder}
      </div>
    );
  }

  return (
    <div
      className="w-full border border-rule bg-white overflow-hidden"
      style={{ aspectRatio: "648 / 274" }}
    >
      <iframe
        src={url}
        title={title}
        className="w-full h-full"
        frameBorder={0}
        allowFullScreen
        allow="fullscreen"
      />
    </div>
  );
}
