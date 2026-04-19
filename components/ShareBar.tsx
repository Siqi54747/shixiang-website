"use client";

import { useState } from "react";
import { copy } from "@/content/copy";

interface ShareBarProps {
  title: string;
}

export function ShareBar({ title }: ShareBarProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [wechatToast, setWechatToast] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopyLink = async () => {
    const ok = await copyLink();
    if (!ok) return;
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  const handleWechat = async () => {
    const ok = await copyLink();
    if (!ok) return;
    setWechatToast(true);
    setTimeout(() => setWechatToast(false), 2400);
  };

  const handleTwitter = () => {
    const url = encodeURIComponent(
      typeof window !== "undefined" ? window.location.href : ""
    );
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] tracking-label uppercase text-meta">
        {copy.reportDetail.shareTitle}
      </p>
      <div className="flex flex-col gap-[10px] text-[14px] text-ink items-start">
        <button
          type="button"
          className="hover:text-crimson transition-colors text-left"
          onClick={handleWechat}
        >
          {copy.reportDetail.shareWechat}
        </button>
        <button
          type="button"
          className="hover:text-crimson transition-colors text-left"
          onClick={handleTwitter}
        >
          {copy.reportDetail.shareTwitter}
        </button>
        <button
          type="button"
          className="hover:text-crimson transition-colors text-left"
          onClick={handleCopyLink}
        >
          {linkCopied ? copy.reportDetail.shareCopied : copy.reportDetail.shareCopyLink}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`text-[12px] text-muted leading-[1.4] transition-opacity duration-200 ${
          wechatToast ? "opacity-100" : "opacity-0"
        }`}
      >
        {copy.reportDetail.shareWechatToast}
      </p>
    </div>
  );
}
