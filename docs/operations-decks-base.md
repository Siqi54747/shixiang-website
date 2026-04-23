# 运营手册 — Reports CMS(飞书多维表格)

> 拾象官网 `/reports` 列表页和 `/reports/<slug>` 详情页的所有内容,都从一张**飞书多维表格**里拉。本手册讲清两件事:
>
> 1. **运营怎么用**:在 Base 里增删改 deck(列字段 / 填值 / 发布前核对)
> 2. **开发怎么同步**:运营改完后,谁跑 `npm run sync:decks`,谁合 PR,谁部署

---

## 工作流总览

```
[运营在 Base 编辑]
        ↓
[开发(或运营自己)跑 npm run sync:decks]
        ↓
[git diff content/decks.ts 核对]
        ↓
[commit + push]
        ↓
[Vercel 自动部署 → 线上生效]
```

**刻意不把 sync 放到 Vercel build 阶段**:build 阶段调外部 API 会让部署健康度绑死在飞书可达性上,token 过期/限流/网络抖动都会阻塞上线。手动触发让"内容更新"和"部署"解耦,代价只是每次内容改完要有人跑一下命令(~5 秒)。

---

## Base 表结构(建表时对照)

Base 名字:**拾象官网 — Decks**(或任意名)
表名:**Decks**

| Base 列名 | Base 字段类型 | 必填 | 示例 | 备注 |
|---|---|---|---|---|
| Slug | 单行文本 | ✓ | `the-new-agi-landscape-2026-q1` | URL 路径,小写英文 kebab-case,上线后**不要改**(改了相当于原链接失效) |
| Title (EN) | 单行文本 | ✓ | `The New AGI Landscape` | 列表页 + 详情页主标题,英文 |
| Subtitle (CN) | 单行文本 | ✓ | `全球 AGI 赛道全景梳理` | 中文副标题 |
| Quarter | 单行文本 | ✓ | `2026 Q1` | 年份 + 季度,用于标签展示 |
| Published Date | 日期 | ✓ | `2026-04-01` | 发布日期,列表排序按这个字段倒序 |
| Embed URL | 超链接(或文本) |   | `https://drive.google.com/file/d/XXXX/preview` | Google Drive 分享链接随便哪种格式都行(`/view` / `/view?usp=sharing` / `/preview` / `open?id=`),sync 脚本会自动归一成 `/preview`。留空 = 列表页显示 "Coming Soon",不可点 |
| Summary | 单行文本 |   | `全球 AGI 赛道全景梳理,覆盖 OpenAI / Anthropic / Google DeepMind 三家动向。` | **可选**。只为 SEO 想写一段 ≤150 字符的专门描述时才填。留空时网站回退到 Intro 第一段,再回退到 Subtitle。不在页面正文里显示,只出现在 Google / 微信分享卡的描述位 |
| Featured | 复选框 | ✓ | ☑ | 同一时刻**只能有一条** featured + published 的 deck。勾选的那条会在首页露出 |
| Status | 单选 | ✓ | `published` / `draft` | 只有 `published` 会上线;`draft` 不进 git,不部署 |
| Related Slugs | 多行文本 |   | `ai-agents-2025-q4, robotics-next-decade-2025-q3` | 逗号分隔,填其他 deck 的 slug。详情页底部 "Related Reports" 用这个;留空会自动取最新的 2 条 |
| Intro | 多行文本 |   | 见下方 | 详情页右栏 Reading Guide。**段落之间留一个空行**,sync 脚本会把它们拆成段落数组 |
| Cover | 附件 |   | 拖一张图 | **只给 featured deck 用**。16:9 比例、2MB 以内推荐。其他 deck 填了也不会在站内渲染。sync 脚本会把附件下载到 repo `public/covers/<slug>.<ext>` 并 commit,Vercel 从本地静态资源加载,不依赖飞书 CDN |

### Intro 字段格式示例(关键)

在 Base 的多行文本里这样写:

```
这份报告梳理了 2026 年一季度全球 AGI 赛道的关键变化，覆盖 OpenAI、Anthropic、Google DeepMind 等头部实验室在模型、产品、组织三个维度的动向。

我们重点关注三条主线：Coding 能力加速向自主 Agent 演进、战略组织与文化如何决定第二增长曲线、智能通缩在下游应用层的兑现节奏。

数据截止 2026 年 3 月，覆盖样本超过 200 家公司。建议先看第 12–18 页的市场结构图和第 30–36 页的投资地图，再回头读完整论述。
```

三段文字,**段之间一个空行**。渲染到详情页就是三段 `<p>`。

### Cover 字段使用指引

- **只有 featured deck(`Featured = ☑` + `Status = published`)会在 `/reports` 首页左侧露出封面图**。其他 deck 填了 cover 也不会出现在站内任何位置
- 推荐尺寸:**1600×900(16:9)**,控制在 **2MB 以内**;格式 jpg / png / webp 都可
- `npm run sync:decks` 时脚本会:
  1. 读 Cover 列的第一个附件
  2. 调飞书 drive media download API 把它拉下来
  3. 保存到 repo `public/covers/<slug>.<ext>`,扩展名按附件原 name 或 Content-Type 推断
  4. 在生成的 `content/decks.ts` 里给该 deck 写 `cover: "/covers/<slug>.<ext>"`
