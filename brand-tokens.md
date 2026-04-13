# 拾象官网 — Brand Tokens

> 本文件是品牌指引在代码层面的映射，所有颜色、字体、Logo 使用规则以此为准。
> 来源：`brand/brand-guidelines.pdf` + PRD 第 2/8 章 + 产品负责人确认。

---

## 1. 颜色系统

### 1.1 Crimson 赤颜红（品牌主色）

基色：`#A11F2A` (R161 G31 B42)

| 色阶 | Hex | Tailwind class | 使用场景 |
|---|---|---|---|
| 50 | `#FDF2F3` | `crimson-50` | 极浅底色、hover 背景 |
| 100 | `#FCE4E6` | `crimson-100` | — |
| 200 | `#F9CDD0` | `crimson-200` | — |
| 300 | `#F3A3A9` | `crimson-300` | — |
| 400 | `#EA6E77` | `crimson-400` | — |
| 500 | `#DC4450` | `crimson-500` | — |
| 600 | `#A11F2A` | `crimson-600` | **品牌基色**：CTA 按钮、Logo 大象、链接 hover |
| 700 | `#8B1B25` | `crimson-700` | CTA hover/active 态 |
| 800 | `#741A22` | `crimson-800` | — |
| 900 | `#621A20` | `crimson-900` | — |
| 950 | `#360B10` | `crimson-950` | — |

### 1.2 Quantum 量子灰（中性色）

基色：`#17171C` (R23 G23 B28)

| 色阶 | Hex | Tailwind class | 使用场景 |
|---|---|---|---|
| 50 | `#F7F7F8` | `quantum-50` | 页面背景（浅灰底） |
| 100 | `#EDEDEE` | `quantum-100` | 卡片背景、分割线 |
| 200 | `#D4D4D6` | `quantum-200` | 次要分割线、边框 |
| 300 | `#B0B0B4` | `quantum-300` | 占位符文字 |
| 400 | `#8A8A90` | `quantum-400` | 辅助信息文字（日期、元信息） |
| 500 | `#6B6B72` | `quantum-500` | 次要正文 |
| 600 | `#53535A` | `quantum-600` | — |
| 700 | `#3E3E44` | `quantum-700` | — |
| 800 | `#2A2A2F` | `quantum-800` | 深色区块背景 |
| 900 | `#1E1E23` | `quantum-900` | — |
| 950 | `#17171C` | `quantum-950` | **品牌基色**：正文文字、标题 |

### 1.3 纯白/纯黑

| 名称 | Hex | 用途 |
|---|---|---|
| White | `#FFFFFF` | 页面主背景、白色文字（暗色背景上） |
| Black | `#000000` | 不直接使用，用 quantum-950 代替 |

### 1.4 品牌色使用规则（克制原则）

**允许使用 Crimson 的场景：**
- Logo 中的大象图形
- 关键 CTA 按钮（"查看完整报告"等）
- 链接 hover 状态 / 下划线
- OG 图中的品牌标识

**不使用 Crimson 的场景：**
- 大面积背景色
- 正文文字
- 导航栏文字
- 通用 UI 元素（边框、分割线、输入框）
- 装饰性色块

> 总原则：品牌色是点缀，不是主色调。网站整体色调为黑白灰。

---

## 2. 字体系统

### 2.1 字体家族

| 用途 | 字体 | 备注 |
|---|---|---|
| 中文（所有场景） | Noto Sans SC（思源黑体简中） | 品牌指引唯一指定字体 |
| 英文（UI + 正文） | Inter | 与 Noto Sans SC 搭配 |
| font-family 声明 | `'Inter', 'Noto Sans SC', sans-serif` | 英文优先匹配 Inter，中文 fallback 到 Noto Sans SC |

### 2.2 字号与字重

| 用途 | 字号 | 字重 | 行高 | Tailwind |
|---|---|---|---|---|
| Hero slogan | 56px (3.5rem) | Bold 700 | 1.3 | `text-[56px] font-bold leading-tight` |
| 区块标题 h2 | 32px (2rem) | Bold 700 | 1.4 | `text-3xl font-bold` |
| Deck 标题 | 24px (1.5rem) | Medium 500 | 1.5 | `text-2xl font-medium` |
| 正文 | 18px (1.125rem) | Regular 400 | 1.75 | `text-lg leading-relaxed` |
| 辅助信息 | 14px (0.875rem) | Regular 400 | 1.5 | `text-sm` |
| 按钮文字 | 16px (1rem) | Medium 500 | 1.5 | `text-base font-medium` |

> 响应式调整：Hero slogan 在移动端缩小到 36px，区块标题缩小到 24px。

### 2.3 字体加载

- **方式**：Self-host（放在 `/public/fonts/`），不用 CDN
- **Noto Sans SC**：加载 Regular (400) 和 Bold (700) 两个字重，Medium (500) 可选
- **Inter**：加载 Regular (400) 和 Medium (500) 两个字重
- **格式**：woff2（最小体积）
- **子集化**：Noto Sans SC 做中文子集化以减小文件体积

---

## 3. Logo 使用

### 3.1 文件映射

| 文件 | 场景 |
|---|---|
| `logo-horizontal-black.png` | 导航栏（白色背景）、Footer（白色背景） |
| `logo-horizontal-white.png` | 暗色背景区块、图片叠加 |
| `logo-horizontal-brand.png` | 强化品牌识别的特殊场景 |
| `logo-vertical-black.png` | OG 图生成、favicon 源文件 |
| `logo-vertical-brand.png` | 竖版品牌色场景 |

### 3.2 导航栏 Logo

- 导航栏高度：50px
- Logo 使用横版，图片高度约 28-30px（导航栏内留上下间距）
- 使用 Next.js `<Image>` 组件，设置固定高度 + 自动宽度

### 3.3 Favicon

- 从 `logo-vertical-black.png` 裁切大象符号（Symbol）
- 生成尺寸：32x32 (favicon.ico)、180x180 (Apple touch icon)、192x192 + 512x512 (PWA)

### 3.4 OG 图

- 使用 `logo-vertical-black.png` 或 `logo-vertical-brand.png`
- 背景白色，左侧 logo + 右侧标题文字
- 尺寸：1200x630

### 3.5 禁止事项

- 不可拉伸或压缩（保持原始比例）
- 不可旋转或翻转
- 不可更改颜色（仅限品牌色 / 黑 / 白三种变体）
- 不可添加阴影、描边、发光等特效
- 不可改变结构或拆分元素
- 不可放在杂乱或低对比度背景上

---

## 4. 辅助图形

品牌指引定义了一套 2D 红色点阵图案（源自大象 logo），用于实体物料。

**首期官网不使用此图案**，保持纯粹的黑白灰留白风格。后续版本可考虑作为微妙装饰元素引入。

---

## 5. 响应式断点

| 端 | 屏幕宽度 | Tailwind 断点 | 关键差异 |
|---|---|---|---|
| 手机 | <768px | 默认 | Hero 36px、单列布局 |
| 平板 | 768-1023px | `md:` | 简化布局 |
| 桌面 | ≥1024px | `lg:` | Hero 56px、完整布局 |

Mobile-first 写法：所有样式默认为手机端，通过 `md:` 和 `lg:` 前缀向上覆盖。

---

## 6. 待确认项（check list）

- [ ] Hero slogan 56px 是否合适（上线前 review）
- [ ] Noto Sans SC 中文子集的字符范围确认
- [ ] OG 图的具体布局（等内容确定后设计）
