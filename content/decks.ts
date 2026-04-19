export interface Deck {
  slug: string;
  title: string;        // English主标题
  subtitle: string;     // 中文副标题
  quarter: string;      // e.g. "2026 Q1"
  publishedDate: string; // ISO "YYYY-MM-DD"
  pages: number;
  readingTime?: string; // e.g. "30 min"
  embedUrl: string;     // iframe-able preview URL (e.g. Google Drive /preview); 空字符串 = 未填
  summary: string;
  featured: boolean;
  status: "draft" | "published";
  relatedSlugs?: string[];
}

/**
 * 一期用本地数据。后续 Phase D 切到飞书 Lark Base。
 * 约定：同一时刻 featured=true 且 status=published 的只能有一条。
 */
export const decks: Deck[] = [
  {
    slug: "the-new-agi-landscape-2026-q1",
    title: "The New AGI Landscape",
    subtitle: "全球 AGI 赛道全景梳理",
    quarter: "2026 Q1",
    publishedDate: "2026-04-01",
    pages: 48,
    readingTime: "30 min",
    embedUrl: "https://drive.google.com/file/d/1M98axRY6TyJQhYE0Z3O102N938yMgtUP/preview",
    summary: "全球 AGI 赛道全景梳理",
    featured: true,
    status: "published",
  },
  {
    slug: "ai-agents-2025-q4",
    title: "AI Agents: The Next Platform Shift",
    subtitle: "AI Agent 平台变革",
    quarter: "2025 Q4",
    publishedDate: "2025-10-01",
    pages: 42,
    readingTime: "25 min",
    embedUrl: "",
    summary: "AI Agent 平台变革",
    featured: false,
    status: "published",
  },
  {
    slug: "robotics-next-decade-2025-q3",
    title: "Robotics: The Next Decade",
    subtitle: "硬件与软件的双重革命",
    quarter: "2025 Q3",
    publishedDate: "2025-07-01",
    pages: 36,
    readingTime: "22 min",
    embedUrl: "",
    summary: "硬件与软件的双重革命",
    featured: false,
    status: "published",
  },
  {
    slug: "founder-notes-ai-native-2025-q2",
    title: "Founder Notes: AI Native",
    subtitle: "新一代创业者的工具栈",
    quarter: "2025 Q2",
    publishedDate: "2025-04-01",
    pages: 28,
    readingTime: "18 min",
    embedUrl: "",
    summary: "新一代创业者的工具栈",
    featured: false,
    status: "published",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-");
  return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

export function getPublishedDecks(): Deck[] {
  return decks
    .filter((d) => d.status === "published")
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

export function getFeaturedDeck(): Deck | undefined {
  return getPublishedDecks().find((d) => d.featured) ?? getPublishedDecks()[0];
}

export function getOtherDecks(): Deck[] {
  const featured = getFeaturedDeck();
  return getPublishedDecks().filter((d) => d.slug !== featured?.slug);
}

export function getDeckBySlug(slug: string): Deck | undefined {
  return getPublishedDecks().find((d) => d.slug === slug);
}

export function getRelatedDecks(deck: Deck, limit = 2): Deck[] {
  const all = getPublishedDecks().filter((d) => d.slug !== deck.slug);
  if (deck.relatedSlugs && deck.relatedSlugs.length > 0) {
    const manual = deck.relatedSlugs
      .map((s) => all.find((d) => d.slug === s))
      .filter((d): d is Deck => Boolean(d));
    if (manual.length >= limit) return manual.slice(0, limit);
    const rest = all.filter((d) => !manual.some((m) => m.slug === d.slug));
    return [...manual, ...rest].slice(0, limit);
  }
  return all.slice(0, limit);
}
