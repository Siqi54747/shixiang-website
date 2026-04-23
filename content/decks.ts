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
  intro?: string[];     // 右栏导读段落（运营产出），每段一个字符串；undefined = 显示占位文案
}

/**
 * 数据源:飞书多维表格(Lark Base)——"Decks" 表。
 *
 * 运营在 Base 里维护所有字段,开发(或自己)跑 `npm run sync:decks`
 * 从 Base 拉最新覆盖下面 SYNC:START/END 之间的 `decks` 数组,然后
 * `git diff` 看过 → commit → push → Vercel 自动部署。
 *
 * 为什么不在 Vercel build 时拉:build 阶段调外部 API 会让 deploy
 * 健康度绑死在飞书 API 可达性上。手动触发 sync 把"内容更新"和
 * "部署"解耦,更稳;代价是每次 Base 改完要有人跑一下命令。
 *
 * 运营手册:docs/operations-decks-base.md
 *
 * 约定:同一时刻 featured=true 且 status=published 的 deck 只能有一条。
 */
// SYNC:START — `decks` array synced from 飞书 Lark Base, do not edit by hand
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
    intro: [
      "这份报告梳理了 2026 年一季度全球 AGI 赛道的关键变化，覆盖 OpenAI、Anthropic、Google DeepMind 等头部实验室在模型、产品、组织三个维度的动向。",
      "我们重点关注三条主线：Coding 能力加速向自主 Agent 演进、战略组织与文化如何决定第二增长曲线、智能通缩在下游应用层的兑现节奏。",
      "数据截止 2026 年 3 月，覆盖样本超过 200 家公司。建议先看第 12–18 页的市场结构图和第 30–36 页的投资地图，再回头读完整论述。",
    ],
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
// SYNC:END

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
