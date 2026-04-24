"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy";

interface DeckEmbedProps {
  url: string;          // canonical (usually Google Drive /preview)
  urlCn?: string;       // optional CN-friendly embed (飞书/腾讯文档)
  title: string;
}

/**
 * Detect whether the current reader should see the CN-friendly embed.
 *
 * Runs in the browser only (component is "use client"). We combine
 * three cheap signals; any hit flips the switch:
 *
 *   1. `cf-ipcountry` cookie — set by a Cloudflare transform rule
 *      once the domain is proxied through CF (see polish-todo.md).
 *      Most authoritative when available.
 *   2. `navigator.language` starts with "zh-CN" / "zh-Hans" — catches
 *      most mainland browsers even pre-Cloudflare.
 *   3. Intl timezone is one of the four CN zones — covers zh locale
 *      installed overseas is a rare false positive, but false
 *      positives are cheap (we just show Feishu instead of Drive,
 *      both render fine), so bias toward inclusion.
 *
 * False positives (zh-CN expat overseas) land on the Feishu/Tencent
 * embed, which still plays globally. False negatives (non-zh traveler
 * in CN without VPN) get Drive, which is blocked — worse. So err on
 * the side of `preferCn = true`.
 */
function useCnReader(): boolean {
  const [preferCn, setPreferCn] = useState(false);
  useEffect(() => {
    const cookieMatch = document.cookie.match(/(?:^|; )cf-ipcountry=([^;]+)/i);
    const cfCountry = cookieMatch ? decodeURIComponent(cookieMatch[1]).toUpperCase() : "";
    if (cfCountry === "CN") {
      setPreferCn(true);
      return;
    }
    const lang = (navigator.language || "").toLowerCase();
    if (lang.startsWith("zh-cn") || lang.startsWith("zh-hans")) {
      setPreferCn(true);
      return;
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (
        tz === "Asia/Shanghai" ||
        tz === "Asia/Chongqing" ||
        tz === "Asia/Urumqi" ||
        tz === "Asia/Harbin"
      ) {
        setPreferCn(true);
      }
    } catch {
      // Intl.DateTimeFormat should always work in modern browsers;
      // swallow to be safe on ancient runtimes.
    }
  }, []);
  return preferCn;
}

/**
 * Generic deck preview iframe wrapper.
 *
 * Accepts any URL that returns a page designed to be iframed (no
 * X-Frame-Options: SAMEORIGIN). Canonical source is Google Drive
 * preview: `https://drive.google.com/file/d/<FILE_ID>/preview`. When
 * `urlCn` is provided, readers geolocated to mainland China see that
 * instead — Drive and DocSend are blocked by the GFW, so operations
 * uploads a 飞书/腾讯文档 mirror and pastes its share URL into the
 * Base's `Embed URL (CN)` column.
 *
 * An empty `url` (and no `urlCn`) renders a placeholder block.
 *
 * Sizing: fills parent column width; aspect ratio locked to 16:9 via
 * Tailwind's `aspect-video`. The iframe uses absolute + inset-0 so
 * it strictly fills the aspect-ratio wrapper regardless of the
 * provider's internal sizing.
 */
export function DeckEmbed({ url, urlCn, title }: DeckEmbedProps) {
  const preferCn = useCnReader();
  // Picker mirrors pickEmbedUrl() in content/decks.ts. Duplicated here
  // instead of imported because this component is rendered client-side
  // and we want the decks module to stay tree-shakeable from the server.
  const chosen = preferCn && urlCn ? urlCn : url || urlCn || "";

  if (!chosen) {
    return (
      <div className="aspect-video w-full border border-rule bg-cream flex items-center justify-center text-meta text-sm">
        {copy.reportDetail.embedPlaceholder}
      </div>
    );
  }

  return (
    <div className="aspect-video w-full relative border border-rule bg-white overflow-hidden">
      <iframe
        src={chosen}
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder={0}
        allowFullScreen
        allow="fullscreen"
      />
    </div>
  );
}
