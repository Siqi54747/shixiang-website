import type { Locale } from "@/lib/i18n";

/**
 * All site UI copy, keyed by locale. `zh` is the source of truth for
 * structure; `en` MUST mirror its shape exactly (enforced by the
 * `CopyTree` type below). Consumers pick a tree with `copy[locale]`
 * (server: from getLocale(); client: from useLocale()).
 *
 * Deck/report *content* (subtitle, reading guide) is NOT here — it
 * lives in content/decks.ts with parallel `subtitleEn` / `introEn`
 * fields, because it's synced from 飞书 Base. The Thesis terminal
 * entries below are on-site descriptions only; each `href` still points
 * to the original Chinese WeChat article (those can't be translated).
 */

const zh = {
  site: {
    name: "拾象科技",
    tagline: "Research first.",
    description:
      "拾象是一家研究驱动的科技投资基金。Research the curve. Bet the decade.",
    url: "https://shixiang.com",
  },
  nav: {
    reports: "AGI Reports",
    insights: "Explore Insights",
  },
  hero: {
    eyebrow: "Research the curve. Bet the decade.",
    headline: "Research first.",
    subline: "推动科技大航海。",
    intro: [
      "拾象坚信智能是这个时代最底层的变量。",
      "我们以研究穿越周期，与最前沿的创业者、科技企业家一起 bet on 定义下一个 10 年的新物种。",
    ],
    cta: "Get our latest reports →",
    updatedLabel: "Updated",
  },
  focusGrid: {
    // Deprecated 2026-04-20: replaced by the Thesis terminal-window component. Kept so nothing breaks if an old reference lingers.
    items: ["AGI Labs", "Robotics", "AI for Science", "Agent-Native"],
  },
  thesis: {
    filename: "shixiang-agi-thesis.md",
    command: "$ cat what-we-bet-on.md",
    updatedLabel: "UPDATED",
    branch: "main",
    ready: "ready",
    // Each entry links out to the WeChat public-account source article
    // (海外独角兽). The previous /thesis/<slug> in-site detail route is
    // deprecated — see docs/polish-todo.md for the "revive in-site
    // thesis page" backlog item.
    entries: [
      {
        slug: "agi-labs",
        tag: "AGI Labs",
        desc: "模型能力仍是价值创造的核心变量",
        sub: "全球 Tier-1 AI Labs · Neo Labs · LLM-native Infra",
        href: "https://mp.weixin.qq.com/s/cLyenxqPX71L0zTSy2uYGQ",
      },
      {
        slug: "robotics",
        tag: "Robotics",
        desc: "VLA 将解锁通用机器人的 ChatGPT 时刻",
        sub: "机器人硬件 · 仿真与数据 · Foundation Model for Robotics",
        href: "https://mp.weixin.qq.com/s/n695VewySScJkJxpl9rcdg",
      },
      {
        slug: "ai-for-science",
        tag: "AI for Science",
        desc: "AI 正在重构科学发现的范式，下一个 10 亿美元分子一定来自 AI",
        sub: "AI 制药 · AI 材料 · Research Agents",
        href: "https://mp.weixin.qq.com/s/Tn4vpyXf6S00WOEh05tpqg",
      },
      {
        slug: "agent-native",
        tag: "Agent-Native",
        desc: "Agent 是组成新的互联网，会带来软件的下一次重写",
        sub: "Coding Agent · Infra for Agent · Vertical Agent",
        href: "https://mp.weixin.qq.com/s/9I2GccOVm_2hNzLGlaZ5_g",
      },
    ],
  },
  reportsList: {
    featuredEyebrow: "LATEST REPORT",
    featuredCta: "View full report →",
    comingSoon: "Coming Soon",
  },
  reportDetail: {
    back: "← Back to Reports",
    byline: "By 拾象投研团队",
    introTitle: "READING GUIDE",
    introPlaceholder: "导读内容即将发布。",
    shareTitle: "SHARE THIS REPORT",
    shareWechat: "微信",
    shareTwitter: "X",
    shareCopyLink: "Copy link",
    shareCopied: "已复制",
    shareWechatToast: "已复制链接，粘贴到微信即可分享",
    embedPlaceholder: "Deck preview (coming soon)",
    cnOpenCta: "在飞书中打开 PDF →",
  },
  wechatModal: {
    label: "WECHAT",
    title: "关注海外独角兽公众号",
    hint: "扫一扫二维码，获取前沿研究",
    close: "关闭",
  },
  footer: {
    contactLabel: "CONTACT",
    contactEmail: "investment@shixiang.com",
    officesLabel: "OFFICES",
    offices: "Beijing  ·  Shanghai  ·  Hong Kong",
    wechatLabel: "WECHAT",
    wechatHandle: "@海外独角兽",
    copyright: `© ${new Date().getFullYear()}  SHIXIANG TECH  ·  拾象科技`,
  },
};

