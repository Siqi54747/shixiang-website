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
 * Sizing: fills parent container width; height fixed at 70vh. We no
 * longer enforce a 4:3 aspect ratio — the underlying Google Drive
 * preview player responsively letterboxes the PDF to fit whatever
 * iframe dimensions we give it, so a wider iframe (up to the available
 * column width on desktop) just produces a cleaner fit with less
 * horizontal whitespace next to the share rail.
 */
export function DeckEmbed({ url, title }: DeckEmbedProps) {
  if (!url) {
    return (
      <div
        className="w-full border border-rule bg-cream flex items-center justify-center text-meta text-sm"
        style={{ height: "70vh" }}
      >
        {copy.reportDetail.embedPlaceholder}
      </div>
    );
  }

  return (
    <div
      className="w-full border border-rule bg-white overflow-hidden"
      style={{ height: "70vh" }}
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
