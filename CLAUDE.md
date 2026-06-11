# shixiang-website

拾象官网，Next.js + Tailwind，部署在 Vercel。main branch 线性历史，线上主域名 `shixiang.com`（旧域名 `shixiangcap.com` / `www.shixiangcap.com` 均 308 跳转至此；Vercel 预览 `shixiang-website-ten.vercel.app` 仍可访问）。

## 开始新 session 先读这三份

- `docs/project-overview.md` — **长期总览**：核心信息 / 选型踩过的坑 / 产品原则（evergreen，不随 session 过期）
- `docs/handoff-content-cms-2026-04-21.md` — 最近一轮 session 的 catch-up 入口（路由、内容模型、Phase 4 不变量）
- `decisions.md` — 决策史 + 否决方案

`git log --oneline -20` 补最近改动。

## 不变量（不要改）

- **全站 horizontal padding**：`px-6 md:px-24` 是 canonical，对齐 header；新页面沿用
- **Report Detail 页**：2:1 split + 16:9 iframe（commit `852d0ed`）
- **Hero + Terminal section padding**：已对齐 header（commit `cced41c`）
- **Thesis Window terminal 视觉**：Landing V7 spec v3（commit `f504144` 起）
- **Deck 嵌入**：Google Drive `/preview` iframe，不要回 DocSend（Safari / Chrome 无痕的第三方 cookie 死结，见 `decisions.md` 2026-04-19）

这些 Phase 4 已反复迭代稳定，回头改需要先和 Siqi 确认。

## 内容流

- **Thesis 长文**来自 `Siqi54747/UO-articles` public archive（WeChat 公众号归档），不是新写
- 格式 quirk 在 `lib/markdown.ts` 的 preprocess 规则里集中处理，不要逐篇 patch
- 新内容出现格式 bug → 先 grep 扫全文看 pattern count → 追加规则到 `lib/markdown.ts` → commit message 附命中统计

## 本地开发

- **Node 22.22.2**（fnm），`.node-version` 存在但 untracked
- **本机 `next build` 会卡 jest-worker 死锁**（9 分钟+），不要重复踩
  - 本地只跑 `npx tsc --noEmit` 验证类型
  - 真正的 build 交给 Vercel Linux builder
- Git author `107621758+Siqi54747@users.noreply.github.com`（Vercel author-check 依赖）

## UI 改动的验证流程

Siqi 是 non-coder，依赖浏览器肉眼验证。落盘后我先自检，再交给她：

1. `preview_start`（如未跑）
2. 改动页面 `preview_screenshot` + `preview_console_logs`
3. 有问题自己循环修，没问题贴 screenshot 给她确认

**commit 前必须 `git diff --cached` 过一遍**，特别是 `Edit` + `replace_all: true`。
踩过坑：`aspectRatio` 替换两轮，tool 返回 "All occurrences replaced" 但只改了 placeholder 分支，line iframe 没动，Siqi 在浏览器量出来才发现。inline style / className 字面量尤其要 verify。

## 反馈解读

Siqi 截图指某个格式问题时，当 pattern 代表，不是点对点 bug。先全文 grep 报 count，再写规则层修复（见 `lib/markdown.ts` 既有模式）。

## 持久化

- 重大技术选择 → 追加到 `decisions.md`
- Phase / Session 尾声 → 更新 `docs/handoff-*.md`，不要新建
- commit message 清楚写 why，不只是 what
