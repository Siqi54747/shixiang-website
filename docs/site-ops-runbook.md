# 拾象官网 运营 Runbook

> **这份文档是什么**:shixiangcap.com 的**凭证、待办、应急联系人**总索引。
> 团队里任何人(开发/运营/IT)想接手或排查问题,先看这一份。
>
> **两个镜像,一份真源**:
> - **Source of truth**:本仓库 `docs/site-ops-runbook.md`(GitHub,版本可追溯)
> - **飞书镜像**(非 dev 团队看):https://www.feishu.cn/docx/WBbqdHarwoctilxbjqzcYm4WnXc
> - **同步方式**:改 GitHub → `tail -n +3 docs/site-ops-runbook.md > /tmp/body.md` → `lark-cli docs +update --doc WBbqdHarwoctilxbjqzcYm4WnXc --mode overwrite --markdown "$(cat /tmp/body.md)"`
>
> **不在这份**里的内容:
> - 品牌/内容策略 → 看 `prd.md`
> - 架构决策历史 → 看 `decisions.md`
> - 运营 Base CMS 怎么操作 → 看 `docs/operations-decks-base.md`
> - 细粒度的 P0/P1/P2 待办 → 看 `polish-todo.md`

---

## 📋 Progress Tracker

> 一眼看完当前进度。完成一项就把 `- [ ]` 改成 `- [x]`。
> 此 checkbox 语法在 GitHub 和飞书文档里都能渲染成可勾选的格子。

### Phase 1:上线主要工作

- [x] IT 改完阿里云 NS → `dig NS shixiangcap.com` 返回 Cloudflare NS
- [x] Cloudflare 进入 **Active** 状态
- [x] Vercel 绑定 `shixiangcap.com` + `www.shixiangcap.com`
- [x] git push 4 个 commit 触发首次正式部署
- [x] 新 deploy 确认上线(`/reports/agi-notes-2025-q2` 返回 200)
- [ ] Cloudflare → SSL/TLS → Overview 设成 **Full**
- [ ] Cloudflare → SSL/TLS → Edge Certificates → **Always Use HTTPS** 打开
- [ ] 浏览器无痕测 `https://shixiangcap.com`(不开 VPN)
- [ ] **浏览器开 VPN 测 `https://shixiangcap.com`(核心验收)**

### Phase 2:上线后本周内

- [ ] 补飞书邮箱 **DKIM** TXT 记录
- [ ] 补飞书邮箱 **DMARC** TXT 记录
- [ ] 加第二条 MX `m2.feishu.cn` priority 10(做 fallback)
- [ ] (可选)Cloudflare 配 `cf-ipcountry` cookie Transform Rule,让 geo 检测更准
- [ ] 浏览几次网站后 Vercel Analytics 看有数据进入
- [ ] 把 `shixiangcap.com` 更新到拾象对外物料(微信菜单 / 名片 / LP 材料 / email 签名 / 微博 bio)
- [ ] **迭代 PDF 托管方案**:实测飞书 `larksuite.com` 海外加载速度,若 OK 则考虑砍掉 Google Drive(见下方"PDF 托管方案对比")

### Phase 3:本月内治理改进(重要)

- [ ] 迁 GitHub repo 从个人账号到 `shixiang-tech`(或类似)org
- [ ] 迁 Cloudflare 账号到团队邮箱 `operations@shixiangcap.com`
- [ ] 迁 Vercel 账号到团队邮箱(升 Pro Team plan)
- [ ] 确认并记录 Google Drive PDF 托管 owner 账号
- [ ] 填完本文档末尾"关键的人"联系方式表

### Phase 4:持续运营

- [ ] 每次新 report 发布跑通 CMS workflow(见 `docs/operations-decks-base.md`)
- [ ] 每季度 review Cloudflare + Vercel analytics,关注异常流量 / 被误杀流量
- [ ] 监听域名到期日(阿里云控制台),提前续费

---

## 当前状态(2026-04-24)

| 维度 | 状态 |
|---|---|
| 代码仓库 | private,托管在 GitHub |
| 生产部署 | Vercel auto-deploy(push to `main` 触发) |
| 生产 URL(占位) | `https://shixiang-website-ten.vercel.app` |
| **目标生产 URL** | `https://shixiangcap.com` + `www.shixiangcap.com` |
| 域名注册商 | 阿里云万网 |
| DNS/CDN 层 | 正在从"阿里云 DNS 直连 Vercel"迁到"Cloudflare 代理 → Vercel" |
| CMS | 飞书多维表格(Lark Base)"Decks" 表 |
| 邮件 | 飞书邮箱,MX 指向 `m1.feishu.cn` |

