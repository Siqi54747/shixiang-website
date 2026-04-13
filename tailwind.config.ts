import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // TODO: 部署时替换为 Google Fonts（Inter + Noto Sans SC）
        // 本地开发用系统字体栈，因为 fonts.gstatic.com 有网络限制
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "'PingFang SC'",
          "'Hiragino Sans GB'",
          "'Microsoft YaHei'",
          "sans-serif",
        ],
      },
      colors: {
        crimson: {
          50: "#FDF2F3",
          100: "#FCE4E6",
          200: "#F9CDD0",
          300: "#F3A3A9",
          400: "#EA6E77",
          500: "#DC4450",
          600: "#A11F2A",
          700: "#8B1B25",
          800: "#741A22",
          900: "#621A20",
          950: "#360B10",
        },
        quantum: {
          50: "#F7F7F8",
          100: "#EDEDEE",
          200: "#D4D4D6",
          300: "#B0B0B4",
          400: "#8A8A90",
          500: "#6B6B72",
          600: "#53535A",
          700: "#3E3E44",
          800: "#2A2A2F",
          900: "#1E1E23",
          950: "#17171C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
