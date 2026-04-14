import Link from "next/link";
import { notFound } from "next/navigation";
import { copy } from "@/content/copy";
import {
  getDeckBySlug,
  getPublishedDecks,
  formatMonthYear,
} from "@/content/decks";
import { DocSendEmbed } from "@/components/DocSendEmbed";
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
    <article className="px-6 md:px-24 py-8 md:py-12">
      <Link
        href="/reports"
        className="inline-block text-[14px] text-ink hover:text-crimson transition-colors"
      >
        {copy.reportDetail.back}
      </Link>

      <p className="mt-8 text-[14px] text-crimson font-medium tracking-wide">
        {formatMonthYear(deck.publishedDate)}
      </p>

      <h1 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-ink mt-2 md:mt-3">
        {deck.title}
      </h1>

      <p className="mt-5 text-[14px] text-muted">{meta}</p>

      <div className="mt-10">
        <DocSendEmbed url={deck.docsendUrl} title={deck.title} />
      </div>

      <ShareBar title={deck.title} />
    </article>
  );
}
