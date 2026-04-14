# 拾象官网 — 进度记录

> 本文件记录当前项目的交付状态，每次会话结束更新。

---

## 🗓️ 2026-04-14 End of Day

### ✅ 今天完成了什么

**代码层面（基于 Figma 终版设计稿重写）**
- 设计 tokens：`cream`（#FAFAF7）/ `rule`（#D8D6CF）/ `ink`（#17171C）/ `muted`（#5A5A60）/ `meta`（#9A9A9F）/ `crimson`（#A11F2A）/ `obsidian`（#1C0607）
- 字体系统：`EB Garamond`（衬线大标题）+ `Epunda Sans`（eyebrow）+ `Inter`（UI 正文）+ `Noto Sans SC`（中文）— 通过 Google Fonts `<link>` 加载
- 统一 50px 固定 Header：横版 logo + 红色 `AGI REPORTS` 按钮 + `Explore Insights`（点击弹微信二维码 modal）
- 三栏 Footer：CONTACT / OFFICES / WECHAT + 顶部米灰 rule + 底部版权
- 首页重写：eyebrow + 96px 衬线 `Research first.` + 52px 中文副标题 `推动科技大航海。` + CTA + Focus Grid（4 列 AGI Labs / Robotics / AI for Science / Agent-Native，crimson 分隔线）
- 新组件：`<WechatModal>`（ESC 关 / 点蒙层关 / body 锁滚）、`<FocusGrid>`、`<DocSendEmbed>`（url 空时显示 placeholder）、`<ShareBar>`（微信 / X / Copy link + clipboard + toast）
- `/reports` 列表页：左深酒红 featured card（sticky）+ 右纯文字列表（divide-y）
- `/reports/[slug]` 详情页：back 链接 + 月份 eyebrow + 衬线大标题 + meta 行 + DocSend embed + share bar；用 `generateStaticParams` 做 SSG
- 数据层 `content/decks.ts`：`Deck` 接口 + 4 条 placeholder + helper 函数（`getFeaturedDeck`/`getOtherDecks`/`getDeckBySlug`/`getRelatedDecks`/`formatMonthYear`）
- 文案集中在 `content/copy.ts`（全新 schema）

**内容/运营层面**
- 飞书多维表格 `SX Website Deck` 已创建（token: `Fx8Xbk8w9aIAy1sbPkzcOliBnse`），13 个字段全部落地
- Slug 字段补上了命名规则描述（`[主题]-[年份]-q[季度]` 约定）

**设计层面**
- Figma 3 张设计稿（Landing / Reports List / Report Detail）统一 Nav + Footer + 边距（96px）
- 视觉方向确定：米白背景 + 衬线英文 + 黑体中文 + 克制的拾象红作为 accent（Coatue Perspectives 气质）

### 📋 当前代码状态

| 模块 | 状态 | 备注 |
|---|---|---|
| Header / Footer | ✅ 完成 | 三个页面统一复用 |
| 首页 `/` | ✅ 完成 | Hero + Focus Grid |
| 列表页 `/reports` | ✅ 完成 | featured + list |
| 详情页 `/reports/[slug]` | ✅ 完成 | DocSend embed 位是 placeholder |
| WechatModal | ✅ 完成 | 用 `/public/images/wechat-qr.jpg` |
| ShareBar | ✅ 完成 | 复制链接 + X 分享 |
| DocSend 集成 | ⏸ 待数据 | 等产品方给 embed URL，组件已就位 |
| 飞书 Base → Next.js | ⏸ Phase D | 当前数据在 `content/decks.ts`，后续切到 Lark API |
| About 页 | ❌ 未做 | 设计稿里没出现，暂缓 |
| OG 图 | ❌ 未做 | Phase D |
| Plausible | ❌ 未做 | Phase D |

### 🌐 部署状态

