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

  const meta = deck.readingTime
    ? `By 拾象投研团队 · ${deck.pages} pages · ${deck.readingTime} read`
    : `By 拾象投研团队 · ${deck.pages} pages`;

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

      <p className="mt-3 text-[14px] text-muted">{meta}</p>

      <div className="mt-6">
        <DeckEmbed url={deck.embedUrl} title={deck.title} />
      </div>

      <ShareBar title={deck.title} />
    </article>
  );
}
