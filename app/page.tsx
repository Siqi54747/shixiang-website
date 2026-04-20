import Link from "next/link";
import { copy } from "@/content/copy";
import { ThesisWindow } from "@/components/ThesisWindow";
import { getFeaturedDeck, formatMonthYear } from "@/content/decks";

export default function Home() {
  const featured = getFeaturedDeck();
  const updatedLabel = featured
    ? `${copy.hero.updatedLabel} ${formatMonthYear(featured.publishedDate)}`
    : "";

  return (
    <>
      <section className="px-4 md:px-8 lg:px-12 pt-10 md:pt-14 pb-10 md:pb-14">
        <p className="font-display text-crimson text-[14px] tracking-eyebrow uppercase">
          {copy.hero.eyebrow}
        </p>

        <div className="mt-11 flex flex-col gap-[15px]">
          <h1 className="font-serif text-[56px] md:text-[72px] lg:text-[96px] leading-none tracking-[-0.02em] text-ink">
            {copy.hero.headline}
          </h1>
          <p className="font-serif text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-muted">
            {copy.hero.subline}
          </p>
        </div>

        <div className="mt-8 md:mt-10 flex flex-col gap-[6px] text-[16px] md:text-[17px] leading-[1.75] text-ink max-w-[760px]">
          {copy.hero.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          {featured ? (
            <Link
              href={`/reports/${featured.slug}`}
              className="inline-flex items-center pb-1 text-[14px] text-ink w-fit whitespace-pre hover:underline hover:decoration-crimson hover:underline-offset-4"
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

      <section className="px-4 md:px-8 lg:px-12 pb-14 md:pb-20">
        <ThesisWindow />
      </section>
    </>
  );
}
