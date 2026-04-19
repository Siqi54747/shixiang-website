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
    items: ["AGI Labs", "Robotics", "AI for Science", "Agent-Native"] as const,
  },
  reportsList: {
    featuredEyebrow: "LATEST REPORT",
    featuredCta: "View full report →",
  },
  reportDetail: {
    back: "← Back to Reports",
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