**本次迁移的原因**:国内读者开 VPN 反而打不开 `*.vercel.app`,因为 Vercel 的 WAF 屏蔽了 VPN 出口 IP。接入 Cloudflare 后我们可以控制 WAF 规则,还能给国内用户走 CF 的 China Network。

---

## 剩余工作 checklist

### 🔴 今日(IT 改完阿里云 NS 之后,你做)

| # | 动作 | 工具 | 验收 |
|---|---|---|---|
| 1 | 验证 NS 生效 | 终端:`dig NS shixiangcap.com +short` | 返回 `coleman.ns.cloudflare.com` + `serenity.ns.cloudflare.com` |
| 2 | Cloudflare 完成 Active 验证 | Cloudflare dashboard → site → Overview | 显示 "Active" 绿标 |
| 3 | Vercel 绑域名 | Vercel → project → Settings → Domains → Add `shixiangcap.com` + `www.shixiangcap.com` | Vercel 显示"Valid Configuration" |
| 4 | Cloudflare SSL 模式 = Full | Cloudflare → SSL/TLS → Overview | 选 **Full**(非 Flexible,非 Off) |
| 5 | Cloudflare 强制 HTTPS | Cloudflare → SSL/TLS → Edge Certificates | "Always Use HTTPS" 打开 |
| 6 | 推送当前 commits | 终端:`git push origin main` | GitHub 上看到 4 个新 commit;Vercel 触发新 deploy |
| 7 | 双场景验证 | 浏览器(关 VPN + 开 VPN 各一次) | 两种场景都能打开 `https://shixiangcap.com` 和 `/reports` |

### 🟡 本周内(上线后补洞)

| # | 动作 | 紧迫度 | 怎么做 |
|---|---|---|---|
| 1 | 补齐飞书邮箱 DKIM + DMARC | 中 —— 不做邮件进垃圾概率高 | 飞书管理员后台 → 邮箱域名配置 → 会给具体 TXT 记录值,塞进 Cloudflare DNS |
| 2 | 加第二条 MX `m2.feishu.cn` priority 10 | 低 —— 主 MX 挂了才启用 | Cloudflare DNS → Add record → MX |
| 3 | (可选)CF Transform Rule 写 `cf-ipcountry` cookie | 低 —— 让网站 geo 检测更准 | CF → Rules → Transform Rules(代码已 fallback 到 navigator.language,不做也能工作) |
| 4 | Vercel Analytics 验证有数据进入 | 低 | 访问几次站点 → Vercel → Analytics 看有 PV |

### 🟢 上线后第一个月

| # | 动作 | 触发条件 |
|---|---|---|
| 1 | 跑一次完整的"新发 report"流程,验证 CMS + geo-aware embed 通畅 | 下次发 Q2 / monthly report |
| 2 | 若老 slug `founder-notes-ai-native-2025-q2` 被外部链接过,加 308 redirect | 发现有流量进来 |
| 3 | Review Cloudflare analytics —— 看有没有合法流量被 WAF 误杀 | 上线 2 周后 |
| 4 | 把 `shixiangcap.com` 更新到所有拾象对外物料(微信菜单、email 签名、名片、LP 材料、微博 bio 等) | 上线当天 |

---

## 访问凭证清单(**谁持有**比"存在哪"更重要)

