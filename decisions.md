# 拾象官网 — 关键决策记录

> 本文件记录项目过程中达成的重要约定和方向决策，供新会话快速 catch up。

---

## 2026-04-11: 架构方向调整 — 从自建翻页器改为 DocSend

### 决策

所有 Deck 的展示和分发统一使用 DocSend（Dropbox 旗下的 deck 分发产品），不再自建翻页器、邮箱表单、IR 后台。

### 原因

拾象内部已在使用 DocSend。DocSend 原生支持邮箱解锁、访问追踪、权限管理，是 VC/PE deck 分发的标准工具，不应重复造轮子。

### 影响范围

**取消的模块：**
- 自建翻页器组件 `<DeckViewer>`
- PDF 转图片脚本 `scripts/process-deck.js`
- `/content/latest-deck/` 文件夹结构
- Supabase 数据库（邮箱池）
- Resend 邮件服务
- 自建下载表单 + Cookie 记住邮箱
- IR 后台 `/admin`
- IP 地理定位

**新增：**
- `<DocSendEmbed>` 包装组件（接收 DocSend share URL，输出响应式 iframe）

**保留不变：**
- 4 个页面结构（首页、Deck 详情页、About、Footer）
- Plausible 数据分析（页面级 PV/UV）
- OG 图自动生成（@vercel/og）
- 响应式布局
- 公众号二维码 + Substack 引流

**过往 Decks 变化：**
- `past-decks.json` 的 `url` 统一指向 DocSend，不再考虑双链接

---

## 2026-04-11: 待提供项

以下内容产品负责人会后续提供，目前代码中使用占位符：

- [ ] **DocSend share URL / embed 代码** — 用于 `<DocSendEmbed>` 组件
- [ ] **首页 Hero slogan** — 目前占位符："拾象是一家研究驱动的科技投资基金。"
- [ ] **About 页正文段落** — 目前占位符

---

## 2026-04-11: 文案集中管理

所有用户可见文案集中在 `content/copy.ts`，组件通过 import 引用。目的是让运营同事能直接修改文案而无需理解代码结构。

---

## 2026-04-11: Logo 使用映射

Logo 文件为 PNG 格式（5033x1598 分辨率），使用映射：

| 文件 | 场景 |
|---|---|
| `logo-horizontal-black.png` | 导航栏、Footer |
| `logo-horizontal-white.png` | 暗色背景或图片背景 |
| `logo-horizontal-brand.png` | 强化品牌识别的特殊场景 |
| `logo-vertical-black.png` | OG 图、favicon 基础 |
| `logo-vertical-brand.png` | 竖版品牌色场景 |

---

## 2026-04-14: 技术架构定稿

### 决策
- **框架**：Next.js 14（App Router）+ TypeScript + React Server Components
- **样式**：Tailwind CSS（自定义 tokens，不引第三方 UI 库）
- **渲染**：SSG（`generateStaticParams` 为每份 deck 生成静态 HTML）
- **部署**：Vercel（push to `main` 自动部署）
- **数据层当前**：本地 `content/decks.ts`（TypeScript 常量）
- **数据层目标**：飞书多维表格（Lark Base）—— Phase D 切换

### 原因
Next.js + Vercel 是轻量静态站的工业标准，部署 0 配置，SSG 性能最佳。Tailwind 保证设计 token 单一来源。

---

## 2026-04-14: 内容分发 — 全面用 DocSend

### 决策
所有 deck 展示、邮箱解锁、访问追踪统一走 **DocSend**（已确认拾象持有 DocSend Spaces 套餐，支持 iframe embed）。

### 配置约定（每份 deck）
| DocSend Link Setting | 值 |
|---|---|
| Require email | 由 DocSend 统一收集，不要在我们站上自建表单 |
| Allow embedding | **必须 ON** |
| Expiration | Never（除非是限时 deck） |

站上展示方式：`<DocSendEmbed url={deck.docsendUrl} />` 直接 iframe，4:3 比例。

---

## 2026-04-14: CMS 方案 — 待定

### 现状
飞书多维表格 `SX Website Deck`（token: `Fx8Xbk8w9aIAy1sbPkzcOliBnse`）已创建并配好 13 个字段。但**是否最终用飞书 Base 做 CMS 尚未拍板**。

