# 拾象官网 — Project Overview

> Evergreen 1-pager。不是 session handoff（那类看 `handoff-*.md`），也不是决策史（看 `decisions.md`）——这是**项目长期记忆**：核心信息 / 选型踩过的坑 / 产品原则。
>
> 日后开新 session / 和新同事 onboard / 自己回顾时，读这一份就够。

---

## 一、核心信息

**Repo**：`Siqi54747/shixiang-website`（main branch 线性历史）
**线上域名**：主域名 `shixiang.com`（旧域名 `shixiangcap.com` / `www.shixiangcap.com` 均 308 跳转至此；Vercel 预览 `shixiang-website-ten.vercel.app` 仍可访问）
**Stack**：Next.js App Router + Tailwind + `@tailwindcss/typography`，Vercel 部署
**作者**：Siqi（non-coder，AI pair-programming 全流程），起建于 2026-04，两周业余时间完成首版

**页面结构**

| 路由 | 内容 | 来源 |
|---|---|---|
| `/` | Hero + Thesis terminal window | `content/copy.ts` |
| `/reports` | Deck 合集列表 | 飞书 Base → `content/decks.ts` |
| `/reports/[slug]` | Deck 详情（左 iframe + 右 reading guide，2:1 split，16:9） | 同上 |
| Thesis 入口 | 首页 terminal 4 条 entry **外链**公众号原文 | `content/theses/*.md` 的 frontmatter `url` |

**内容 pipeline**

- **Decks**：运营在飞书 Base 编辑 → `npm run sync:decks` → commit → Vercel 部署（详见 `docs/operations-decks-base.md`）
- **Thesis 长文**：source 是 `Siqi54747/UO-articles`（公众号归档 public archive，379 篇）。站内详情页**已废弃**，只保留 frontmatter 做首页 entry 外链
- **全站 UI 文案**：集中在 `content/copy.ts`，运营可改不碰代码

---

## 二、选型 / 采购踩过的坑

按时间顺序，为日后反复评估类似取舍留存。

### Deck 分发：自建翻页器 → DocSend → Google Drive（三次转向）

- **2026-04-11** 决定用 DocSend（VC 行业标配，有邮箱门 / 追踪 / NDA），废弃自建翻页器 + Supabase 邮箱池
- **2026-04-19** DocSend 切 **Google Drive `/preview` iframe**。原因：Safari ITP + Chrome 无痕 + Firefox ETP 默认 block 第三方 cookie，DocSend iframe 在这些场景直接空白。**这不是 bug 是架构冲突，不可绕过**（Storage Access API 要手动 grant，CHIPS 要等 DocSend 实现）
- **失去**：精细访问追踪、邮箱 gate、水印、NDA
- **换回**：全浏览器兼容 + CN 访客看到熟悉品牌标识（优雅失败）
- **前提判断**：当前阶段优先"任何人都能看 deck"，不是"精细追踪每个访客"。若后续重心转向 IR 精细运营再评估切回

⚠️ **下次想切回 DocSend 之前，先重读这条和 `decisions.md` 2026-04-19，别再走一圈。**

### CMS：markdown vs Notion vs Sanity vs 飞书 Base

- **Thesis 不换 CMS**（2026-04-21）：source 是 400 段公众号归档，切 CMS 要手工清洗全部段落，成本高于 markdown pipeline 的 preprocess 规则
- **Reports 切飞书 Base**（2026-04-23）：13 字段结构化 + 运营已在飞书生态
- **淘汰**：Notion（富文本 → HTML 有坑）/ Sanity（季度 1-4 份 deck 不值得搭 Studio）/ Google Sheets（多段富文本编辑差）
- **原则**：**按数据形态分场景挑工具**，同一项目里两种 CMS 并存是合理的，不必统一

### 飞书 sync 不上 build hook

刻意不把 `sync:decks` 放到 Vercel build 阶段：build 期调外部 API = 部署健康度绑死在飞书 SLA 上，token 过期 / 限流 / 网络抖动都会阻塞上线。手动触发的代价只是一条命令。

### Thesis 站内详情页废弃 → 外链公众号

