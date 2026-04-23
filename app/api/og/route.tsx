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
          backgroundColor: "#FAF6EC", // cream
          padding: "72px 96px",
          fontFamily: "Noto Sans, sans-serif",
          color: "#17171C", // ink
          position: "relative",
        }}
      >
        {/* Top-left: brand logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="拾象科技"
            style={{ height: "56px", width: "auto" }}
          />
        </div>

        {/* Centered content block — crimson accent bar + eyebrow + title + subtitle */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          {/* Crimson accent bar (same visual motif as Reading Guide border) */}
          <div
            style={{
              width: "4px",
              height: "auto",
              minHeight: "260px",
              backgroundColor: "#A11F2A",
              position: "absolute",
              left: "96px",
              top: "220px",
              bottom: "140px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "32px",
            }}
          >
            <div
              style={{
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
                fontSize: title.length > 30 ? "64px" : "80px",
                lineHeight: 1.08,
                marginTop: "28px",
                color: "#17171C",
                fontWeight: 500,
                // serif fallback — Satori auto-falls back to Noto Sans
                // if Georgia isn't registered, but it still reads better
                // than nothing.
                fontFamily: "Georgia, 'Noto Serif SC', serif",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "#5A5A60", // muted
                marginTop: "24px",
                lineHeight: 1.35,
                fontFamily: "Georgia, 'Noto Serif SC', serif",
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        {/* Bottom-right signature */}
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