| 资源 | 账号 / 位置 | 当前持有人 | 丢失后果 | 备注 |
|---|---|---|---|---|
| 域名 `shixiangcap.com` | 阿里云万网 | IT 持有阿里云账号 | 过期 / 被转出失控 | 注意续费提醒 |
| Cloudflare | Hannah54747@gmail.com | 你(Siqi)个人 Gmail | ⚠️ 见下方治理建议 | Free plan |
| Vercel | siqi54747's projects | 你(Siqi)个人 | ⚠️ 见下方治理建议 | Hobby plan,够用 |
| GitHub repo | `github.com/Siqi54747/shixiang-website`(个人账号下)| 你 + 开发 | 离职无人 push = 网站无法更新 | ⚠️ 和 CF/Vercel 同样问题,建议迁到 shixiang-tech org |
| 飞书自建应用 `Shixiang-website-publish` | 拾象飞书租户 → 开发者后台 | IT / 你 | app_secret 泄漏需轮换(会有短暂同步失败)| 用于 CMS 同步 |
| `.env.local`(LARK_APP_ID + APP_SECRET + BASE_APP_TOKEN + TABLE_ID) | 你本地电脑 + 本地备份 | 你 | 丢了从飞书后台重新拿,10 分钟恢复 | **不要进 git**,已在 .gitignore |
| Vercel env vars(同上 4 个 LARK_*)| Vercel project Settings → Env Vars | 你 | 和 .env.local 保持一致即可 | 如果 sync 脚本迁到 Vercel cron 才需要 |
| Google Drive —— 海外 PDF 托管 | **待确认**:哪个 Google 账号? | 待确认 | 账号停用 = 海外读者白屏 | **优先级高,请尽快确认并记录在此** |
| 飞书云空间 —— 国内 PDF 托管 | 拾象飞书租户 | 运营共享文件夹 | 权限变化 = 国内读者白屏 | 每次新 PDF 上传必须设"任何人可查看" |
| Vercel dashboard deploy hook(如有) | Vercel → project → Git → Deploy Hooks | 未配置 | 未配置无影响 | 后续想加 webhook 触发时再用 |

### 治理改进建议(强烈)

**问题**:Cloudflare、Vercel、**GitHub** 三个账号都挂在你的**个人身份**(个人 Gmail + 个人 GitHub)下,生产资产绑在个人身份上。VC/Fund 级别的机构,这有以下风险:

- Gmail 被封 / 你离职 = 没人能登录 Cloudflare / Vercel / GitHub = 网站失去维护权
- Cloudflare 的计费邮箱是你个人 → 升级付费版后付款方式混乱
- 同事 onboard 时没法 "share access" 只能共享你个人密码
- GitHub repo 在个人名下,拾象 org 的开发规范(分支保护、PR review、CI 权限)无法统一治理

**建议(本月内做)**:

1. 注册团队账号 `operations@shixiangcap.com` 或 `tech@shixiangcap.com`(用飞书邮箱即可)
2. **GitHub**:创建拾象 org(如 `shixiang-tech`)→ 从你个人账号 **Transfer** repo → Vercel 自动跟随(或重连 GitHub source)
3. **Cloudflare**:Members 界面邀请新账号为 Super Administrator → 等新账号接受邀请 → 移除旧个人账号
4. **Vercel**:Team 升级(Vercel Pro $20/月)→ 邀请新账号 → 转移 project 所有权
5. 记录更新到这份 runbook 的凭证清单

**估时**:2-3 小时(主要是等邀请接受 + 等验证邮件)。**重要性**:高。**紧迫性**:中(网站上线后再做也不晚,但不要超过一个月)。

---

## PDF 托管方案对比(待迭代,Phase 2)

> 现状是 Drive(海外 canonical)+ 飞书(国内 fallback)双轨。双轨意味着每份 report 运营要传两份、维护两个链接。如果能统一到单一托管方,CMS 和运营体验都会显著简化。下表是候选方案的对比,**任何切换前必须先挑 1 份 deck 实测(开 VPN + 不开 VPN)再决定**。

| 方案 | 海外访问 | 国内(不开 VPN)| 国内(开 VPN)| 登录墙 | iframe 体验 | 账号治理 |
|---|---|---|---|---|---|---|
| **Google Drive(现状)** | ✅ 快 | ❌ 被墙 | ⚠️ 部分 VPN 出口被 Drive 限流 | 无 | 干净,`/preview` 专为嵌入设计 | ⚠️ owner 账号待确认 |
| **飞书 `larksuite.com`** | 🟡 待实测(理论上海外节点 OK) | ❌ 海外域名国内慢 | ✅ | 匿名可访问(需设"互联网获得链接的人可查看") | 较干净,有飞书顶栏 | ✅ 已在拾象飞书租户内 |
| **飞书 `feishu.cn`** | ❌ 海外路由到国内节点,慢/超时 | ✅ 快 | ✅ | 同上 | 同上 | ✅ |
| **腾讯文档 `docs.qq.com`** | 🟡 未被墙但 CDN 在国内,海外慢 | ✅ 快 | ✅ | ⚠️ **经常弹微信/QQ 登录墙**,海外读者基本被卡住 | 参差 | 需新建账号 |

