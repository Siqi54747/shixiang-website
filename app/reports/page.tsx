import Link from "next/link";
import { copy } from "@/content/copy";
import { getFeaturedDeck, getOtherDecks } from "@/content/decks";

export const metadata = {
  title: `AGI Reports · ${copy.site.name}`,
  description: copy.site.description,
};

export default function ReportsListPage() {
  const featured = getFeaturedDeck();
  const others = getOtherDecks();

  return (
    <section className="px-6 md:px-12 lg:px-20 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,516px)_minmax(0,1fr)] gap-10 lg:gap-14">
        {/* Featured (left) */}
        {featured && (
          <div className="lg:sticky lg:top-[74px] self-start">
            <Link
              href={`/reports/${featured.slug}`}
              className="block bg-obsidian text-cream rounded-sm px-10 md:px-12 py-10 md:py-12 group"
            >
              <p className="text-[11px] tracking-label uppercase text-cream/60">
                {featured.quarter} · {copy.reportsList.featuredEyebrow}
              </p>
              <h2 className="font-serif text-[44px] md:text-[56px] leading-[1.05] mt-14 md:mt-20">
                {featured.title}
              </h2>
              <p className="font-serif text-[18px] md:text-[22px] text-cream/70 mt-14 md:mt-20">
                {featured.subtitle}
              </p>
              <span className="inline-block mt-10 md:mt-16 text-[14px] border-b border-cream pb-[4px] group-hover:border-crimson group-hover:text-crimson transition-colors">
                {copy.reportsList.featuredCta}
              </span>
            </Link>
          </div>
        )}

        {/* List (right) */}
        <ul className="divide-y divide-rule">
          {others.map((deck) => (
            <li key={deck.slug}>
              <Link
                href={`/reports/${deck.slug}`}
                className="block py-7 group hover:bg-black/[0.02] transition-colors -mx-3 px-3 rounded-sm"
              >
                <p className="text-[11px] tracking-label uppercase text-meta">
                  {deck.quarter}
                </p>
                <h3 className="font-serif text-[22px] md:text-[26px] text-ink mt-2 group-hover:text-crimson transition-colors">
                  {deck.title}
                </h3>
                <p className="text-[14px] text-muted mt-2">{deck.subtitle}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
