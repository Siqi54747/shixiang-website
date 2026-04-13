import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[50px] bg-white/80 backdrop-blur-sm border-b border-quantum-100">
      <nav className="max-w-6xl mx-auto h-full px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-horizontal-black.png"
            alt={copy.site.name}
            width={140}
            height={28}
            priority
          />
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-quantum-600 hover:text-quantum-950 transition-colors"
        >
          {copy.nav.about}
        </Link>
      </nav>
    </header>
  );
}
