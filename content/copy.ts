export const copy = {
  site: {
    name: "拾象科技",
    nameEn: "Shixiang Tech",
    tagline: "Research first.",
    description:
      "拾象是一家研究驱动的科技投资基金。Research the curve. Bet the decade.",
    url: "https://shixiang.tech",
  },
  nav: {
    reports: "AGI Reports",
    insights: "Explore Insights",
  },
  hero: {
    eyebrow: "Research the curve. Bet the decade.",
    headline: "Research first.",
    subline: "推动科技大航海。",
    cta: "Get Our Latest Research  →",
    updatedLabel: "Updated",
  },
  focusGrid: {
    // Deprecated 2026-04-20: replaced by the Thesis terminal-window component. Kept so nothing breaks if an old reference lingers.
    items: ["AGI Labs", "Robotics", "AI for Science", "Agent-Native"] as const,
  },
  thesis: {
    filename: "shixiang-agi-thesis.md",
    command: "$ cat thesis.md",
    updatedLabel: "UPDATED",
    branch: "main",
    ready: "ready",
    entries: [
      {
        slug: "agi-labs",
        tag: "AGI Labs",
        desc: "模型能力仍是价值创造的核心变量",
        sub: "全球 Tier-1 AI Labs · Neo Labs · LLM-native Infra",
      },
      {
        slug: "robotics",
        tag: "Robotics",
        desc: "VLA 将解锁通用机器人的 ChatGPT 时刻",
        sub: "机器人硬件 · 仿真与数据 · Foundation Model for Robotics",
      },
      {
        slug: "ai-for-science",
        tag: "AI for Science",
        desc: "AI 正在重构科学发现的范式，下一个 10 亿美元分子一定来自 AI",
        sub: "AI 制药 · AI 材料 · Research Agents",
      },
      {
        slug: "agent-native",
        tag: "Agent-Native",
        desc: "Agent 是组成新的互联网，会带来软件的下一次重写",
        sub: "Coding Agent · Infra for Agent · Vertical Agent",
      },
    ],
  },
  reportsList: {
    featuredEyebrow: "LATEST REPORT",
    featuredCta: "View full report →",
  },
  reportDetail: {
    back: "← Back to Reports",
    introTitle: "READING GUIDE",
    introPlaceholder: "导读内容即将发布。",
    shareTitle: "SHARE THIS REPORT",
    shareWechat: "微信",
    shareTwitter: "X",
    shareCopyLink: "Copy link",
    shareCopied: "已复制",
    shareWechatToast: "已复制链接，粘贴到微信即可分享",
    embedPlaceholder: "Deck preview (coming soon)",
  },
  wechatModal: {
    label: "WECHAT",
    title: "关注海外独角兽公众号",
    hint: "扫一扫二维码，获取前沿研究",
    close: "关闭",
  },
  footer: {
    contactLabel: "CONTACT",
    contactEmail: "investment@shixiangcap.com",
    officesLabel: "OFFICES",
    offices: "Beijing  ·  Shanghai  ·  Hong Kong",
    wechatLabel: "WECHAT",
    wechatHandle: "@海外独角兽",
    copyright: `© ${new Date().getFullYear()}  SHIXIANG TECH  ·  拾象科技`,
  },
} as const;
