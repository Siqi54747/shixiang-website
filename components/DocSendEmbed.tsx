import { copy } from "@/content/copy";

interface DocSendEmbedProps {
  url: string;
  title: string;
}

/**
 * DocSend iframe wrapper.
 * 如果 url 为空，渲染占位符（开发阶段 / 数据未填时）。
 * DocSend embed URL 通常长这样: https://docsend.com/v/[id]
 */
export function DocSendEmbed({ url, title }: DocSendEmbedProps) {
  if (!url) {
    return (
      <div
        className="w-full border border-rule bg-cream flex items-center justify-center text-meta text-sm"
        style={{ aspectRatio: "4 / 3" }}
      >
        {copy.reportDetail.docsendPlaceholder}
      </div>
    );
  }

  return (
    <div
      className="w-full border border-rule bg-white overflow-hidden"
      style={{ aspectRatio: "4 / 3" }}
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
