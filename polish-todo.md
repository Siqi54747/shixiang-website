# Polish Todo — 上线后再打磨

> 这份清单是"上线阻塞"和"品质打磨"的合并账本。每条带**状态**(待办 / 等外部 / 已完成)、**触发条件**(什么时候该做)和**落地指引**(做的时候从哪儿开始)。
>
> 上一轮 session 把 polish 项散落在 `docs/handoff-content-cms-2026-04-21.md` 的"选做 — Rich typography"和"Phase 4 收尾"两节;本轮决定把 `/thesis/<slug>` 站内详情页废弃,相关 polish 从 handoff 迁过来,统一到这里。
>
> 最近更新:2026-04-23

---

## P0 — 上线阻塞(必做才能正式对外)

### [ ] 绑定 `shixiang.tech` 域名
- **状态**:待办
- **落地**:Vercel project `siqi54747's projects / shixiang-website` → Settings → Domains → Add `shixiang.tech` + `www`。DNS 侧配好 A 记录或 CNAME。
- **当前占位**:https://shixiang-website-ten.vercel.app

### [ ] 补齐其他 3 条 deck 的 Google Drive URL + intro 段落
- **状态**:等运营交付(ai-agents / robotics / founder-notes)
- **新 workflow**(2026-04-23 起 CMS 切飞书 Base):运营在 Base 里直接填对应 record 的 Embed URL 和 Intro 字段,然后通知开发跑 `npm run sync:decks` → commit → push。详见 `docs/operations-decks-base.md`
- **前置动作**:Base 建表 + 填初始 4 条数据 + Vercel env 配 4 个 LARK_* 变量(见下一项)

### [ ] Reports CMS:飞书 Base 上线前置
- **状态**:代码 pipeline 已就绪(commit `scripts/sync-decks-from-base.ts`),等 3 项动作
  1. 拾象飞书租户下建自建应用,拿 `app_id` + `app_secret`,开通 `bitable:app:readonly` scope
  2. 建 "拾象官网 — Decks" Base,按 `docs/operations-decks-base.md` 的 schema 加 13 列,把现有 4 条 deck 数据录入
  3. `.env.local` 填 4 个 LARK_* 变量,本地跑一次 `npm run sync:decks` 验证,diff 不变化(因为数据一样) = 通过
- **验收**:运营改一个测试字段(比如 Intro 加一句)→ sync → 线上看到变化 = pipeline 走通
- **落地手册**:`docs/operations-decks-base.md`

### [ ] OG 图
- **状态**:待办
- **落地**:`@vercel/og` 做动态 og 图。至少首页 + 4 条 reports 详情页(/reports/<slug>)各自一张。拾象品牌 crimson + 思源黑体 SC

### [ ] Plausible analytics
- **状态**:待办
- **落地**:plausible.io 先建 site → 拿 domain → 在 `app/layout.tsx` 注入 `<script defer data-domain=... src="https://plausible.io/js/script.js" />`

### [ ] Lighthouse 跑一轮 → perf / a11y / SEO ≥ 90
- **状态**:待办(建议最后做,前面所有改动 settle 后跑)
- **落地**:Chrome DevTools → Lighthouse → Mobile + Desktop 各一轮。重点关注首屏字体 preload、iframe lazy load、img loading="lazy"

---

## P1 — 可上线再打磨

### [ ] UO-articles `images/` 子目录 push 完毕
- **状态**:等用户动作(原 handoff 就有)
- **现状影响**:**Thesis 详情页废弃后,这条的迫切度降为 0**。只有两处还会受影响:
  1. 如果未来站内详情页复活(见下文 "revive thesis detail page")
  2. reports 详情页的 reading guide 里如果有引用 UO 图(目前没有)
- **落地**:push 到 `Siqi54747/UO-articles/main/images/<slug-dir>/*.png` 后,thesis md 里的绝对 raw.githubusercontent URL 会自动解析

---

## P2 — 可选打磨(品质向,不影响上线)

