"use client";

import { useState } from "react";
import { copy } from "@/content/copy";

interface ShareBarProps {
  title: string;
}

export function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* silently ignore */
    }
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
    <div className="flex flex-col items-center gap-3 mt-10">
      <p className="text-[11px] tracking-label uppercase text-meta">
        {copy.reportDetail.shareTitle}
      </p>
      <div className="flex items-center gap-3 text-[14px] text-ink">
        <button
          type="button"
          className="hover:text-crimson transition-colors"
          onClick={handleCopy}
          aria-label="Copy WeChat link"
        >
          {copy.reportDetail.shareWechat}
        </button>
        <span className="text-rule">|</span>
        <button
          type="button"
          className="hover:text-crimson transition-colors"
          onClick={handleTwitter}
        >
          {copy.reportDetail.shareTwitter}
        </button>
        <span className="text-rule">|</span>
        <button
          type="button"
          className="hover:text-crimson transition-colors"
          onClick={handleCopy}
        >
          {copied ? copy.reportDetail.shareCopied : copy.reportDetail.shareCopyLink}
        </button>
      </div>
    </div>
  );
}