- **GitHub 仓库**：https://github.com/hannahhoo47/shixiang-website（private）
- **今日最新 commit**：已 push 到 `origin/main`
- **Vercel 项目**：之前已连接（deploy URL：`shixiang-website-iyl6emvau-hannahhoo47s-projects.vercel.app`）
- **今天是否部署成功**：push 已触发 Vercel 自动构建，但**今日未手动验证构建结果**（本地 dev server 出问题后直接 push 了，没有看到 Vercel build 产物）

### 🐛 已知问题

1. **Node.js v25.8.1 导致 dev server 极慢**
   - 冷启动用时 **324 秒**（正常应 5–15s）
   - 被系统 OOM / 进程管理杀了两次
   - 原因：v25 是实验/奇数版本，Next.js 14 官方推荐 Node 18/20/22 LTS
   - 影响：本地开发不可用，但生产 build（Vercel 端）不受影响

2. **npm 依赖曾经损坏过一次**（next 二进制 symlink 断链），重装后修复，注意再次出现

---

## 🌅 明天的工作顺序（严格按此推进）

### 🥇 第一件事：修复 Node.js 版本

切换到 Node v22 LTS，之前的 324 秒冷启动就是这个锅。

```bash
# 用 nvm（推荐）
nvm install 22
nvm use 22
nvm alias default 22

# 或用 fnm / volta，任选
```

验证方式：
```bash
node -v              # 应输出 v22.x.x
cd shixiang-website
rm -rf node_modules .next
npm install
npx next dev         # 应在 15s 内 Ready
```

**在 Node 版本修好之前，不要做任何其他事。**

### 🥈 第二件事：把仓库迁移到新 GitHub 账号

**为什么**：当前仓库在个人账号 `hannahhoo47/` 下，和拾象品牌资产不应混在一起。需要把代码整包搬到拾象专属的 GitHub 账号/组织下。

**步骤**：
1. 在新账号/组织下创建 `shixiang-website`（private）
2. 本地：
   ```bash
   git remote rename origin old-origin
   git remote add origin git@github.com:<new-org>/shixiang-website.git
   git push -u origin main
   ```
3. 验证新仓库有完整历史（包括今天的 `c859661` commit）
4. 删除或归档旧仓库（`hannahhoo47/shixiang-website`）

### 🥉 第三件事：Vercel 重新导入

**为什么**：Vercel 项目绑定在旧仓库上，迁移后 auto-deploy 会失效。

**步骤**：
1. Vercel dashboard → Add New → Project → Import Git Repository → 选新仓库
2. Framework preset 自动识别为 Next.js
3. Environment Variables 从旧项目迁过来（`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_SITE_URL`）
4. Deploy → 拿到新的 preview URL
5. 删除旧 Vercel 项目

### 4️⃣ 第四件事：首页调优 + 最终上线

1. 肉眼验证 3 个页面在新部署环境的渲染（字体 / 米白背景 / 衬线大字 / 红按钮）
2. 跑移动端响应式走查（375 / 768 / 1440）
3. 接入 DocSend embed URL（产品方提供后替换 `content/decks.ts` 里 `docsendUrl` 占位）
4. 接入 Plausible analytics
5. 做 OG 图（@vercel/og）
6. Lighthouse 跑一轮，performance / a11y / SEO 都达 90+
7. 绑定正式域名

---

## 📦 今天产出的文件清单

**新增**
- `app/reports/page.tsx`
- `app/reports/[slug]/page.tsx`
- `components/WechatModal.tsx`
- `components/FocusGrid.tsx`
- `components/DocSendEmbed.tsx`
- `components/ShareBar.tsx`
- `content/decks.ts`
- `progress.md`（本文件）

**改动**
- `app/layout.tsx`（字体 link + cream bg）
- `app/page.tsx`（Hero + Focus Grid 重写）
- `app/globals.css`（cream body）
- `components/Header.tsx`（新 nav + modal 接入）
- `components/Footer.tsx`（3 栏）
- `content/copy.ts`（新 schema）
- `tailwind.config.ts`（新 tokens）
- `.claude/launch.json`（npx 路径修复）
- `.gitignore`（忽略 scheduled_tasks.lock）
- `decisions.md`（追加 2026-04-14 章节）