### [ ] Revive in-site thesis detail page(/thesis/<slug>)
- **状态**:2026-04-23 决策临时废弃,代码保留
- **什么时候考虑复活**:
  - 公众号原文被墙/删/改链 → 我们需要自留一份
  - 拾象要做 SEO,需要 shixiang.tech 域名下的长文内容页
  - 要加拾象特有的 UX(评论 / 相关 thesis 推荐 / 阅读进度 / 翻译切换)
  - 运营需要把 thesis 和内部 deck 交叉引用
- **复活起点**(不要从零开始):
  - `lib/markdown.ts` 完整保留,含 6 条 preprocess + 3 条 postprocess 规则
  - `content/theses/*.md` × 4 完整保留
  - 删除的 `app/thesis/[slug]/page.tsx` 可从 commit `29ba8f1^` 还原
  - copy.ts 的 entries 需要补回 `slug → 路由` 的 link 逻辑(href 改回 `/thesis/<slug>`,或同时支持外链 + 站内)
- **复活时还要收尾的 polish**(这些是已经看到问题但因为废弃而没做的):
  - **侧栏 sticky TOC**:从渲染后的 `<h2>` 程序生成锚点目录;layout 从 `max-w-[720px]` 居中改为 `grid [1fr, 240px]`;`<h2>` 加 `scroll-margin-top` 避免被 sticky header 遮
  - **子章节层级细粒度**:P2 规则现在"短 bold-only ≤40 字 → h3"一刀切。若复活后发现 "1.xxx / 2.xxx" 子主题不够显眼,加新规则或分层
  - **prose-img border 取舍**:`prose-img:border prose-img:border-rule` 给正常图加一圈边;broken img 已被 P3 的 `onerror` 兜底。如果觉得边框重,可以整条删
  - **图片 caption**:UO 正文图后面常跟一句说明文字作为独立段,视觉上像 caption 但目前是普通 `<p>`。考虑启发式识别(短 + 在 img 之后)→ `<figcaption>`
  - **figure 环绕**:把 `<img>` 包 `<figure>` 统一 caption 排版

### [ ] Reports 详情页样式再审
- **状态**:handoff 时已 settle(`852d0ed` 的 2:1 + 16:9),但新增内容后要复核
- **触发**:其他 3 条 deck 的 embed 都有了之后,统一看一遍对不对齐

### [ ] Webhook 触发 Vercel rebuild(reports CMS 自动化升级)
- **状态**:2026-04-23 决策暂不做,记账
- **触发条件**:季度 deck 发布频率涨到 4+ / 运营要求"改完 Base 不用找开发"
- **落地**:
  - Vercel project → Git → Deploy Hooks 生成一个 URL
  - 飞书 Base → 自动化流程 → 记录变更 → HTTP 请求 该 URL
  - build 时加 prebuild: `"prebuild": "npm run sync:decks || true"`(`|| true` 确保 API 挂不阻塞)
- **风险**:飞书 API 参与部署路径,需要完整的 error 处理和 fallback 机制

### [ ] About 页
- **状态**:2026-04-19 决策**不做**,此处仅为记账。如果未来需求反转再评估

---

## 不做(已决策锁定,记录避免反复)

- ~~立即换 CMS(Sanity / Notion / 飞书 Base)~~ — 2026-04-21 决策:内容 source 是 UO archive,换 CMS 不划算。Trigger 条件见 handoff
- ~~DocSend 切回~~ — 2026-04-19 决策:第三方 cookie 死结
- ~~About 页~~ — 2026-04-19 决策
- ~~本轮 5 条 thesis markdown 规则 revert~~ — 2026-04-23 决策:代码保留,复活时用

---

## 旧 handoff 清单对照(迁移留痕)

| 原 handoff 位置 | 原状态 | 本表位置 |
|---|---|---|
| 必做 — UO images push | 必做 | P1(详情页废弃后降级) |
| 必做 — 3 deck URL + intro | 必做 | P0 |
| 必做 — 每篇 thesis frontmatter 核对 | 必做 | **取消**(站内详情页废弃后不再相关) |
| 选做 — 追加 thesis preprocess 规则 | 选做 | P2(仅复活后) |
| 选做 — 调整 `.prose` 细节 | 选做 | P2(仅复活后) |
| Phase 4 收尾 — 域名 / OG / Plausible / Lighthouse | 待办 | P0 |