- **2026-04-23** 删 `/thesis/[slug]`，首页 entry 改外链公众号，glyph `→` → `↗`
- 原因：与 WeChat 导出 markdown 的 quirk 无止境搏斗（`****` 粘连 / `**NN.**` 双段 heading / 💡 目录 / broken img / 子章节扁平...）。公众号原页是作者确认过的排版，没必要镜像
- **代码 / markdown pipeline 都保留**（`lib/markdown.ts` 6+3 条规则、`content/theses/*.md`），复活路径见 `decisions.md` 2026-04-23

### 本地 `next build` 卡 jest-worker 死锁

本机 I/O 压力时会卡 9 分钟+。**不要重复踩**：本地只跑 `npx tsc --noEmit` 验证类型，真正的 build 交给 Vercel Linux builder。

### 字体自托管

用 `next/font` 自托管（commit `007ef46`），不走 CDN 外链。避免字体加载阻塞 + 第三方字体服务的可用性风险。

### Node 版本

Node 22.22.2（fnm），`.node-version` 存在但 untracked（本地私有，不 commit）。

### Git author

本 repo `user.email = 107621758+Siqi54747@users.noreply.github.com`（local config）。**Vercel author-check 依赖这个**，换机器要记得重配。

---

## 三、产品原则

### Content hub, 不是 landing page
首页不是单 CTA 漏斗，是 thesis / decks / reports 的入口。**点进去有东西读**是核心价值。对外介绍时主动框定这个预期。

### Pattern 层修复, 不点对点 patch
Siqi 给 1-2 个格式 bug 截图 = 全文 pattern 代表。动手顺序：
1. grep 扫同类报 total count
2. 写规则（`lib/markdown.ts` 的 preprocess / postprocess）
3. commit 附命中统计（如 `201 → 0`）

踩过坑：markdown `**` 残留连续三轮只修截图里的点，第四轮 pushback 才全扫出 201 + 14 处系统性问题。

### 运营与工程解耦
运营在飞书编辑 → 手动 sync → commit → 部署。**飞书可达性不参与 Vercel 部署健康度**。代价是每次内容改完要跑一条命令，换来 SLA 独立。

### 不变量对齐（Phase 4 已稳定，不要回头改）
- 全站横向 padding：`px-6 md:px-24` 对齐 header
- Report Detail：2:1 split + 16:9 iframe（commit `852d0ed`）
- Hero + Terminal section padding 对齐 header（commit `cced41c`）
- Thesis Window terminal 视觉：Landing V7 spec v3（commit `f504144`）
- Deck 嵌入：Google Drive `/preview`，**不要回 DocSend**

### 优雅失败 > 精细追踪
CN 访客被墙时看到 Google Drive 品牌标识 > DocSend 的冷灰色 cookie 警告。结构性限制无法绕过时，让失败本身是可读的。

### 文案集中管理
全站 UI 文案在 `content/copy.ts`，组件 import 引用。运营改文案不用理解代码。

### Visual-first QA（Siqi 是 non-coder）
UI 改动落盘后先自检：`preview_screenshot` + `preview_console_logs` + `preview_network`。**commit 前必须 `git diff --cached` 肉眼过一遍**，尤其 `Edit` + `replace_all: true` 之后——"All occurrences replaced" 被证伪过。

### Deck 分享参考 Coatue 思路
季度 insights deck 结构化发布，不是 one-off。每季一条 featured，其他 Coming Soon 占位，形成节奏预期。

### Institutional memory 是一等公民
- 重大技术选择 → `decisions.md`（追加，写清 why + 否决方案）
- Session 尾声 → 迭代 `docs/handoff-*.md`，**不新建**
- 长期 evergreen 总览 → 本文档
- commit message 写 why, 不只是 what

---

## 相关文档索引

| 文档 | 用途 |
|---|---|
| `CLAUDE.md` | 新 session 第一口气读的项目约束 |
| `decisions.md` | 时间轴决策史 + 否决方案（why 的权威来源）|
| `docs/handoff-content-cms-2026-04-21.md` | 最近一轮 session 的 catch-up 入口 |
| `docs/operations-decks-base.md` | 飞书 Base → TS 的 sync 运营手册 |
| `docs/site-ops-runbook.md` | 站点运维 runbook |
| `polish-todo.md` | Polish 积压清单（P1/P2）|
| `progress.md` | 整体进度追踪 |
| `prd.md` | 原始 PRD（已部分过时，以 decisions.md 为准）|
| **`docs/project-overview.md`**（本文档）| **长期总览 / 新人 onboard / 反复评估类似选型时回看** |
