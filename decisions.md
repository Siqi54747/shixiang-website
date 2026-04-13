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
