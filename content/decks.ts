export interface Deck {
  slug: string;
  title: string;        // English主标题
  subtitle: string;     // 中文副标题
  quarter: string;      // e.g. "2026 Q1"
  publishedDate: string; // ISO "YYYY-MM-DD"
  embedUrl: string;     // iframe-able preview URL (sync 脚本会归一成 Google Drive /preview 格式); 空字符串 = 未填
  featured: boolean;
  status: "draft" | "published";
  relatedSlugs?: string[];
  intro?: string[];     // 右栏 Reading Guide 段落（运营产出），每段一个字符串；undefined = 显示占位文案
  cover?: string;       // 封面图本地路径 (e.g. "/covers/agi-landscape.jpg")，由 sync 脚本从 Base 附件下载生成。仅 featured deck 会渲染。
  summary?: string;     // 可选 SEO meta description override。留空时 generateMetadata 回退到 intro[0]，再回退到 subtitle。建议 ≤150 字符。
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
    subtitle: "2026 全球 AGI 赛道全景梳理",
    quarter: "2026 Q1",
    publishedDate: "2026-04-01",
    embedUrl: "https://drive.google.com/file/d/1M98axRY6TyJQhYE0Z3O102N938yMgtUP/preview",
    featured: true,
    status: "published",
    intro: [
      "这份报告梳理了 2026 年一季度全球 AGI 赛道的关键变化，覆盖 OpenAI、Anthropic、Google DeepMind 等头部实验室在模型、产品、组织三个维度的动向。",
      "我们重点关注三条主线：Coding 能力加速向自主 Agent 演进、战略组织与文化如何决定第二增长曲线、智能通缩在下游应用层的兑现节奏。",
      "数据截止 2026 年 3 月，覆盖样本超过 200 家公司。建议先看第 12–18 页的市场结构图和第 30–36 页的投资地图，再回头读完整论述。",
    ],
    cover: "/covers/the-new-agi-landscape-2026-q1.png",
    summary: "战略组织与文化如何决定第二增长曲线",
  },
  {
    slug: "How-to-play-ai-beta",
    title: "How To Play AI Beta",
    subtitle: "分清结构性机会与噪音",
    quarter: "2025 Q4",
    publishedDate: "2026-02-02",
    embedUrl: "https://drive.google.com/file/d/1EliRn7QLPDRTuCt1xvsQQlu0ZqqNjTKk/preview",
    featured: false,
    status: "published",
    intro: [
      "AI 领域的变化速率和格局演化永远比市场想象中更加迅速，几乎每个月市场共识和叙事都在翻转。",
      "本篇报告是拾象团队围绕这些变化做的一次系统复盘，用来重新校准对当下 AI 竞争时局的判断，也对 2026 年可能成为主线的一些核心技术和产品趋势进行了拆解：",
      "1. Google 重回叙事顶峰，但 AI 不是零和博弈， OpenAI 和 Anthropic 的“赢面”仍很大；",
      "2. Continual learning 已经成为几乎所有 AI labs 押注的新范式共识，2026 年会看到新的信号；",
      "3. AGI 竞赛很像自动驾驶，从 L3 到全面实现 L4 难度极大，但在知识类工作这些垂直领域，局部 L3/L4 已经实现了可观的效率提升和经济价值；",
      "4. “NVIDIA + OpenAI” 这条主线在短期内可能被市场低估，今天继续 bet OpenAI 是在下注 AI 时代的 “something never seen”；",
      "5. 一个理想的 AGI Basket：Google，Nvidia，OpenAI，Anthropic，ByteDance 和 TSMC；",
      "6. 模型即产品，数据即模型，阶跃式的产品体验提升往往还是来自于底层的模型换代，模型能力提升背后仍是数据 bet。",
    ],
    summary: "模型即产品，数据即模型",
  },
  {
    slug: "founder-notes-ai-native-2025-q2",
    title: "Road to AGI L4",
    subtitle: "分化与收敛、全家桶、Full Stack",
    quarter: "2025 Q3",
    publishedDate: "2025-08-14",
    embedUrl: "https://drive.google.com/file/d/19Wb_D6-MmVwUScVUXFi7LPAILImtkLS6/preview",
    featured: false,
    status: "published",
    intro: [
      "过去一个季度,AI 的竞争从“谁的模型更强”切换到“谁的打法更对”，头部几家像 F1 竞赛,方向选错一次就可能掉队,而 Agent 在局部已经跑出 L4 级别的体验：",
      "1. 模型在分化,没人稳赢、更没有躺赢,今天的 SOTA 在 3-6 个月后就是市场平均水平,头部几家像 F1 竞赛,犯错很容易直接掉队；",
      "2. AI Labs 走出两条路:横向全家桶(ChatGPT = AI 时代的 MS Office 套件)与纵向 Full Stack 整合(Google 的 TPU + Gemini + 存量场景),基础模型公司都要端到端做好 Agent,纯 API 生意壁垒不够;",
      "3. Agent 领域已经实现 L4 级别体验,ChatGPT Deep Research 和 Claude Code 是两个代表;Coding Agent 模式跑通之后,会持续向其他 AI Workspace 领域拓展;",
      "4. Anthropic all-in coding 是对 Cursor 最大的不利,Coding 能力是 FM 能力的子集,Cursor 想向下改数据分布,模型训练能力完全跟不上,最终会反映到用户体验上;",
      "5. Google 被严重低估,ChatGPT 和 Google 最终会殊途同归,Google AIO 在 AI Ads 上的探索比 Perplexity / ChatGPT 走得更深,Gemini 的后劲可能才是最强的;",
      "6. 做 AI 产品很像\"挖矿\",且有明确的时间保鲜窗口:第一个做出让用户惊叹的 Magic Moment,等于拿到 5 亿美金的免费营销;AI 创业范式正在变,每一次科技浪潮都会诞生新的 Native 基金,30 倍 DPI 的机会留给围绕主线找非共识的人。",
    ],
    summary: "Agent 在局部已经跑出 L4 级别的体验",
  },
  {
    slug: "agi-road-map-2025",
    title: "AGI Road Map 2025",
    subtitle: "智能进步是最大的确定性",
    quarter: "2025 Q2",
    publishedDate: "2025-05-14",
    embedUrl: "https://drive.google.com/file/d/1_H_PiCGUXGu40cud43kAUjaTFcCgCZJr/preview",
    featured: false,
    status: "published",
    intro: [
      "在一个充满不确定性的 2025,技术进步反而是 AI 投资里最大的确定性。真正值得长期下注的主线其实只有一条：智能本身的提升。",
      "本篇报告是拾象团队对 2025 年 AGI 主线的一次系统梳理，目的是在动荡环境中找到最大的确定性,并识别出 2025 年最值得下注的技术与产品机会:",
      "1. 智能本身就是最大的应用，投资 AGI 的唯一主线是围绕“智能水平提升”去配置，当下正从 L2 Reasoner 走向 L3 Agents,每迈一级都会解锁全新智能场景；",
      "2. 今天最大的非共识是 Pre-training 的空间还非常大：只有 pre-training 能涌现新能力，RL + post-training 是对潜力的最大化发掘但不涌现新能力,下一代 SOTA 仍会显著 beat 今天；",
      "3. AGI 路线图开始分化：OpenAI 押注 O 系列 reasoning + 10 亿 DAU 的 killer app,Anthropic 押注 pre-training base model + Coding → Agentic AI,本质是“流量 or 智能”的路线之争；",
      "4. OpenAI 和 Anthropic 的领先优势极其恐怖,两家已拿走近 80% 的 LLM 产品营收。Anthropic 在做“Android”，OpenAI 在做“Apple”，LLM OS 的两种形态正在成形；",
      "5. Online Learning 是下一个范式级路线,允许模型自主探索并学习，reward model 设计会是新的关键卡点；",
      "6. Coding + Agentic AI 是 AGI 时代抖音和微信级别的机会：第一幕把软件供给放大 100x，第二幕实现 Task Engine,把市场从 5000 万开发者拓展到 10 亿知识工作者。",
    ],
    summary: "大模型在分化",
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

/**
 * Derive a Google Drive thumbnail URL from a deck's embedUrl.
 *
 * Drive exposes `drive.google.com/thumbnail?id=...&sz=wN` as a public
 * PNG of the PDF's first page, no auth required as long as the file
 * is shared "Anyone with the link". Used as the OG image source for
 * deck share cards — every deck gets a real cover automatically,
 * zero ops upload step.
 *
 * Returns undefined for empty or non-Drive embedUrls so callers can
 * fall back to /api/og or another source.
 */
export function getDriveThumbnailUrl(deck: Deck, sizePx = 1600): string | undefined {
  if (!deck.embedUrl) return undefined;
  const m = deck.embedUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!m) return undefined;
  return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w${sizePx}`;
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
