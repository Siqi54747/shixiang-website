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
 * An empty `url` renders a placeholder block (for decks whose embed
 * URL is not yet filled in). See `content/decks.ts`.
 *
 * Height is capped at 55vh while preserving a 4:3 aspect ratio so the
 * iframe + surrounding chrome fits inside one 1280x800 desktop screen.
 */
export function DeckEmbed({ url, title }: DeckEmbedProps) {
  if (!url) {
    return (
      <div
        className="mx-auto border border-rule bg-cream flex items-center justify-center text-meta text-sm"
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
      className="mx-auto border border-rule bg-white overflow-hidden"
      style={{
        width: "min(100%, calc(55vh * 4 / 3))",
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
