import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "'Noto Sans SC'",
          "system-ui",
          "-apple-system",
          "'PingFang SC'",
          "'Hiragino Sans GB'",
          "'Microsoft YaHei'",
          "sans-serif",
        ],
        serif: [
          "'EB Garamond'",
          "'Noto Serif SC'",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "serif",
        ],
        display: [
          "'Epunda Sans'",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        // Brand
        crimson: "#A11F2A",
        // Surfaces — cream updated 2026-04-20 per Landing V7 spec (#FAFAF7 → #FAF6EC, warmer)
        cream: "#FAF6EC",
        rule: "#D8D6CF",
        // Text
        ink: "#17171C",
        muted: "#5A5A60",
        meta: "#9A9A9F",
        // Featured card dark background (reports list)
        obsidian: "#1C0607",
      },
      letterSpacing: {
        eyebrow: "1.12px",
        label: "1.1px",
      },
    },
  },
  plugins: [typography],
};
export default config;
