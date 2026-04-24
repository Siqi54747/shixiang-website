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
 * Ground truth is "can this browser actually reach Google Drive?",
 * so we probe it directly. Locale/timezone heuristics (zh-CN +
 * Asia/Shanghai) produced false positives for VPN'd mainland users
 * and overseas expats — their OS still reports zh-CN even though
 * Drive loads fine for them, and they got pointlessly bounced to the
 * Feishu fallback.
 *
 * Flow:
 *   1. `cf-ipcountry=CN` cookie → immediate CN. Authoritative once
 *      the domain is proxied through Cloudflare; skips the probe.
 *   2. Otherwise start with `preferCn=false` so Drive iframe renders
 *      right away (common case), then fire a HEAD-ish `fetch` at
 *      `drive.google.com/favicon.ico` in `no-cors` mode. GFW resets
 *      the TLS handshake → fetch rejects → we flip to `preferCn=true`
 *      and the component re-renders as the Feishu click-card.
 *   3. 1500 ms timeout handles cases where the connection hangs
 *      without a clean reset (some CN ISPs).
 *
 * Cost: one ~1 KB opaque-response request per page view for non-CN
 * readers. Blocked readers briefly see the Drive iframe flash white
 * before the card replaces it — acceptable given the alternative is
 * never showing Drive to VPN users.
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
    // We deliberately don't plumb an AbortController into the fetch:
    // in React dev (StrictMode double-invocation) the effect cleanup
    // would abort the in-flight request and `.catch` would misfire
    // → preferCn=true even when Drive is reachable. The fetch is ~1 KB
    // opaque; letting it complete into the void on unmount is fine.
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setPreferCn(true);
    }, 1500);
    fetch("https://drive.google.com/favicon.ico", {
      mode: "no-cors",
      cache: "no-store",
    })
      .then(() => {
        if (!cancelled) clearTimeout(timeout);
      })
      .catch(() => {
        if (!cancelled) setPreferCn(true);
      });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);
  return preferCn;
}

/**
 * Generic deck preview wrapper.
 *
 * Overseas readers get the Drive /preview iframe. CN readers with a
 * `urlCn` mirror get a click-through card that opens the Feishu file
 * in a new tab — iframe-embedding Feishu is broken because modern
 * browsers (Safari ITP, Chrome rollout, Firefox ETP) block the
 * third-party cookie Feishu needs to establish its anonymous-guest
 * session, so the iframe 302s to a login page even when the file is
 * set to 互联网可阅读. Opening in a new tab makes Feishu a first-party
 * context where cookies work normally.
 *
 * An empty `url` (and no `urlCn`) renders a placeholder block.
 *
 * Sizing: fills parent column width; aspect ratio locked to 16:9 via
 * Tailwind's `aspect-video` so the CN card occupies the same slot as
 * the overseas iframe and surrounding layout doesn't shift.
 */
export function DeckEmbed({ url, urlCn, title }: DeckEmbedProps) {
  const preferCn = useCnReader();

  if (preferCn && urlCn) {
    return (
      <a
        href={urlCn}
        target="_blank"
        rel="noopener noreferrer"
        className="aspect-video w-full border border-rule bg-cream flex items-center justify-center hover:bg-[#F3F1EA] transition-colors group"
        aria-label={`${title} — ${copy.reportDetail.cnOpenCta}`}
      >
        <span className="bg-crimson text-rule text-[13px] md:text-[14px] uppercase tracking-wide px-5 py-3 rounded-md group-hover:bg-[#8B1B25] transition-colors">
          {copy.reportDetail.cnOpenCta}
        </span>
      </a>
    );
  }

  const chosen = url || urlCn || "";
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