### 候选方案
| 方案 | 优点 | 缺点 |
|---|---|---|
| **飞书多维表格**（当前）| 团队已在用，无额外账号；字段已建好 | API 调用需 tenant_access_token，build-time 拉数据增加复杂度 |
| **Notion**（候选）| 富文本编辑体验好；Notion API 稳定且文档完善 | 团队不一定在用，多一套账号 |

### 下一步
明天或后续决定。当前代码用本地 `content/decks.ts`，切换任一方案只需改一个数据拉取层。

---

## 2026-04-14: 视觉设计定稿

### 核心方向
**米白背景 + 衬线英文 + 黑体中文 + 克制的拾象红作为 accent**

气质参考：Coatue Perspectives、Sequoia 投研文章页。

### Design Tokens
| Token | Hex | 用途 |
|---|---|---|
| `cream` | `#FAFAF7` | 页面背景 |
| `rule` | `#D8D6CF` | 分隔线、二级按钮文字 |
| `ink` | `#17171C` | 主文字 |
| `muted` | `#5A5A60` | 副标题、次级文字 |
| `meta` | `#9A9A9F` | Meta 信息、copyright |
| `crimson` | `#A11F2A` | 品牌红（eyebrow、CTA 下划线、Focus grid 分隔、AGI REPORTS 按钮） |
| `obsidian` | `#1C0607` | 列表页 featured card 深酒红底 |

### 字体
| 字体 | 场景 | 来源 |
|---|---|---|
| **EB Garamond** | 所有英文大标题（Hero 96px、列表 featured 56px、详情页 64px、焦点 22px、邮箱 18px） | Google Fonts |
| **Epunda Sans** | Eyebrow（`RESEARCH THE CURVE. BET THE DECADE.`） | Google Fonts |
| **Inter** | Nav、CTA、meta、body、copyright | Google Fonts |
| **Noto Sans SC** | 所有中文正文 | Google Fonts |
| **Noto Serif SC** | 中文衬线（暂未使用，预留） | Google Fonts |

**英文字体决定**：统一用 Inter（UI）+ EB Garamond（展示），放弃 GT Sectra（付费字体，气质近但授权成本高）。

**中文字体决定**：当前用 Noto Sans SC（思源黑体）。未来若想调整中文衬线气质，候选是 Noto Serif SC（思源宋体）—— 待评估。

---

## 2026-04-14: 页面结构定稿

### 首页 `/`
1. 固定 50px Nav（logo + AGI REPORTS 红按钮 + Explore Insights）
2. Hero：
   - Eyebrow：`RESEARCH THE CURVE. BET THE DECADE.`（红色，大写，Epunda Sans 14px，tracking 1.12px）
   - Headline：`Research first.`（EB Garamond 96px，negative tracking）
   - Subline：`推动科技大航海。`（52px，灰色 `muted`）
   - CTA：`Get Our Latest Research →`（下划线 crimson）+ `Updated April 2026`（灰 meta）
3. Focus Grid：4 个领域 tags（AGI Labs / Robotics / AI for Science / Agent-Native），crimson 分隔线
4. 三栏 Footer

### Reports 列表页 `/reports`
左右分栏（desktop 2:3）：
- 左：深酒红（`obsidian`）大卡片，sticky，展示 featured deck（eyebrow quarter + 白色衬线大标题 + 中文副标题 + View full report CTA）
- 右：纯文字列表（`divide-y`），每条：quarter 小字 → 衬线标题 → 中文副标题

参考 Coatue Perspectives 的左右分栏信息密度。

### Reports 详情页 `/reports/[slug]`
1. 50px Nav
2. `← Back to Reports`
3. 月份 eyebrow（红色）
4. 衬线大标题（64px）
5. Meta 行：`By 拾象投研团队 · XX pages · XX min read`
6. DocSend iframe（受限宽度，保留两侧留白，4:3 比例）
7. Share bar：`微信 | X | Copy link`
8. 三栏 Footer

**关于 Continue reading**：Figma 最新稿里移除了，保留数据层 `getRelatedDecks` 函数以备后续启用。

---

## 2026-04-14: 今天放弃的方案（记录以防反复）

