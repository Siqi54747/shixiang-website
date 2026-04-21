# Handoff — 内容与 CMS 专项 session

> 本文档是上一轮 session(Phase 1–4 + Thesis 基础设施)交棒给"内容与 CMS 专项 session"的单份入口。**新 session 第一步就读这个文件**。
>
> 作者:Claude + Siqi(上一轮 session,2026-04-21)

---

## 这个新 session 的职责范围

专注处理**内容层**和 **CMS 决策**,技术基础设施不再动(除非真的必须):

1. 填齐所有真实内容(4 篇 thesis intro + 其他 3 份 deck DocSend/Drive URL + 每份 deck 的 reading guide)
2. 处理 UO-articles 内容的 edge case(新 quirk 追加 preprocess 规则)
3. 敲定 CMS 方向(继续 markdown / 切 Notion / Sanity / 飞书 Base)
4. 若决定换 CMS,规划迁移

**不要做的事**(Phase 4 已经反复迭代过,结论稳定,不要再回头改):
- 不要动 header `px-6 md:px-24` 横向 padding(Phase 4 末期对齐过)
- 不要动 Report Detail 的 2:1 split 比例 + 16:9 iframe(commit `852d0ed`)
- 不要动 Hero + Terminal 的 section padding 与 header 对齐(commit `cced41c`)
- 不要动 Thesis Window 的 terminal 视觉(Landing V7 spec v3,commit `f504144` 起)
- 不要从 Google Drive 切回 DocSend(见 `decisions.md` 2026-04-19,第三方 cookie 问题是死结)

---

## 项目快照

- **Repo**:`Siqi54747/shixiang-website`(main branch,线性历史)
- **Vercel 线上**:`https://shixiang-website-ten.vercel.app`(还没绑 `shixiang.tech`,是 Phase 4 收尾事项)
- **Vercel team / project**:`siqi54747's projects` 下的 `shixiang-website`(Phase 3 迁到新账号)
- **Node**:22.22.2(fnm),`.node-version` 文件存在但 untracked(本地不 commit)
- **本地开发卡 jest-worker 问题**:本机 I/O 压力时 `next build` 会死锁 9 分钟+。变通:`npx tsc --noEmit` 验证类型即可,剩下让 Vercel Linux builder 跑
- **Git author**:本 repo `user.email = 107621758+Siqi54747@users.noreply.github.com`(local config,Vercel author-check 依赖这个)

---

## 路由 / 页面结构

| 路由 | 来源 | 状态 |
|---|---|---|
| `/` | `app/page.tsx`(hero + ThesisWindow) | 稳定 |
| `/reports` | `app/reports/page.tsx` | 稳定,仅 featured deck 可点,其他 3 条是 "Coming Soon" |
| `/reports/[slug]` | `app/reports/[slug]/page.tsx` | 左 iframe + 右 reading guide,2:1 split,16:9 |
| `/thesis/[slug]` | `app/thesis/[slug]/page.tsx` | Sequoia 极简,markdown pipeline,4 个 slug |

---

## 内容数据模型(重点区)

### `content/copy.ts`(全站 UI 文案)
- `copy.hero.*`:Hero 区 eyebrow / headline / subline / **intro(段落数组,真实可用)**/ cta
- `copy.thesis.*`:Thesis window 的 filename / command / **entries 4 条(slug / tag / desc / sub)**/ bottombar
- `copy.reportDetail.*`:详情页文案,含 **introTitle(READING GUIDE)**/ introPlaceholder / sharing

### `content/decks.ts`(报告 deck 数据源)
```ts
interface Deck {
  slug, title, subtitle, quarter, publishedDate, pages, readingTime?,
  embedUrl,        // Google Drive /preview URL; 空 = Coming Soon
  summary,
  featured, status,
  relatedSlugs?,
  intro?: string[] // 右栏 Reading Guide 段落(真实可用)
}
```

- 共 4 条 deck,**仅 featured `the-new-agi-landscape-2026-q1` 填了 `embedUrl` + `intro`**
- 其他 3 条(ai-agents / robotics / founder-notes)`embedUrl = ""` → 列表页自动渲染 "Coming Soon",不可点
- **下一 session 的任务**:其他 3 条 deck 的 Google Drive URL + intro 段落由运营给出填入

### `content/theses/<slug>.md` × 4(长文)
- 4 个 slug:`agi-labs` / `robotics` / `ai-for-science` / `agent-native`
- 每个 `.md` = YAML frontmatter(title / digest / url / publish_date / mp_name / cover…)+ 正文
- **source of truth:`Siqi54747/UO-articles`**(public archive,379 篇)
- 当前 4 篇的 UO 对应关系:

| slug | UO-articles 原文件 |
|---|---|
| agi-labs | `2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai.md` |
| robotics | `2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma.md` |
| ai-for-science | `2025-06-18-ai4science-tu-pu-ru-he-dian-fu-10nian-x-20yi-mei-jin-cheng.md` |
| agent-native | `2025-05-21-agent-infra-tu-pu-na-xie-zu-jian-zhi-de-wei-agent-zhong-zuo.md` |

- 图片 URL:已从相对路径 `../images/X/NNN.png` 批量改为绝对
  `https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/X/NNN.png`
- **⚠️ UO-articles 的 `images/` 目录尚未 push(用户待办)**。push 完成后这些绝对 URL 自动解析,thesis 页面的图片全部自动出现,不需要任何代码改动

### 新增一篇 thesis 的 workflow
1. 从 UO-articles 选一篇(按主题/slug)
2. `curl -sfL "https://raw.githubusercontent.com/Siqi54747/UO-articles/main/<原文件名>.md" -o content/theses/<新 slug>.md`
3. `sed -i '' 's|../images/|https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/|g' content/theses/<新 slug>.md`
4. `content/copy.ts` 的 `copy.thesis.entries` 加一条 `{ slug, tag, desc, sub }`(或换掉已有的)
5. `npx tsc --noEmit` 验证 → commit → Vercel 部署

---

## Markdown Pipeline(lib/markdown.ts)

thesis markdown → html 的全过程有 **6 条 preprocess / postprocess 规则**。所有规则都是经验式 workaround,处理的是 UO-articles 作为 WeChat 导出 archive 的系统性 quirks。

### Preprocess(`preprocessThesisMarkdown`,作用在 md 源上)
1. **`****` 粘连拆分** → `** **`(CommonMark 对 4 连续星号 bail,留下裸 `**`)
2. **删顶部 cover-image link** `[![](...)](wechat-url)`(我们有源链接脚注,cover 图 404)
3. **合并 `**NN.**\n\n**title**`** → `**NN. title**`(UO 把章节号当独立段落)
4. **截断 "排版:..." 及其后**(微信 boilerplate + 延伸阅读 card)

### Postprocess(`postprocessThesisHtml`,作用在 marked 生成的 HTML 上)
5. **P1:strip 所有残留 `**` / `__`**(跨段 bold + CJK 粘连造成的 flanking 失败)
   - 4 篇跨文件命中:`201 处 **` + `14 处 __`
6. **P2:短 bold-only `<p>` → `<h3>`**(文本 ≤40 字)
   - UO 从不发射 `#`-style heading,全是 `<p><strong>…</strong></p>`;靠这条规则重建章节节奏

### Pipeline 调用顺序
```ts
// app/thesis/[slug]/page.tsx 内
body
  → preprocessThesisMarkdown
  → marked.parse(gfm: true)
  → postprocessThesisHtml
  → dangerouslySetInnerHTML
```

### 碰到新 quirk 怎么办
- 不要换 parser,不要切 CMS(这些是小规模 regex 能搞定的)
- 直接往 `lib/markdown.ts` 追加第 7/8 条规则
- 跑 `node -e "..."` 的 dry-run 看新规则跨 4 篇的命中次数(示例见 commit `319890b` 的 message)
- 每条规则都要有**注释说明为什么存在**(不然半年后没人记得)

---

## Thesis 页面样式(Sequoia 极简)

- Container:`mx-auto max-w-[720px]` 内嵌在 `article.px-6 md:px-24`(外层对齐 header padding)
- Tag:`text-[11px] uppercase crimson`
- Title:`font-serif text-[36/44/52px]`
- Digest(副标题):frontmatter `digest` 字段,`text-[17px] leading-[1.6] muted`
- 正文:`@tailwindcss/typography` 的 `.prose prose-lg` + 一堆 `prose-*` override(详见 `app/thesis/[slug]/page.tsx`)
- 源脚注:`pt-8 border-t border-rule` + "原文首发于 海外独角兽微信公众号 ↗"

关键样式 override(放在 wrapper className 里,不是 globals):
```
prose-headings:font-serif prose-headings:text-ink prose-headings:font-medium
prose-h2:mt-12 prose-h2:text-[24px]
prose-h3:mt-10 prose-h3:text-[20px]
prose-p:text-ink prose-p:leading-[1.8]
prose-a:text-crimson prose-a:no-underline hover:prose-a:underline
prose-img:rounded-sm prose-img:border prose-img:border-rule
prose-blockquote:border-l-crimson prose-blockquote:text-muted prose-blockquote:font-normal prose-blockquote:not-italic
```

---

## CMS 决策史(关键!)

