import Link from "next/link";
import { notFound } from "next/navigation";
import { copy } from "@/content/copy";
import {
  getDeckBySlug,
  getPublishedDecks,
  formatMonthYear,
} from "@/content/decks";
import { DeckEmbed } from "@/components/DeckEmbed";
import { ShareBar } from "@/components/ShareBar";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPublishedDecks().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Params) {
  const deck = getDeckBySlug(params.slug);
  if (!deck) return {};
  return {
    title: `${deck.title} · ${copy.site.name}`,
    description: deck.summary,
  };
}

export default function ReportDetailPage({ params }: Params) {
  const deck = getDeckBySlug(params.slug);
  if (!deck) return notFound();

  return (
    <article className="px-6 md:px-24 py-6 md:py-8">
      <Link
        href="/reports"
        className="inline-block text-[14px] text-ink hover:text-crimson transition-colors"
      >
        {copy.reportDetail.back}
      </Link>

      <p className="mt-5 text-[14px] text-crimson font-medium tracking-wide">
        {formatMonthYear(deck.publishedDate)}
      </p>

      <h1 className="font-serif text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] text-ink mt-2">
        {deck.title}
      </h1>

      <p className="mt-3 text-[14px] text-muted">By 拾象投研团队</p>

      <div className="mt-6 flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:items-start">
        {/* Left column: iframe + share bar centered beneath it.
            2/3 of the split via col-span-2. */}
        <div className="lg:col-span-2 flex flex-col items-center gap-[14px]">
          <DeckEmbed url={deck.embedUrl} title={deck.title} />
          <ShareBar title={deck.title} />
        </div>

        {/* Right column: reading guide inside an accent container.
            1/3 of the split via col-span-1. */}
        <aside className="lg:col-span-1 min-w-0">
          <section className="border-l-2 border-crimson bg-[#F3F1EA] px-6 py-5 flex flex-col gap-3">
            <p className="text-[11px] tracking-label uppercase text-meta">
              {copy.reportDetail.introTitle}
            </p>
            {deck.intro && deck.intro.length > 0 ? (
              <div className="flex flex-col gap-[10px] text-[14px] leading-[1.55] text-ink">
                {deck.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-meta italic">
                {copy.reportDetail.introPlaceholder}
              </p>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}
