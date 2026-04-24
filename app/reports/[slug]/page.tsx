import Link from "next/link";
import { notFound } from "next/navigation";
import { copy } from "@/content/copy";
import {
  getDeckBySlug,
  getPublishedDecks,
  formatMonthYear,
  getDriveThumbnailUrl,
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
  // SEO description priority:
  //   1. explicit `summary` (ops-authored one-liner tuned for search)
  //   2. first paragraph of the Reading Guide
  //   3. the CN subtitle as a last-resort fallback
  // Ops can leave Summary empty on most decks and only fill it when a
  // bespoke meta description improves discoverability.
  const description = deck.summary ?? deck.intro?.[0] ?? deck.subtitle;
  // OG image: use the deck PDF's first page via Google Drive's
  // public thumbnail endpoint. Every deck whose Drive file is
  // "Anyone with the link" already has this image auto-generated
  // by Google at zero cost to ops. Falls back to the /api/og text
  // template when no Drive URL is available yet.
  const driveThumb = getDriveThumbnailUrl(deck);
  const ogUrl = driveThumb ?? `/api/og?slug=${encodeURIComponent(deck.slug)}`;
  return {
    title: `${deck.title} · ${copy.site.name}`,
    description,
    openGraph: {
      title: deck.title,
      description,
      images: [{ url: ogUrl, alt: deck.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: deck.title,
      description,
      images: [ogUrl],
    },
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
          <DeckEmbed url={deck.embedUrl} urlCn={deck.embedUrlCn} title={deck.title} />
          <ShareBar title={deck.title} />
        </div>

        {/* Right column: reading guide inside an accent container.
            1/3 of the split via col-span-1. Cap the section height to
            roughly match the left column (iframe aspect-video + share
            bar + gap) so a long guide scrolls internally instead of
            stretching the page. The calc mirrors the grid geometry:
            article horizontal padding 192px (px-24) + grid gap 48px
            (gap-12) subtracted from 100vw, 2/3 goes to the left column,
            then 9/16 is the iframe height, plus ~94px for share bar
            (~80px) and gap (14px). */}
        <aside className="lg:col-span-1 min-w-0">
          <section className="border-l-2 border-crimson bg-[#F3F1EA] px-6 py-5 flex flex-col gap-3 lg:max-h-[calc((100vw-240px)*0.375+94px)] lg:overflow-y-auto">
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
