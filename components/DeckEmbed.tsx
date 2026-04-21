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
 * Sizing: fills parent column width; aspect ratio locked to 16:9 via
 * Tailwind's `aspect-video`. The iframe uses absolute + inset-0 so
 * it strictly fills the aspect-ratio wrapper regardless of the
 * provider's internal sizing.
 */
export function DeckEmbed({ url, title }: DeckEmbedProps) {
  if (!url) {
    return (
      <div className="aspect-video w-full border border-rule bg-cream flex items-center justify-center text-meta text-sm">
        {copy.reportDetail.embedPlaceholder}
      </div>
    );
  }

  return (
    <div className="aspect-video w-full relative border border-rule bg-white overflow-hidden">
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder={0}
        allowFullScreen
        allow="fullscreen"
      />
    </div>
  );
}