| 方案 | 放弃原因 |
|---|---|
| 自建 PDF 翻页器 `<DeckViewer>` | DocSend 已原生提供，造轮子成本不划算 |
| Supabase 邮箱池 | DocSend 内置邮箱解锁，不需要 |
| Resend 邮件通知 | 同上，DocSend 通知链路已解决 |
| Google Drive 分发 deck | 无访问追踪、权限管理差 |
| 腾讯文档分发 deck | 国际化阅读体验差，无 embed |
| 飞书 API build 时自动建表 | 开发阶段手工建表反而更快，表结构变动少 |

---

## 2026-04-14: 交互细节约定

- **Explore Insights** 点击：**不跳页**，弹居中 modal 显示 `/public/images/wechat-qr.jpg` + `关注海外独角兽公众号` 文字；关闭方式：点蒙层 / ESC / 右上角 ✕
- **Focus Grid 4 个 tags**：**纯展示，不可点**（一期 scope 内无分类筛选页）
- **"Get Our Latest Research →"**：链接到 `/reports/[featuredDeck.slug]`，也就是 `featured=true` 且 `status=published` 的那份 deck 的详情页
- **同一时刻 `featured=true` 只能有一份**（人工约定，无系统校验）
- **Slug 命名规则**：`[主题]-[年份]-q[季度]`，小写，连字符连接，不含中文/空格/标点。示例：`ai-agents-2026-q1`。发布后不可改（改了会 404）。

---

## 2026-04-14: 下一阶段规划

参考 `progress.md` 的 "明天的工作顺序" 章节。顺序不可颠倒：
1. 修 Node v22 LTS
2. 迁仓库到新 GitHub 账号
3. Vercel 重新导入
4. 首页调优 + 最终上线

---

## 2026-04-19: 内容分发方案从 DocSend 切换到 Google Drive preview

### 决策

Deck 展示方案从 DocSend embed 切换到 **Google Drive `/preview` iframe**。原本（2026-04-11 / 04-14）明确过的"全面用 DocSend"决策在此作废。

### 原因 — 浏览器第三方 cookie 策略

DocSend embed 依赖第三方 cookie 追踪访客 + 校验 email gate。2026 年现实是：

| 浏览器场景 | 第三方 cookie | DocSend iframe 表现 |
|---|---|---|
| Chrome 普通窗口 | 允许 | 正常加载 |
| Chrome 无痕模式 | 默认 block | 弹"浏览器已禁用 Cookie"警告，空白 |
| Safari 正常窗口（ITP）| 默认完全 block | 同上 |
| Firefox（ETP）| tracking list 内 block | 同上 |

实测在 `shixiang-website-ten.vercel.app` 上，Safari 和 Chrome 无痕下 DocSend iframe 都会显示 cookie 警告导致无法展示。这不是任何一边的 bug，是浏览器隐私趋势 + DocSend 架构的结构性冲突，不可绕过（Storage Access API 需要用户手动 grant，体验差；CHIPS / Partitioned Cookies 要等 DocSend 侧实现）。

### Trade-off

**失去**（原 DocSend 能力）：
- Email gate（访客强制填邮箱）
- 访问追踪（谁看了、哪页、停留多久）
- 过期 / 撤回控制
- 访客 email + IP 水印
- NDA 签署

**换回**：
- Safari / Chrome 无痕 / Firefox 全浏览器兼容
- 境内访客如果因为 Google 被墙打不开，能看到熟悉的 Google Drive 品牌标识，知道要另想办法（优雅失败 > DocSend 的冷灰色 cookie 警告）
- 配置极简，无登录依赖

**这个取舍的前提判断**：拾象当前阶段优先"让任何访客都能看到 deck"，而不是"精细追踪每个访客"。如果后续业务重心转向 IR 精细运营（LP 可见性、邮箱池变现、NDA 合规等），要重新评估切回 DocSend 或自建。

### 实现

- `content/decks.ts` 的 `docsendUrl` 字段重命名为 `embedUrl`（通用化，不绑定具体 SaaS）
- `<DocSendEmbed>` 组件重命名为 `<DeckEmbed>`
- URL 格式：`https://drive.google.com/file/d/<FILE_ID>/preview`
- Google Drive 文件权限：**Anyone with the link (Viewer)**，允许下载
- iframe 保持 55vh 限高 + 4:3 比例，desktop 1280x800 一屏可见

### 未变的部分

- 站点的其他所有设计、结构、路由、组件均不变
- 未来如果要支持多种 embed 源（Google Drive + DocSend + 自建）同时存在，只需扩展 `<DeckEmbed>` 的 URL 识别逻辑

