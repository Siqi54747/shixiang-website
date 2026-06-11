export const copy = {
  site: {
    name: "拾象科技",
    nameEn: "Shixiang Tech",
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
    items: ["AGI Labs", "Robotics", "AI for Science", "Agent-Native"] as const,
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
    contactEmail: "investment@shixiangcap.com",
    officesLabel: "OFFICES",
    offices: "Beijing  ·  Shanghai  ·  Hong Kong",
    wechatLabel: "WECHAT",
    wechatHandle: "@海外独角兽",
    copyright: `© ${new Date().getFullYear()}  SHIXIANG TECH  ·  拾象科技`,
  },
} as const;
