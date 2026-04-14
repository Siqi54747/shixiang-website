import { copy } from "@/content/copy";

export function Footer() {
  return (
    <footer className="border-t border-rule px-6 md:px-24 py-9">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] tracking-label uppercase text-meta">
            {copy.footer.contactLabel}
          </p>
          <a
            href={`mailto:${copy.footer.contactEmail}`}
            className="font-serif text-[18px] text-ink hover:text-crimson transition-colors"
          >
            {copy.footer.contactEmail}
          </a>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-[11px] tracking-label uppercase text-meta">
            {copy.footer.officesLabel}
          </p>
          <p className="text-[14px] text-ink whitespace-pre">
            {copy.footer.offices}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[11px] tracking-label uppercase text-meta">
            {copy.footer.wechatLabel}
          </p>
          <p className="font-serif text-[18px] text-ink">
            {copy.footer.wechatHandle}
          </p>
        </div>
      </div>

      <div className="border-t border-rule mt-9 pt-5">
        <p className="text-[11px] tracking-[0.88px] text-meta whitespace-pre">
          {copy.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
