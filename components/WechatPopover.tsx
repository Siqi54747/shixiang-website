"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";

/**
 * Footer-embedded WeChat popover (not a full-screen modal).
 * Trigger is rendered as a link-looking button. Click toggles; ESC or
 * outside-click closes. Points up toward the trigger with a small
 * triangle. Spec: shixiang-thesis-section-spec-v3.md §8.2.
 */
export function WechatPopover() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={copy.wechatModal.title}
        className="font-serif text-[18px] text-ink hover:text-crimson transition-colors cursor-pointer bg-transparent border-0 p-0 font-inherit"
      >
        {copy.footer.wechatHandle}
      </button>

      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={copy.wechatModal.title}
          className="absolute right-0 bottom-[calc(100%+12px)] z-20 bg-white border border-rule rounded-lg p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] min-w-[212px] text-center"
        >
          <div className="mx-auto w-[180px] h-[180px] relative">
            <Image
              src="/images/wechat-qr.jpg"
              alt={copy.wechatModal.title}
              fill
              sizes="180px"
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-[12px] text-muted">
            {copy.wechatModal.title}
          </p>
          {/* Triangle pointer */}
          <span
            aria-hidden="true"
            className="absolute top-full right-5 w-0 h-0 border-[6px] border-transparent border-t-white -mt-px"
          />
          <span
            aria-hidden="true"
            className="absolute top-full right-5 w-0 h-0 border-[6px] border-transparent border-t-rule -z-10"
          />
        </div>
      )}
    </div>
  );
}
