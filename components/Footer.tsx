import { copy } from "@/content/copy";
import { getLocale } from "@/lib/locale-server";
import { WechatPopover } from "./WechatPopover";

export function Footer() {
  const t = copy[getLocale()];
  return (
    <footer className="border-t border-rule px-6 md:px-24 pt-3 pb-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-4">
          <div className="flex flex-col gap-[6px]">
            <p className="text-[11px] tracking-label uppercase text-meta">
              {t.footer.contactLabel}
            </p>
            <a
              href={`mailto:${t.footer.contactEmail}`}
              className="font-serif text-[18px] text-ink hover:text-crimson transition-colors"
            >
              {t.footer.contactEmail}
            </a>
          </div>

          <div className="flex flex-col gap-[6px] md:items-end">
            <p className="text-[11px] tracking-label uppercase text-meta">
              {t.footer.officesLabel}
            </p>
            <p className="text-[14px] text-ink whitespace-pre">
              {t.footer.offices}
            </p>
          </div>

          <div className="flex flex-col gap-[6px]">
            <p className="text-[11px] tracking-label uppercase text-meta">
              {t.footer.wechatLabel}
            </p>
            <WechatPopover />
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] tracking-[0.88px] text-meta whitespace-pre">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
