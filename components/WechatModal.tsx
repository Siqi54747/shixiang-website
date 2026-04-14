"use client";

import Image from "next/image";
import { useEffect } from "react";
import { copy } from "@/content/copy";

interface WechatModalProps {
  open: boolean;
  onClose: () => void;
}

export function WechatModal({ open, onClose }: WechatModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Lock body scroll while modal open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={copy.wechatModal.title}
    >
      <div
        className="bg-cream rounded-lg p-8 md:p-10 max-w-sm w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-meta hover:text-ink text-2xl leading-none transition-colors"
          aria-label={copy.wechatModal.close}
        >
          ×
        </button>
        <div className="text-center">
          <p className="text-[11px] tracking-label uppercase text-meta mb-5">
            {copy.wechatModal.label}
          </p>
          <div className="mx-auto w-[220px] h-[220px] relative">
            <Image
              src="/images/wechat-qr.jpg"
              alt={copy.wechatModal.title}
              fill
              sizes="220px"
              className="object-contain"
            />
          </div>
          <p className="mt-5 text-base text-ink">{copy.wechatModal.title}</p>
          <p className="mt-1 text-xs text-meta">{copy.wechatModal.hint}</p>
        </div>
      </div>
    </div>
  );
}