| 日期 | 决策 / 讨论 | 结论 |
|---|---|---|
| 2026-04-14 | `decisions.md` 明确"CMS 方案待定",候选飞书 Base vs Notion | 待定 |
| 2026-04-19 | 用户明说 "CMS 方案不是目前的重点" | 推迟 |
| 2026-04-21 | 4 篇 thesis 上线后,用户问"是不是 CMS 系统会更好" | **判断:不换**,原因在下 |

### 为什么 2026-04-21 决定不换 CMS(新 session 如果要重新评估,先读完这段)

1. **内容 source 是 UO-articles archive,不是新写**。换 CMS 要把 400+ 段落手工清洗一遍,工作量比写 preprocess 规则大
2. **当前 markdown pipeline 的 6 条规则**已覆盖 WeChat 导出的整类 pattern,不是点名单式的单点修复。新 quirk 追加一条即可
3. **Rich typography 微调**靠 `@tailwindcss/typography` 的 prose 覆盖就能做,不依赖 CMS
4. **运营 workflow 是"聊天驱动"**(用户明选 A 方案,2026-04-19),不是"运营在 web UI 里自己写"。这种 workflow markdown 就够
5. **真正的 CMS trigger point**:
   - 每周新增 3+ 篇 thesis
   - 非技术同事要多人协作(draft / review / 排期发布)
   - Thesis 要加结构化字段(作者头像 / 相关 deck 关联 / 阅读追踪)
   - web 上直接 WYSIWYG 编辑
   以上任一成立,再上 CMS(推荐 Sanity 或 Contentlayer,不推荐飞书 Base 因为 tenant token 和 build-time 复杂度)

### 真要开启 CMS 方向,这个 session 该怎么起步
1. 跟用户确认 trigger:上面 5 条哪一条成立?
2. 如果是"非技术多人协作"→ Notion / Sanity
3. 如果是"结构化字段扩展"→ Contentlayer(md + TypeScript schema,零 UI 但类型安全)
4. 如果是"web 上 WYSIWYG"→ Sanity Studio 或 Payload CMS
5. **迁移路径永远是"md → CMS"单向**,不要做双向同步(会打架)

---

## 关键 commits(新 session 可以 git show 回看细节)

| Commit | 主题 |
|---|---|
| `e89bb72` | Thesis 基础设施(pipeline + 4 篇 md + `<Link>` 恢复) |
| `b34220d` | `****` 拆分规则 |
| `d70c656` | 顶部 cover-link / NN. 合并 / 排版尾部截断 3 条规则 |
| `319890b` | 全局系统性扫描 → 追加 P1 strip ** + P2 短 bold → h3 |
| `bd60af6` → `9c5a079` → `852d0ed` | Report Detail 布局从 50/50 → 2:1 + iframe 真 16:9(有 Edit replace_all 翻车历史,教训:commit 前 `git diff --cached` 肉眼看过) |
| `f504144` → `cced41c` | Landing V7 Terminal + 全站横向 padding 对齐 header |
| `d036169` | DocSend → Google Drive 切换(decisions.md 2026-04-19) |

---

## 待办清单(给下一个 session)

### 必做 — 内容填充
- [ ] UO-articles 补 push `images/` 子目录,4 个 slug 各自对应一个目录(用户侧动作)
- [ ] 其他 3 条 deck(ai-agents / robotics / founder-notes)的 Google Drive URL + intro 段落(运营侧产出 → 填入 `content/decks.ts`)
- [ ] 每篇 thesis 确认 frontmatter `title` / `digest` / `publish_date` 正确展示

### 选做 — Rich typography
- [ ] 阅读 4 篇 thesis 线上效果,挑出仍不协调的 quirk → 追加 preprocess / postprocess 规则
- [ ] 调整 `.prose` 内部细节(标题字号、段距、引用块、图片 caption)

### Phase 4 收尾(不是这个 session 主线但迟早要做)
- [ ] 绑定 `shixiang.tech` 域名
- [ ] OG 图(`@vercel/og`)
- [ ] Plausible analytics 接入(plausible.io 要先建 site)
- [ ] Lighthouse 跑一轮,perf/a11y/SEO ≥ 90

### 不做
- ~~About 页~~(用户 2026-04-19 明确放弃)
- ~~DocSend 切回~~(2026-04-19 决策,第三方 cookie 死结)
- ~~立刻换 CMS~~(除非上面 5 条 trigger 成立)

---

## 新 session 怎么开场

1. `Read` 本文档 + `decisions.md` + `progress.md` 三件套
2. `git log --oneline -20` 看最近改动
3. `curl -s https://shixiang-website-ten.vercel.app/thesis/agi-labs | wc -l` 确认线上活着
4. 优先处理"必做 — 内容填充"清单
5. 仅当用户明确触发 CMS trigger,才动 CMS 评估

**内容填好 + UO images push 好 = 网站可以正式对外。** 剩下是 polish + 域名绑定。