/** English mirror of `zh`. Must keep the same key shape. */
const en: CopyTree = {
  site: {
    name: "Shixiang Tech",
    tagline: "Research first.",
    description:
      "Shixiang is a research-driven technology investment fund. Research the curve. Bet the decade.",
    url: "https://shixiang.com",
  },
  nav: {
    reports: "AGI Reports",
    insights: "Explore Insights",
  },
  hero: {
    eyebrow: "Research the curve. Bet the decade.",
    headline: "Research first.",
    subline: "Powering the great voyage of technology.",
    intro: [
      "Shixiang believes intelligence is the most fundamental variable of our era.",
      "We navigate cycles through research, and partner with frontier founders and technology entrepreneurs to bet on the new species that will define the next decade.",
    ],
    cta: "Get our latest reports →",
    updatedLabel: "Updated",
  },
  focusGrid: {
    items: ["AGI Labs", "Robotics", "AI for Science", "Agent-Native"],
  },
  thesis: {
    filename: "shixiang-agi-thesis.md",
    command: "$ cat what-we-bet-on.md",
    updatedLabel: "UPDATED",
    branch: "main",
    ready: "ready",
    entries: [
      {
        slug: "agi-labs",
        tag: "AGI Labs",
        desc: "Model capability remains the core variable of value creation",
        sub: "Global Tier-1 AI Labs · Neo Labs · LLM-native Infra",
        href: "https://mp.weixin.qq.com/s/cLyenxqPX71L0zTSy2uYGQ",
      },
      {
        slug: "robotics",
        tag: "Robotics",
        desc: "VLA will unlock the ChatGPT moment for general-purpose robots",
        sub: "Robotics Hardware · Simulation & Data · Foundation Models for Robotics",
        href: "https://mp.weixin.qq.com/s/n695VewySScJkJxpl9rcdg",
      },
      {
        slug: "ai-for-science",
        tag: "AI for Science",
        desc: "AI is rebuilding the paradigm of scientific discovery — the next billion-dollar molecule will come from AI",
        sub: "AI Drug Discovery · AI Materials · Research Agents",
        href: "https://mp.weixin.qq.com/s/Tn4vpyXf6S00WOEh05tpqg",
      },
      {
        slug: "agent-native",
        tag: "Agent-Native",
        desc: "Agents are forming a new internet and will drive the next rewrite of software",
        sub: "Coding Agents · Infra for Agents · Vertical Agents",
        href: "https://mp.weixin.qq.com/s/9I2GccOVm_2hNzLGlaZ5_g",
      },
    ],
  },
  reportsList: {
    featuredEyebrow: "LATEST REPORT",
    featuredCta: "View full report →",
    comingSoon: "Coming Soon",
  },
  reportDetail: {
    back: "← Back to Reports",
    byline: "By the Shixiang Research Team",
    introTitle: "READING GUIDE",
    introPlaceholder: "Reading guide coming soon.",
    shareTitle: "SHARE THIS REPORT",
    shareWechat: "WeChat",
    shareTwitter: "X",
    shareCopyLink: "Copy link",
    shareCopied: "Copied",
    shareWechatToast: "Link copied — paste it into WeChat to share",
    embedPlaceholder: "Deck preview (coming soon)",
    cnOpenCta: "Open PDF in Feishu →",
  },
  wechatModal: {
    label: "WECHAT",
    title: "Follow 海外独角兽 on WeChat",
    hint: "Scan the QR code for frontier research",
    close: "Close",
  },
  footer: {
    contactLabel: "CONTACT",
    contactEmail: "investment@shixiang.com",
    officesLabel: "OFFICES",
    offices: "Beijing  ·  Shanghai  ·  Hong Kong",
    wechatLabel: "WECHAT",
    wechatHandle: "@海外独角兽",
    copyright: `© ${new Date().getFullYear()}  SHIXIANG TECH`,
  },
};

/** Shape both locales share — `en` is type-checked against the `zh` tree. */
export type CopyTree = typeof zh;

export const copy: Record<Locale, CopyTree> = { zh, en };

/** Convenience accessor. */
export function getCopy(locale: Locale): CopyTree {
  return copy[locale];
}
