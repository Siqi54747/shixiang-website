export interface Deck {
  slug: string;
  title: string;        // English主标题
  subtitle: string;     // 中文副标题
  quarter: string;      // e.g. "2026 Q1"
  publishedDate: string; // ISO "YYYY-MM-DD"
  embedUrl: string;     // iframe-able preview URL (e.g. Google Drive /preview); 空字符串 = 未填
  summary: string;
  featured: boolean;
  status: "draft" | "published";
  relatedSlugs?: string[];
  intro?: string[];     // 右栏导读段落（运营产出），每段一个字符串；undefined = 显示占位文案
  cover?: string;       // 封面图本地路径 (e.g. "/covers/agi-landscape.jpg")，由 sync 脚本从 Base 附件下载生成。仅 featured deck 会渲染。
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
    slug: "How-to-play-ai-beta",
    title: "How To Play AI Beta",
    subtitle: "分清结构性机会与噪音",
    quarter: "2025 Q4",
    publishedDate: "2026-02-02",
    embedUrl: "https://drive.google.com/file/d/1EliRn7QLPDRTuCt1xvsQQlu0ZqqNjTKk/view?usp=sharing",
    summary: "AI Agent 平台变革",
    featured: false,
    status: "published",
    intro: [
      "AI 领域的变化速率和格局演化永远比市场想象中更加迅速，几乎每个月市场共识和叙事都在翻转。",
      "本篇报告是拾象团队围绕这些变化做的一次系统复盘，用来重新校准对当下 AI 竞争时局的判断，也对 2026 年可能成为主线的一些核心技术和产品趋势进行了拆解。",
      "我们将这份报告开源出来，希望和大家共同探讨：哪些是结构性机会，哪些只是阶段性的噪音：",
      "1. Google 重回叙事顶峰，但 AI 不是零和博弈， OpenAI 和 Anthropic 的“赢面”仍很大；",
      "2. Continual learning 已经成为几乎所有 AI labs 押注的新范式共识，2026 年会看到新的信号；",
      "3. AGI 竞赛很像自动驾驶，从 L3 到全面实现 L4 难度极大，但在知识类工作这些垂直领域，局部 L3/L4 已经实现了可观的效率提升和经济价值；",
      "4. “NVIDIA + OpenAI” 这条主线在短期内可能被市场低估，今天继续 bet OpenAI 是在下注 AI 时代的 “something never seen”；",
      "5. 一个理想的 AGI Basket：Google，Nvidia，OpenAI，Anthropic，ByteDance 和 TSMC；",
      "6. 模型即产品，数据即模型，阶跃式的产品体验提升往往还是来自于底层的模型换代，模型能力提升背后仍是数据 bet。",
    ],
  },
  {
    slug: "founder-notes-ai-native-2025-q2",
    title: "Road to AGI L4",
    subtitle: "分化与收敛、全家桶、Full Stack",
    quarter: "2025 Q3",
    publishedDate: "2025-08-14",
    embedUrl: "https://drive.google.com/file/d/19Wb_D6-MmVwUScVUXFi7LPAILImtkLS6/view?usp=sharing",
    summary: "新一代创业者的工具栈",
    featured: false,
    status: "published",
  },
  {
    slug: "agi-road-map-2025",
    title: "AGI Road Map 2025",
    subtitle: "智能进步是最大的确定性",
    quarter: "2025 Q2",
    publishedDate: "2025-05-14",
    embedUrl: "https://drive.google.com/file/d/1_H_PiCGUXGu40cud43kAUjaTFcCgCZJr/view?usp=drive_link",
    summary: "2025 Q2 全球大模型的爆发性比以往更强，硅谷的各个模型公司开始分化到各个领域，比如除了 Google Gemini 和 OpenAI 还在做通用的模型，Anthropic 分化到 Coding、Agentic，Mira 的 Thinking Machines Lab 则分化到多模态和下一代交互。在过去 3 年，市场一直对智能上限的探索保持关注，但在刚刚过去的这两个月里，我们认为需要开始重视产品了：\n\n• 大模型在分化，当下 AI Labs 的路线选择有两个趋势：横向全家桶和纵向垂直整合，前者的例子是 ChatGPT，后者的代表是 Gemini；\n\n• 智能和产品都重要，ChatGPT 身上有很多非技术性壁垒，而 Coding 或模型公司只是技术壁垒；\n\n• 做 AI 产品很像挖矿，保鲜窗口很关键，这个窗口期明显在缩短；\n\n• ChatGPT 的 Deep Research 和 Anthropic 的 Claude Code 最早交付了 L4 级别的体验，分别对应信息搜索和软件开发；\n\n• 极端来说，Coding 公司不做模型的话，在未来是没有优势的，未来就是比拼成本。",
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
