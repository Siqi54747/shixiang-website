import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";

export function Footer() {
  return (
    <footer className="border-t border-quantum-100 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/">
          <Image
            src="/images/logo-horizontal-black.png"
            alt={copy.site.name}
            width={120}
            height={24}
          />
        </Link>

        <div className="flex items-center gap-6 text-sm text-quantum-400">
          <a
            href={`mailto:${copy.footer.contactEmail}`}
            className="hover:text-quantum-950 transition-colors"
          >
            {copy.footer.contactLabel}
          </a>
          <span>{copy.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
