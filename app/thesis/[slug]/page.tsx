import Link from "next/link";
import { notFound } from "next/navigation";
import { copy } from "@/content/copy";

interface Params {
  params: { slug: string };
}

/**
 * Placeholder detail pages for each thesis entry on the landing page.
 *
 * The Thesis terminal window on /  links to /thesis/<slug> for all four
 * directions. Route choice (/thesis/<slug> vs /<slug>) is still TBD per
 * spec §13.2; we're running with the /thesis/<slug> namespace for now
 * since it's what the spec's HTML declares.
 *
 * Content for these pages comes later. For now each slug renders a
 * minimal "Coming soon" shell so links don't 404 and SEO crawlers see
 * a titled page.
 */
export function generateStaticParams() {
  return copy.thesis.entries.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params) {
  const entry = copy.thesis.entries.find((e) => e.slug === params.slug);
  if (!entry) return {};
  return {
    title: `${entry.tag} · ${copy.site.name}`,
    description: entry.desc,
  };
}

export default function ThesisDetailPage({ params }: Params) {
  const entry = copy.thesis.entries.find((e) => e.slug === params.slug);
  if (!entry) return notFound();

  return (
    <article className="px-6 md:px-24 py-10 md:py-16">
      <Link
        href="/"
        className="inline-block text-[14px] text-ink hover:text-crimson transition-colors"
      >
        ← Back to home
      </Link>

      <p className="mt-6 text-[11px] tracking-label uppercase text-crimson">
        Thesis
      </p>

      <h1 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-ink mt-2">
        {entry.tag}
      </h1>

      <p className="mt-4 font-serif text-[22px] md:text-[26px] text-muted leading-snug max-w-[760px]">
        {entry.desc}
      </p>

      <p className="mt-6 text-[14px] text-meta">{entry.sub}</p>

      <div className="mt-16 border-l-2 border-crimson bg-[#F3F1EA] px-6 py-5 max-w-[640px]">
        <p className="text-[11px] tracking-label uppercase text-meta mb-2">
          Coming Soon
        </p>
        <p className="text-[14px] leading-[1.6] text-ink">
          这一方向的完整论述仍在撰写中。近期会在此发布详细的投资观察与标的图谱。
        </p>
      </div>
    </article>
  );
}
