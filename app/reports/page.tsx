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
    <section className="px-6 md:px-12 lg:px-20 py-8 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] gap-8 lg:gap-12">
        {/* Featured (left) */}
        {featured && (
          <div className="lg:sticky lg:top-[74px] lg:h-[calc(100vh-74px-40px)]">
            <Link
              href={`/reports/${featured.slug}`}
              className="relative block bg-obsidian text-cream rounded-sm overflow-hidden group aspect-[16/9] lg:aspect-auto lg:h-full"
            >
              {featured.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.cover}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/10"
              />
              <div className="relative h-full flex flex-col justify-end px-8 md:px-10 py-8 md:py-10">
                <p className="text-[11px] tracking-label uppercase text-cream/70">
                  {featured.quarter} · {copy.reportsList.featuredEyebrow}
                </p>
                <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.05] mt-3 md:mt-4">
                  {featured.title}
                </h2>
                <p className="font-serif text-[16px] md:text-[20px] text-cream/80 mt-3 md:mt-4">
                  {featured.subtitle}
                </p>
                <span className="inline-block self-start mt-5 md:mt-6 text-[14px] border-b border-cream pb-[4px] group-hover:border-crimson group-hover:text-crimson transition-colors">
                  {copy.reportsList.featuredCta}
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* List (right) */}
        <ul className="divide-y divide-rule">
          {others.map((deck) => {
            const isAvailable = Boolean(deck.embedUrl);
            if (isAvailable) {
              return (
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
              );
            }
            return (
              <li key={deck.slug}>
                <div
                  aria-disabled="true"
                  className="block py-7 -mx-3 px-3 opacity-60 cursor-default select-none"
                >
                  <p className="text-[11px] tracking-label uppercase text-meta">
                    <span>{deck.quarter}</span>
                    <span className="mx-2 text-rule">·</span>
                    <span className="text-crimson">Coming Soon</span>
                  </p>
                  <h3 className="font-serif text-[22px] md:text-[26px] text-ink mt-2">
                    {deck.title}
                  </h3>
                  <p className="text-[14px] text-muted mt-2">{deck.subtitle}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
