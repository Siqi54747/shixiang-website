/**
 * OG image generation route.
 *
 *   GET /api/og                  → site default
 *   GET /api/og?slug=<deckSlug>  → per-deck card (falls back to site
 *                                   default if the slug doesn't match)
 *
 * Rendered by @vercel/og (Satori under the hood). Uses the Node.js
 * runtime so we can readFileSync the brand logo from /public; Edge
 * would work too but we gain nothing and lose the simple fs path.
 *
 * Visual spec — stays tight with the site shell:
 *   - Cream (#FAF6EC) background, matching the global body bg.
 *   - Ink (#17171C) title + muted subtitle.
 *   - Crimson (#A11F2A) vertical accent bar + quarter tag, same
 *     motif used in the Reading Guide container on detail pages.
 *   - Red elephant logo (logo-horizontal-brand.png) top-left.
 *   - shixiang.tech as a bottom-right signature.
 *   - Font stack relies on Satori's built-in Noto Sans fallback for
 *     both Latin and CJK; we haven't shipped a custom font yet.
 *     Adding Instrument Serif later is a localized change (ship the
 *     ttf in /public/fonts, readFileSync, register in `fonts`).
 */

import { ImageResponse } from "@vercel/og";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getDeckBySlug } from "@/content/decks";
import { copy } from "@/content/copy";

export const runtime = "nodejs";
// Cached at the edge by Next/Vercel; generated once per unique URL.
export const revalidate = 3600;

const SIZE = { width: 1200, height: 630 };

// Load brand assets once at module eval time — Node holds the buffer
// in memory for the lifetime of the worker.
const logoBuffer = readFileSync(
  resolve(process.cwd(), "public/images/logo-horizontal-brand.png")
);
const logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;

interface OgContent {
  eyebrow: string;  // crimson tag line — e.g. "2026 Q1 · LATEST REPORT"
  title: string;    // large serif line
  subtitle: string; // CN subtitle or secondary line
}

function resolveContent(slug: string | null): OgContent {
  if (slug) {
    const deck = getDeckBySlug(slug);
    if (deck) {
      return {
        eyebrow: `${deck.quarter.toUpperCase()} · ${copy.reportsList.featuredEyebrow.toUpperCase()}`,
        title: deck.title,
        subtitle: deck.subtitle,
      };
    }
  }
  // Fallback — homepage / unknown slug
  return {
    eyebrow: copy.site.name.toUpperCase(),
    title: copy.site.tagline,
    subtitle: copy.site.description,
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const { eyebrow, title, subtitle } = resolveContent(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF6EC", // cream
          padding: "80px 96px",
          fontFamily: "Noto Sans, sans-serif",
          color: "#17171C", // ink
        }}
      >
        {/* Top: brand logo, sized to keep the red elephant clearly
            readable at feed thumbnail scale */}
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="拾象科技"
            style={{ height: "72px", width: "auto" }}
          />
        </div>

        {/* Center/bottom-weighted content block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#A11F2A",
              letterSpacing: "2px",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 30 ? "72px" : "88px",
              lineHeight: 1.08,
              marginTop: "20px",
              color: "#17171C",
              fontWeight: 500,
              fontFamily: "Georgia, 'Noto Serif SC', serif",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#5A5A60", // muted
              marginTop: "18px",
              lineHeight: 1.35,
              fontFamily: "Georgia, 'Noto Serif SC', serif",
            }}
          >
            {subtitle}
          </div>
          {/* A thin crimson rule under the title block — echoes the
              site's use of hairline rules; no dangling vertical bar */}
          <div
            style={{
              display: "flex",
              marginTop: "48px",
              width: "120px",
              height: "3px",
              backgroundColor: "#A11F2A",
            }}
          />
        </div>

        {/* Bottom-right domain signature */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "20px",
            color: "#9A9A9F",
            letterSpacing: "1px",
          }}
        >
          shixiang.tech
        </div>
      </div>
    ),
    SIZE
  );
}