- 下载失败 / 附件为空 → 脚本 log warn 但继续同步其他字段;featured 卡片不渲染封面,退回纯文字 Sequoia 风格
- `public/covers/*` **进 git**,由 sync 脚本维护(不要手动加图进去,下次 sync 会冲突)

---

## 运营常用操作

### 1. 新增一条 deck

1. Base 里点"新增记录",把上表必填字段都填了
2. Embed URL 暂时没有?留空,`Status` 设 `draft`,页面上不会出现
3. 拿到 Google Drive URL 后,回来填 Embed URL,把 Status 改 `published`
4. 通知开发 / 自己跑 `npm run sync:decks`

### 2. 改 Reading Guide 文案

1. Base 里找到对应记录,改 Intro 字段
2. 通知开发同步
3. 同步后 5 分钟内线上生效(Vercel build ~90s)

### 3. 换首页 featured

1. 把当前 featured 的那条记录的 Featured 列取消勾选
2. 新的那条勾上
3. 同步 + 推送

**注意**:如果一次同步时发现 featured + published 有多条,sync 脚本会**报错拒绝**,不会污染线上。安全保护。

### 4. 下架一条 deck

- 把 Status 从 `published` 改 `draft`,或删记录
- 同步后那条消失
- **不建议删 Slug**,如果有外链指过来会 404。改 Status 更稳

---

## 开发 / 负责人操作

### 首次配置(做一次)

Sync 脚本直接借用本机 `lark-cli` 已登录的 **user 身份**(目前是 Siqi),不再走自建应用 + tenant token 那套。只需要告诉脚本"去拉哪张 Base 的哪张表"。

1. 确保 lark-cli 登录过并带 `base` 域:
   ```bash
   lark-cli auth login --domain base
   ```
   一次授权长期有效,token 会自动 refresh。
2. 项目本地:
   ```bash
   cp .env.local.example .env.local
   # 填 LARK_BASE_APP_TOKEN / LARK_BASE_TABLE_ID
   ```
3. 两个值从 Base URL 提取:
   ```
   https://<租户>.feishu.cn/base/<APP_TOKEN>?table=<TABLE_ID>&view=...
                                ^^^^^^^^^^^          ^^^^^^^^^^^
   ```

> ℹ️ 为什么不走 tenant token(bot 身份):`cli_*` 开头的 lark-cli 内建应用不能作为"文档应用"加进 Base 的协作人列表 —— 飞书文档应用只接受在开放平台正式创建并发布的业务应用。我们不需要这层抽象,sync 永远是本地手动跑,piggyback user 身份更简单。

### 每次运营改完后 —— 一键命令

```bash
cd ~/Documents/SIQI\ Work/SX/shixiang-website
npm run publish:decks
```

这一条命令顺序做 4 件事:
1. `sync:decks` 把 Base 数据拉下来,更新 `content/decks.ts` + `public/covers/`
2. 如果没变化,退出(不 commit 不 push)
3. 打印 diff summary 供肉眼过一眼
4. `git add` + `git commit` + `git push origin main`

Vercel 检测到 push,~90s 线上生效,URL:
https://shixiang-website-ten.vercel.app/reports

<details>
<summary>想分步执行/预览 diff 后再决定?</summary>

```bash
npm run sync:decks               # 只拉不提交
git diff content/decks.ts        # 看改了啥
git add content/decks.ts public/covers/
git commit -m "content: sync decks from Base"
git push
```

</details>

### 常见报错

| 报错 | 原因 | 处理 |
|---|---|---|
| `Missing env vars` | `.env.local` 没配 / 变量名拼错 | 对照 `.env.local.example` |
| `lark-cli ... failed ... auth ...` | lark-cli 没登录 / token 过期 | `lark-cli auth login --domain base` |
| `record-list failed ... permission` | 当前 lark-cli 登录用户不是 Base 协作人 | Base 把该用户加为"可阅读"以上 |
| `Duplicate slug: xxx` | Base 里两条记录 Slug 相同 | Base 里改一条 |
| `Multiple featured+published decks` | Base 里多条勾了 Featured+published | Base 里只留一条勾 Featured |
| `Deck 'xxx' missing required fields` | 某必填字段为空 | Base 里把该行补全 |

---

## 为什么选飞书 Base 而不是 Notion / Sanity

见 `decisions.md` 2026-04-23 CMS 决策节。简述:

- 运营已在飞书生态,零学习成本
- 拾象已有 lark-cli 工具链基础
- Draft / Published 状态可在 Base 里用视图管理
- build-time 解耦,Vercel 部署稳定性不受 API 波动影响
- 迁移路径简单(如果未来要切 Sanity,sync 脚本重写即可,`content/decks.ts` 的消费侧不变)
