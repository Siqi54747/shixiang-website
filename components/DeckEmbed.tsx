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
 * Sizing: height capped at 70vh, width reverse-computed to preserve
 * the 4:3 ratio the underlying deck is authored in. `max-width: 100%`
 * keeps it safe on narrow parents. No `mx-auto` — callers decide
 * alignment; on report detail the iframe sits left-aligned next to
 * the title column and the reading-guide column fills the right side.
 */
export function DeckEmbed({ url, title }: DeckEmbedProps) {
  if (!url) {
    return (
      <div
        className="border border-rule bg-cream flex items-center justify-center text-meta text-sm"
        style={{
          width: "min(100%, calc(70vh * 4 / 3))",
          aspectRatio: "4 / 3",
        }}
      >
        {copy.reportDetail.embedPlaceholder}
      </div>
    );
  }

  return (
    <div
      className="border border-rule bg-white overflow-hidden"
      style={{
        width: "min(100%, calc(70vh * 4 / 3))",
        aspectRatio: "4 / 3",
      }}
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