**优先级**:飞书 larksuite.com 实测 > 继续维持 Drive 双轨 > 腾讯文档。

**实测最小步骤**(任一方案都适用):
1. 挑一份已发布的 deck,在飞书/腾讯文档上传一份,设为公开可查看
2. 拿到嵌入 URL,在本地 dev 环境把 `content/decks.ts` 里这份的 URL 换掉
3. 打开 `/reports/<slug>`,**关 VPN 测一次,开 VPN 测一次**,记录加载时间和是否有登录墙
4. 若海外体验 ≥ Drive 现状,可以把这个方案推广,砍掉 Drive(Phase 3 "确认 Drive owner" 待办也一并消除)

---

## 关键文档索引

| 文档 | 面向对象 | 核心内容 |
|---|---|---|
| `docs/site-ops-runbook.md`(本文) | **全员** | 凭证、待办、应急联系人 |
| `docs/operations-decks-base.md` | 运营 | Reports CMS 在飞书 Base 怎么操作,字段怎么填,每次怎么同步上线 |
| `docs/handoff-content-cms-2026-04-21.md` | 开发(历史)| 2026-04-21 那次 CMS 从 TS 源迁到 Base 的 handoff 记录 |
| `prd.md` | 全员 | 产品愿景、内容策略、栏目设计 |
| `decisions.md` | 开发 | 架构选择与权衡历史(为什么用 Next.js + Vercel、为什么不走 Vercel build-time sync 等)|
| `polish-todo.md` | 开发 + 你 | 细粒度 P0/P1/P2 待办清单,上线前后都在这儿勾 |
| `brand-tokens.md` | 设计 + 开发 | 品牌色、字体、间距等 design token |
| `progress.md` | 全员(历史)| 开发进度时间线 |

### 飞书 Wiki 镜像(待建)

以下章节建议也在**飞书 Wiki** 里建一份(方便 IT / 运营搜索):

- "凭证清单"
- "应急联系人映射"
- "剩余工作 checklist" 的 🔴 今日部分

其他内容留在 GitHub markdown 即可。

---

## 应急联系人映射

| 出问题的症状 | 先查什么 | 找谁 |
|---|---|---|
| 网站整站打不开 | `curl -I https://shixiangcap.com` 看 HTTP 状态 | 5xx → 开发 / Vercel;timeout → 你 / IT(看 Cloudflare 和 DNS)|
| 国内打不开,海外正常 | Cloudflare Dashboard → Security → Events 看是否 WAF 挡流量 | 你(CF WAF 调整)|
| 证书错误 | 浏览器弹的提示;Cloudflare SSL/TLS 是否为 Full | 你 |
| 某份 report iframe 白屏 | 浏览器 devtools Network 看 iframe 请求返回 | 403 → 分享权限没设公开,找运营重设;超时 → 托管方(Drive/飞书)故障 |
| 发邮件被退信 / 进垃圾 | mxtoolbox.com 查 SPF/DKIM/DMARC | 你 + IT |
| 收不到邮件 | 飞书邮箱后台查日志,MX 记录是否被改动 | IT |
| CMS 同步脚本报错 | 看 `npm run sync:decks` 完整报错 | 开发(脚本在 `scripts/sync-decks-from-base.ts`)|
| Base 运营填错了字段 | 看 `docs/operations-decks-base.md` 校验规则 | 运营 + 开发 |
| 域名快到期 / 续费 | 阿里云域名列表看到期日期 | IT |
| GitHub / Vercel 账号被锁 | 看 24h 内是否有异常登录提醒 | 你 |

### 关键的人(姓名 + 角色 + 联系方式,待填)

| 角色 | 人 | 飞书 ID | 电话(紧急)|
|---|---|---|---|
| 域名 / IT 管理员 | _待填_ | _待填_ | _待填_ |
| 主开发 | _待填_ | _待填_ | _待填_ |
| 内容运营 | _待填_ | _待填_ | _待填_ |
| 品牌 / 设计 | _待填_ | _待填_ | _待填_ |

> ⚠️ **这张表请尽快填完**。凌晨 3 点网站挂了想找人,这张表决定你是 5 分钟恢复还是 5 小时恢复。
