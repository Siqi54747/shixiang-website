import Link from "next/link";
import { copy } from "@/content/copy";
import { FocusGrid } from "@/components/FocusGrid";
import { getFeaturedDeck, formatMonthYear } from "@/content/decks";

export default function Home() {
  const featured = getFeaturedDeck();
  const updatedLabel = featured
    ? `${copy.hero.updatedLabel} ${formatMonthYear(featured.publishedDate)}`
    : "";

  return (
    <>
      <section className="px-6 md:px-24 pt-10 md:pt-14 pb-10 md:pb-14">
        <p className="font-display text-crimson text-[14px] tracking-eyebrow uppercase">
          {copy.hero.eyebrow}
        </p>

        <div className="mt-8 md:mt-10 flex flex-col gap-3 md:gap-4">
          <h1 className="font-serif text-[56px] md:text-[72px] lg:text-[88px] leading-none tracking-[-0.02em] text-ink">
            {copy.hero.headline}
          </h1>
          <p className="font-serif text-[32px] md:text-[42px] lg:text-[48px] leading-[1.2] text-muted">
            {copy.hero.subline}
          </p>
        </div>

        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          {featured ? (
            <Link
              href={`/reports/${featured.slug}`}
              className="inline-block border-b border-transparent hover:border-crimson pb-[6px] text-[14px] text-ink hover:text-crimson transition-colors w-fit whitespace-pre"
            >
              {copy.hero.cta}
            </Link>
          ) : (
            <span className="text-[14px] text-meta">No reports yet</span>
          )}
          {updatedLabel && (
            <span className="text-[14px] text-meta">{updatedLabel}</span>
          )}
        </div>
      </section>

      <FocusGrid />
    </>
  );
}
