---
title: How To Play AI Beta：拾象 2026 AGI 投资思考开源
publish_date: '2026-02-02'
publish_timestamp: 1769994000
mp_name: 海外独角兽
url: https://mp.weixin.qq.com/s/cLyenxqPX71L0zTSy2uYGQ
msgid: 1000000485
appmsgid: 2247520864
itemidx: 1
digest: 哪些是结构性机会，哪些只是阶段性的噪音
cover: https://mmbiz.qpic.cn/sz_mmbiz_jpg/3tHNibnJ2jgzS64WwoFhiaJicqS2ZTIJGECSKiaw9QbblDSSsSUUbM5HWg85W4LV5BjhKmb3LhcCBe7dX1PXg5tsoA/0?wx_fmt=jpeg
image_count: 40
archived_at: '2026-04-20T05:07:03+08:00'
---

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/001.png)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247519866&idx=1&sn=179a2ec7519d8f7a1bc41958a847e7e9&scene=21#wechat_redirect)

作者：Guangmi，Penny，Cage，Haina，Feihong，Siqi，Nathan

**AI 领域的变化速率和格局演化永远比市场想象中更加迅速，几乎每个月市场共识和叙事都在翻转。**

**本篇报告是拾象团队围绕这些变化做的一次系统复盘，用来重新校准对当下 AI 竞争时局的判断，也对 2026 年可能成为主线的一些核心技术和产品趋势进行了拆解。**

**我们将这份报告开源出来，希望和大家共同探讨**：哪些是结构性机会，哪些只是阶段性的噪音：****

**1. Google 重回叙事顶峰，但 AI 不是零和博弈，**[OpenAI](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520859&idx=1&sn=3306bd85aeba655abd653dd59d15dce2&scene=21#wechat_redirect)和 Anthropic 的“赢面”仍很大；****

**2. Continual learning 已经成为几乎所有 AI labs 押注的新范式共识，2026 年会看到新的信号；**

**3. AGI 竞赛很像自动驾驶，从 L3 到全面实现 L4 难度极大，但在知识类工作这些垂直领域，局部 L3/L4 已经实现了可观的效率提升和经济价值；**

**4. “NVIDIA + OpenAI” 这条主线在短期内可能被市场低估，****今天继续 bet OpenAI 是在下注 AI 时代的 “something never seen”；******

**5. 一个理想的 AGI Basket：Google，Nvidia，OpenAI，Anthropic，ByteDance 和 TSMC；**

**6. 模型即产品，数据即模型，阶跃式的产品体验提升往往还是来自于底层的模型换代，模型能力提升背后仍是数据 bet；**

**……**

**以下是报告详细内容和解读，完整报告可点击链接查看，推荐和我们的 [2026 关键预测](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520443&idx=1&sn=e025ef2b59fd69c56e294d5f163beda6&scene=21#wechat_redirect) 共同阅读。**

友情提示：本文仅作为研究思考分享，不构成任何投资建议。

**01.**

**Where are we now ？**

**判断 1：AI Labs 竞争常态：“交替领先”+“分化”**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/002.png)

全球 AI 模型的头部格局已基本确定：OpenAI、Anthropic（Claude）和 Google（Gemini）构成第一梯队。

模型能力上个位数百分点的领先，在商业回报上往往会被放大为数倍差距，技术领先与品牌效应叠加所形成的高溢价让这三个 AI labs 不仅吸纳了大量了头部人才，也分走了今天 LLM 领域中绝大部分价值。这一现象类似职业体育：梅西、 C 罗等顶尖球星可能能力上并没有比其他优秀球员强几十倍，但他们的商业价值和收入却高出几十倍。

在整个 Tier 1 阵营里，AI labs 之间呈现出“交替领先”和“分化”的状态。

**趋势 1：技术路线分化**

在通用能力彼此胶着的背景下，不同 AI labs 都做出了明确的战略选择，在模型能力的具体优化重心上也出现了分化：

**•**OpenAI  坚定 bet to C：ChatGPT 在 To C 依然保持着断档式的领先优势，目前 DAU 接近 4.8-5 亿，大约是 Gemini（约 9000 万 DAU）的 5.6 倍（备注：数据截止至 2025 年 12 月）。尽管 Google 的 Gemini 在生态上更具优势，但 ChatGPT 一直在围绕 to C 场景做专门优化，体验依然更胜一筹，从团队做广告、电商的投入来看，ChatGPT 是在朝着“下一个 Google”发展。

**•**Anthropic 毫无疑问专注于 To B、Coding/Agent 等专业领域，放弃了通用的 To C 市场。Claude Opus 4.5 在软件开发和 Agent 领域依然是 SOTA，在处理长任务时更可靠、效果更好且更节省 Token。我们认为 Opus 4.5 可能是一个被低估的模型。如果没有这种专注 Coding 的战略 Bet，Anthropic 很难在巨头的激烈竞争中生存下来。

**•**Google 在战略优先级上把多模态放在首位，Gemini 3 的多模态理解能力也处于断档式领先地位，但在 Text 和 Coding（包括 Agent）能力上，目前更多是追平 OpenAI 和 Anthropic 之前的水平；

是否理解模型特性及其未来半年的演进方向，直接决定了接下来对 Agent 公司的投资逻辑：是选择“聚美优品”还是“拼多多”：

**•** “聚美优品”： 即 vertical agents，这些产品往往把某个场景服务得很好，也因此能快速实现盈利能力，但面临的风险也很现实，“通用平台，即 AI labs 会不会做”？

**•** “拼多多”：能够在通用平台之上构建出了独特价值层，具备更强的长期战略价值。

**趋势 2：两大算力阵营**

因为 Google 的快速追赶，算力角度看，行业也正在形成两大对垒阵营：GPU vs TPU。这两大阵营也会是是未来贯穿一二级科技投资的主线。

Google 凭借“模型+ TPU +云+产品”构建了端到端、自成一体的生态，类似 LLM 时代的 Apple，而 NVIDIA 更像是 LLM 时代的 Android，支撑起了一个庞大的生态联盟。在 NVIDIA 生态下，OpenAI 和 Anthropic 依然是“优等生”，在人才密度上略优于 Google。

从当前阶段看，GPU 在综合性能上仍优于 TPU，但 GPU 受制于台积电产能，且成本昂贵；而 Google 通过 TPU 展现出更强的成本控制潜力。与此同时，“NVIDIA + OpenAI” 这条主线在短期内可能被市场低估，尤其是在 OpenAI 新模型持续发布的背景下。

**判断 2：Google + OpenAI = $10T**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/003.png)

因为 OpenAI bet to C 的策略使得它和 Google 更像是“头对头”竞争，也因此，过去一个季度，Google Gemini 3 效果超预期之后，市场对 OpenAI 的态度立即很 bearish，但今天的 AI 并不是“零和博弈”，Google 的崛起并不意味着 NVIDIA 和 OpenAI 的衰落：Google 与 OpenAI 的关系，更像是短视频时代的抖音兴起时，给长视频时代的优酷所带来的整体增量，两者是共同把盘子做大。

长期来看，Google 和 OpenAI 将是一个比较好的组合，在 C 端市场可能会形成平分天下的局面，Google 短期内因 PE 扩张显得估值偏高，而 OpenAI 则处于被低估的状态。

但长期来看 Google 与 NVIDIA 是最快接近 10 万亿美元市值的公司，Google 市值从当下增长至 10 万亿的难度，或许小于过去从百亿到千亿、千亿到万亿的跨越。而 OpenAI 的最新估值已经接近万亿美金水平。

**判断 3：2026 年会看到下一个范式信号**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/004.png)

Continual Learning 作为下一个极其重要的技术范式，这个方式在过去半年中在 OpenAI、SSI 、Thinking Machines Lab 等头部 AI labs 、AI researchers 中逐渐扩散，并最终形成共识，对 Continual Learning 的探索也才刚刚开始。

拾象注：Continual Learning 在一些语境下也被称为[Online Learning](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518581&idx=1&sn=19aa9f21427f7a9d9b20ca0bf480ac0a&scene=21#wechat_redirect)，本质上是强调模型自主学习的能力。

我们有一个比较激进的判断：从范式级别，今天大家热议的机器人、世界模型、多模态，很多可能是“假问题”，而 Continual Learning 才是“真问题”。

从范式角度，Pre-training 面临的边际效应递减、投入巨大以及数据枯竭等严峻挑战已经是不争事实，例如 Gemini 3 使用的 50T 数据量已接近极限，模型的激活参数并没有无限变大，反而变小了。

其次，今天的 LLM 本质上是“冻结的智能”，它们在推理时表现出色，但无法从每天的交互中实时吸取教训。未来的模型应该从“静态”转向“鲜活”，在推理和交互的同时进行学习，只需更少的数据就能学得更快，实现真正的数据飞轮。这就是 Continual Learning 要做的事情，之所以说它是范式级的探索，也是因为一旦模型具备这样的能力，智能进阶的速率又会到达一个全新的量级。

如果 Continual Learning 这个问题不解决，做机器人就会像上一代做 NLP 或自动驾驶一样，需要一点点去采集数据，要走 10 年的弯路。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/005.png)

**Continual Learning 是让 AI 具备“超级学习力”**

这一新范式的目标是从“存储知识”转向“样本效率”（Sample Efficiency）。Ilya 曾提出“超级实习生”的概念，认为真正的超级智能应像高智商实习生一样，具备极强的学习能力，看几个案例或写几行代码就能迅速掌握业务，而非仅仅依赖百科全书式的知识存储。

但这一新范式的成熟还需要基础设施的支持如更长的 Context、LoRA 以及推理时的多模型并行采样等，以及 Continual Learning 是长上下文、模型遗忘机制及数据分布漂移等 5-10 个学术难题的集合，因此难以在短期内迅速突破，但学界和业界普遍乐观预计在 2026 年能看到明确信号，并希望能在未来 1-3 年内逐步解决这些子问题。

目前，早期信号已现端倪：

**•** Google Research 发布的 Nested Learning 通过引入动态记忆机制，展示了初步的 In-weights Learning 能力。

**•** Cursor 是目前 Online RL 的典型雏形，它虽然距离真正的 Continual Learning 尚远，但通过捕捉用户对代码的接受或拒绝行为，能够在极短周期（如小时级）内更新模型。这代表了一种趋势：模型和产品的学习曲线将变得越来越平滑，从“静态冻结”转向“越用越聪明”，用户的每一次交互不仅是使用，更是对模型的训练。

在这一领域，OpenAI 依然遥遥领先且投入最大，其次是 SSI 和 Thinking Machines Lab。从团队渊源来看，Anthropic 是 OpenAI 最早的 Scaling team，Ilya 的 SSI 代表了 Pre-training team，而 Thinking Machines Lab 则是原班 ChatGPT 和 Post-training team，这些顶尖团队都在布局下一盘大棋。

**判断 4：AGI 竞赛是“马拉松 + 自动驾驶”，是持久战和现金流之战**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/006.png)

今天的模型本质上仍是巨大的压缩器，缺失数据类型的任务无法完成，因此需要大量冷启动数据。尽管模型的知识储备远超大多数人类，但 Agent 尚未接触真实工作场景。为了实现强化学习的泛化，需要收集顶尖专家在实际环境中的操作数据，例如打印店操作、SaaS 使用流程、银行系统交互或皮肤科诊疗记录等。

这种情况很像自动驾驶：Agent 需要处理大量长尾数据，这中间要经过很长的时间。不过，虽然全面达到 L4 级别困难，但在知识工作者的垂直领域，局部 L3/L4 已实现可观效率提升，带来百亿美元 ARR 级别的价值。

所以如果回到资本和现金流的竞争：

**•** Google 、字节这样的优势就相当明显，是强共识性的 AI winner：既拥有现金流机器，人才和技术积累密度也足够高；

**•** Meta 虽然也有自己的资本优势，且投入巨大，但考虑到团队变动以及历史的积累，结果充满不确定性；

**•** OpenAI 和 Anthropic 这样的头部 labs 在资本充裕的一级市场环境中，也可以凭借强大的融资能力实现持续的资金净流入。

**判断 5：AI 必须回答商业模式和效率质疑**

整个市场对于 AI Bubble 的担忧都来自于 Sam Altman 提出了 1.4 万亿美元的 Financial Obligation，客观来说，我们可以从算力投入角度合理化这笔巨资，但从商业模式视角下很难去理解清要如何收回成本更加重要。

深入分析 OpenAI 的合约条款会发现，**这 1.4 万亿中有很大一部分（特别是 2028 年以后的部分）包含了创新性的“有条件解锁”条款。**这意味着它不同于传统软件行业的 RPO（剩余履约义务），这部分承诺相对更容易撤销或展期。据估算，容易撤销或展期的部分可能占到 1.4 万亿美元的 2/3。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/007.png)

在目前 OpenAI 清晰可见的商业模式下，即使将预期拉满，未来的收入规模也仅在 2000-3000 亿美元之间，这仅仅能勉强抵消巨额的资本开支折旧，远远没法覆盖投入的资金成本。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/008.png)

**•** ToC 市场：在订阅制上，假设拥有 40 亿周活用户且订阅率达到 10%，年收入约为 800 亿美元。这要求付费用户规模达到 4 亿，相当于 Office Commercial 的体量，甚至远超 Sam Altman 预测的 2030 年 2.2 亿付费用户数。而在电商与广告领域，AI 将陷入存量博弈，如果达到 Amazon 或 TikTok 的变现水平，收入约 400 亿美元；如果达到 Google 或 Meta 的水平，则可达 1000 亿美元。

**•** ToB 市场：即便假设 5000 亿美元的 SaaS 应用市场全部被 AI 重构，且 OpenAI 能从中收取 20% 的“过路费”，其收入上限也仅为 1000 亿美元。

而且，如果 AI 仅仅是创造了另一个争夺存量广告和电商生意的互联网平台，则今天所有全球资源集中涌入这个领域的意义会非常有限。

OpenAI 真正的想象力收入在于那些目前尚“看不清”的 Net New TAM，今天我们能看到相对有确定性的是 AI 作为新劳动力的价值释放，甚至创造增量 GDP：

**•** 如果 Agent 能创造 20% 程序员的价值，对应的是 3000 亿美元的 IT 服务市场增量；

**•**如果能创造 20% 白领的价值，这一数字将提高到 3.5 万亿美元。

但要做到这一点仍需要解决模型可靠性和端到端能力，依赖 Continual Learning 的本质突破，这也是 long-horizon agents 成为一个重要命题的原因。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/009.png)

而更远期的还包括 AI 时代的消费电子新设备、以 AI 为中心的云架构以及 Sora 带来的新娱乐形式等等，概括来说，Sam Altman 此时的巨额投入，实际上是在为 Something never seen 提前下注。

目前我们更倾向于将 AI 投资视为一种“国防”开支，即巨头们为了避免被颠覆，即便超越商业回报考量也会投光最后一分钱。NVIDIA、微软和 AWS 会继续支持 OpenAI 和 Anthropic，以维持制衡，避免 Google 或 OpenAI 一家独大。

**判断 6：AGI 投资：只 bet 技术成长最陡峭的地方**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/010.png)

AGI 投资的核心策略是，只 Bet 技术成长最陡峭的地方。具体拆解下来有三条主线：

1. 投资全球最领先的模型公司：只有参与最大的综合平台投了，才能吃到最大的 beta，长期的复利才是最大的。

2. 投资最领先模型所需要的算力和硅基 Infra；

3. 投资最领先模型技术溢出的红利；

考虑到技术变化极快且各家交替领先，很难准确预判某一家是最终的 Winner，因此最好的策略是构建一个 AGI Index，一个理想的 AGI Basket 配置是：OpenAI 、ByteDance 、 Google、Anthropic 、 Nvidia，以及 TSMC。

**02.**

**重要趋势**

**趋势 1：模型即产品，数据及模型**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/011.png)

**模型即产品**

“模型即产品”的逻辑在于，尽管 Context Engineering 和 Fine-tuning 非常重要，但阶跃式的产品体验提升往往还是来自于底层的模型换代。过去三个月的产品发布再次证明了这一点：

**•** Sora 和 Veo 生成结果的人物动作的一致性以及音画同步生成的能力，本质上都源于模型的进步，Veo 内部甚至已经跑通了视频训练的 RL Pipeline；

**•** Nano Banana Pro 生成“图文解读”类内容的结果很惊艳，背后也是多模态与 LLM 融合后带来的智能升级；

**•** Coding 领域，Gemini 3 的前端生成效果优于 Claude Code，但在后端逻辑上不如 Claude Code 和 Codex，这种产品体验的差异化说明了模型训练本身的差异化才是关键。

我们在前面的重要判断部分提到，目前目前模型的分化非常明显，而这种分化其实也完全取决于公司的战略选择。头部 Labs 在技术上并没有代际差异，模型擅长什么方向，完全取决于公司决定服务谁，以及在哪个方向投入研究资源和数据。

**数据即模型**

“数据即模型”的底层逻辑是：今天的模型进步非常依赖于对人类“未留痕数据”的线性蒸馏。Pre-training 已经用完了网络、教科书、代码库等人类留痕数据，post training 也用了大量人类偏好数据，现在的 RL 开始蒸馏那些过去不存在、现在需要规模化收集的新型数据。不同的数据类型可以用不同的能源来做一个形象的比喻：

**•** Pre-training 数据就像石油，量大但主要油田已经快被抽干了；

**•** RL 专家数据就像新能源，有用但产量有限、成本高且速度慢；

**•** Continual Learning 就像核聚变，目前还没真正突破，但一旦突破就是无敌的，模型将能在环境中自己标注数据、实现自我提升。

目前，湾区涌现了二三十家创业公司帮助模型公司搭建 RL 环境，或通过录屏记录专家操作复杂软件的 Trajectory。 Mercor、Surge AI 和 Handshake 等数据平台收入增长都非常惊人。

**趋势 2：2026 年是多模态大年，机器人是多模态和 World Model 最重要的 Interface**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/012.png)

多模态技术路径正在加速向“Omni-in，Omni-out”收敛，无论 Google 还是 OpenAI，技术路径已逐渐一致：Auto-regressive 与 Diffusion Transformer 正逐渐融合，视觉、音频和文本被统一 Token 化并纳入同一个自回归序列建模。这意味着模型开始具备了跨模态的“通感”能力。

例如，Gemini 3 和 Nano Banana Pro 已展示了极强的从“文字+图片”输入到“文字+图片”输出的能力，能将破碎的收据照片拼合完整并直接输出表格。

这一趋势最直接的受益者是 Robot Learning 和多模态Agent：机器人可利用合成数据训练解决现实数据不足的问题；Agent 则能通过 Computer Use 操作屏幕，接管人类在虚拟世界的工作流。

**世界模型**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/013.png)

世界模型是对时间和空间具有深度理解的模型，它不只是生成视频，更能根据当前状态和动作，模拟并预测未来的世界演化。目前领域里分为两大技术流派：

**•** “实时交互派（Real-time Interactive）”：关注低延迟与可玩性，目标是取代 Unity、Unreal 引擎，从传统的“3D 渲染”转向“神经推理”；

**•** “物理仿真派（Physics & Spatial）”：更关注物理准确性与 3D 一致性，即使牺牲画质，也必须严格符合重力、碰撞等物理规律。它们的目标不是生成给人看的内容，而是成为 AI（特别是机器人和自动驾驶 Agent）的“训练场”，解决 Sim-to-Real 的问题。

**Robotics**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/014.png)

我们对机器人发展的判断是：整个领域“GPT 时刻”可能还有 3-5 年的距离。与 LLM“先统一再分化”的路径不同，机器人领域“Day 1 就是分化”的。

因为机器人缺乏统一的 Pre-training 基础（如 LLM 的网络文本），也没有统一的硬件标准，加上多模态底层的进步和人才涌入，使得每个团队都能有自己的 Bet。目前机器人正处于第一个“百花齐放”的阶段，未来一两年部分技术路线可能会收敛，但在场景和方向上依然会保持分化。

但在 2025 年 Q4，湾区的 AI Robotics 公司迎来了一个集中爆发式的发布期。其中 Google DeepMind 和被称为“DeepMind 四小龙”的 Physical Intelligence、Generalist、Dyna、Sunday 尤为引人注目。这些公司的创始团队大多与 Google DeepMind 一脉相承，因此在研究理念上有不少相似之处：

**•** 都不走 Simulation（仿真）路线，而是强调真实世界数据；

**•** 都没有一开始就做 Humanoid，而是着重解决上半身、双臂和灵巧手的 Manipulation（精细操作）；

**•** 更偏重于 AI Learning，致力于打造一个相对泛化的机器人大脑。

通过 RL 和真实数据，这些公司发布了能长时间执行精细任务的模型，如叠衣服、冲咖啡、拉拉链、收拾碗筷等，并开始展现出一定的泛化性，甚至在 Google Robotics 的研究中出现了跨硬件迁移的迹象。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/015.png)

从这些公司发布的模型中可以得出的核心 Takeaway 是：数据仍然是最重要的 Bet，各家公司拿出了截然不同的 Data Recipe。

**•** Generalist：利用改造后的 Umi 设备收集了 27 万小时真实机器人交互数据，并声称发现了 Scaling Law。

**•** Sunday：创新性地采用了“手套+众包”的模式，完全不依赖遥操作，而是通过向美国家庭分发专利设计的手套，收集人类的动作数据再通过算法转化为机器人数据，目前已收集了 1000 万条数据；

**•** Physical Intelligence：Pi 建立了一套在不同 Airbnb 真实房屋环境中持续收集数据的 Pipeline，并且包含人工纠偏的数据。

而且，值得一提的是，RL 在机器人领域的作用比在 LLM 中更为显著。Pi 发布的 RECAP 策略就是一个典型案例，它特别强调 RL 能让机器人在叠衣服、冲咖啡等 Long-horizon 任务中表现得非常 Robust。通过 Value Function 和 Credit Assignment，机器人像下围棋一样，能知道每一步操作是有助于成功还是导致失败，从而同时从成功和失败的轨迹中学习。这大幅提高了 RL 数据的利用效率，使得机器人能够实现连续 10 小时稳定执行任务。

机器人商业化落地的重要性在日益凸显。受限于湾区极高的人力成本，Dyna 已开始积极探索 B2B 场景，为商家提供叠衣服、叠餐巾等具体服务，其核心策略在于扎实做好 Post-training，以显著提高落地的稳定性。

与此同时，硬件的重要性正被重新评估，甚至有研究员认为硬件可能占据了成功要素的 60-70%。

**趋势 3：Proactive Agent 是模型公司主赛场**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/016.png)

目前的模型进步主要体现在“横向”蒸馏人类知识，通过 Post-training 和 RL 拓展领域知识；而“纵向”的突破则是向 Proactive Agent 进化，从被动等待用户 Prompt 的 Chatbot，转向能主动提供服务的 Agent。这种形态要求模型具备三大核心能力：

**•** 意图识别：Agent 必须精准判断在什么情况下需要 Take Action；

**•** Always-on：它需要始终在线，深入用户的 Context，获取 Slack、邮箱、日历文档等更多入口权限；

**•**长期记忆：Agent 不能做完本周的任务下周就忘了，它必须记住用户的长期目标和偏好，在合适的时间主动行动。

为什么 Proactive Agent 如此重要？

**•** 它与下一个技术范式 Continual Learning 紧密相连，模型要想做到主动，必须具备在交互中实时学习的能力，判断什么对用户是重要的。

**•** 它能构建更高维度的护城河。目前的 Chatbot 竞争更多是比拼规模效应和品牌，用户迁移成本极低，但 Proactive Agent 能在用户环境中学习，实现真正的个性化，先发优势将非常明显。

其实 OpenAI 的 Mark Chen 对未来 ChatGPT 的构想也是  Proactive Agent：现在的模型每次提问都要从头推理，不会变聪明；而未来的 Agent 记忆将大幅升级，能从对话中学到关于用户的“深层结构”，理解你真正关心的问题。当你下次提问时，它已经在后台帮你反思、联想并预备好了答案，这种体验可能还需要新的硬件和交互方式来承载。

除了有 OpenAI 通过 Pulse 做类似尝试，Thinking Machine Labs 的技术博客也发布了许多关于 Continual Learning 的进展，特别是强调利用 LoRA 技术来实现个性化。如果能通过 LoRA 把用户的 Memory 高效存储起来，这将是一种实现个性化 Proactive Agent 的可行技术路径。

**趋势 4：Neo AI Labs 会成为 OpenAI 的挑战者吗？**

尽管头部模型公司的梯队格局已定，但在湾区，由 OpenAI 和 DeepMind Mafia 驱动的 Neo AI Labs 正在涌现。这些新实验室的机会点在于探索巨头尚未覆盖的领域，或是押注全新的技术路线与开源生态。在这一波浪潮中，涌现了如图所示的几家极具代表性的公司：

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/017.png)

**趋势 5：Voice Agent 成为新一代 OS 的入口**

过去 12 个月，Voice Agent 经历了飞速发展，从技术验证跨越到了运营规模化部署的阶段。2025 年底很可能是整个 Voice Agent 市场的结构性拐点。

Model 层最显著的变化是行业正在从传统的“STT（语音转文字）→LLM→TTS（文字转语音）”三段式架构，转向 Real-time Speech-to-Speech（STS）的端到端解决方案。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/018.png)

这种新架构的最大价值在于大幅减少了反应时间，情绪表达更像人类，打断对话也更加自然。虽然目前企业因可控性和定制化问题接受度还较低，但预计明年会有明显的 Adopt。此外，延迟优化如今只是入场券，企业真正愿意买单的是全局稳定性。例如，尽管 Cartesia 在延迟上做到了极致，但 ElevenLabs 在企业环境中的表现更稳定，因此更受企业青睐。

我们的一手调研显示，今天 TTS 模型架构差异已微乎其微，真正的壁垒在于底层数据的质量与处理能力，例如医疗场景从一开始就要求 100% 的术语发音准确率。11Labs 早期建立的数据规模与质量优势，已构建起其他初创公司难以企及的护城河。

此外，11Labs 已超越单一模态，凭借强大的品牌吸附力（如成为 Netflix 等首选）、与 GCP 的深度绑定以及团队极强的执行力，具备了类似操作系统层级的防御性。

在这个逻辑下，我们 Voice Agents 类公司更偏 Vertical 逻辑，即“垂直领域优于水平通用平台”的判断，纯通用语音平台不可避免会陷入激烈的价格战，真正可持续的护城河，来自于对行业数据闭环与核心工作流的掌控。无论是物流调度、诊所前台，还是保险核保，最终的赢家都必须能够深度嵌入业务系统（如 TMS / EHR / CRM）。当行业数据与工作流权限形成绑定，其黏性足以有效对冲模型层持续商品化所带来的竞争压力。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/019.png)

在 infra 层，Voice Agent Infra 的本质不再是卖通话分钟数，而是将整条电话线托管成一套 Voice OS。Infra 层的核心价值在于抽象层（如语音路由、打断策略、Failover 等），让企业像接电话公司一样直接接入 Voice Agent，而无需自己拼凑底层模型。

在这个领域，Retell 和 Vapi 是目前使用最多的 Startup。其中，Vapi 搭建更快、场景更多；而由华人工程师团队创立的 Retell 则以 Engineering Work 扎实著称，更稳、延迟更低，ARR 已接近 $40M。此外，还有 OpenAI 使用的 LiveKit 这类开源框架，以及 Cresta 采用的 Pipecat，它们提供了更高的可定制性。

**趋势 6：LLM 推理价格快速通缩**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/020.png)

此外，目前 LLM 的推理价格正在经历快速通缩，如果用 MMLU 作为一个统一的质量指标来衡量，推理价格的下降速度达到了每年 10 倍。自 GPT-3 发布以来，短短三年内，同等能力的模型推理成本已经下降了约 1000 倍。

这种通缩在高端能力上表现得更为激进，对于达到 GPT-4 水平或解决 PhD 级别科学问题（GPQA）的高难度能力，成本下降的速度在最近一年甚至是在加快的，降幅达到了约 40 倍/年。

然而，许多开发者和创业者的实际体感却是“并不便宜”，原因在于 Agent 和多模态的应用让请求本身的复杂度发生了质变：现在的交互不再是简单的“一问一答”，而是演变成了一个包含多轮思考（Reasoning / Thinking 模式）、多次工具调用以及中间状态总结的复杂 Workflow。这意味着，原本只需要 1 次 API 调用就能完成的任务，现在可能需要内部进行 5-10 次的链式调用。

用户输入的内容量也在显著变长，文件、多模态信息和长上下文被大量引入。最终的结果是，虽然单 Token 的价格便宜了 10 倍，但单次请求所消耗的 Token 用量可能同步增长了 10 倍。这种用量的激增在很大程度上抵消了单价下降带来的红利，导致从应用端的总成本来看，并没有感受到明显的下降。

**趋势 7：ChatGPT vs Gemini**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/021.png)

Gemini 3 的发布改变了模型竞争格局，导致 ChatGPT 首次因模型竞争而出现流量和用户下跌。但与此同时，从绝对量上看，Gemini 3 对 Gemini App 和 Web 的提升效果其实不如 Nano banana 明显。

Gemini 3 的主要进步集中在前端开发等生产力端的专业需求上。而在生活助手方面，尤其是移动端处理生活化问题时，ChatGPT 受到的冲击较小。从用户粘性来看，ChatGPT 在使用量和留存等方面表现出更高的粘性，这正是两者之间分化最大的差异所在。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/022.png)

**•** 流量争夺：Gemini 在“量”上逼近，ChatGPT 在“质”上断层

随着 Nano Banana 和 Gemini 3 的推出，Gemini 的 MAU 增长迅速，已达到 ChatGPT 的 20%-25%（8 月仅为 10%）。然而，在用户粘性指标上，两者仍有显著差距：Gemini 的 DAU/MAU 比例仅为约 10%，而 ChatGPT 这一数字高达约 25%。这意味着虽然 Gemini 的月活用户涨得很快，但大部分用户的使用频率远低于 ChatGPT，ChatGPT 单用户月均会话数约为 9.6 次，是 Gemini 的 3-4 倍。

**•** 地域差异：ChatGPT 守住高价值地区，Gemini 农村包围城市

ChatGPT 在美国、英国、德国等高付费能力的发达市场占据绝对统治地位，商业化根基非常稳固，即使在 Gemini 发布后，ChatGPT 在这些地区的免费榜上依然领先。而 Gemini 则采取了“农村包围城市”的策略，依托 Android 生态的强力引流，在印度、巴西、印尼、越南等新兴市场渗透率极高，MAU 已达到 ChatGPT 的 1/3 以上。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/023.png)

**•** 用户行为：ChatGPT 确立“Personal Assistant”心智

ChatGPT 非生产力类 Query 比例明显上升，且工作日与周末的活跃度差距在收窄，说明用户在周末也会频繁使用它，更像是一个随身携带的生活助手。特别是在移动端，ChatGPT 的活跃度远超 Gemini，而移动端正是个人助理场景的主战场。相比之下，Gemini 更多被用户视为生产力工具，用于 Coding、Deep Research 等专业需求。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/024.png)

**•** 入口之争：Search vs Chatbot 15%

从 Web 流量视角来看，AI Chatbot 已经成为一个值得单独看待的“信息检索入口”，而不再是边缘流量。Google Search 与 ChatGPT 的流量比例已从 95:5（去年初）演变为 85:15（去年 10 月）。这表明 ChatGPT 正在分流传统搜索的流量，开启了一种全新的信息检索产品形态。从月活跃用户的使用频次来看，ChatGPT 已经超过了 Threads、Reddit 和 X，正朝着 TikTok 的使用深度迈进。

**03.**

**二级视角下的 AI Beta Play**

从 ChatGPT 发布以来，二级投资的 Key Thesis 都是 AI Beta，相信在未来相当长的时间框架内，AI Beta 都会是科技创新的主旋律。

过去一个多季度，“AI Bubble”和“AI War”这两个与 AI Beta 直接相关的叙事相继出现，我们认为：

**•** AI Bubble 发出了合理的警讯，但并未改变 AI Beta 的 Momentum 本身。

**•** 市场已经转向了 AI War，这个叙事本身即是对 AI Bubble 的否定。正是因为看到了堪比大航海时代的发展机遇，才会出现百舸争流、奋勇争先的局面。我们对 AI War 的核心判断是：市场将出现两个势均力敌的阵营，并大概率交替领先。

在 AI Beta Basket 的分配中，两个阵营都应占有一席之地，但策略上可向暂时落后的一方稍作倾斜，针对短期叙事进行逆向投资。

**Thesis 1：AI Bubble？No, AI War !**

OpenAI 1.4 万亿引发的 AI Bubble 恐慌我们就不再赘述，总的来说，我们认为 AI Bubble 提出了好问题，但并不改变当前的 AI Beta：

**•** 当前的“泡沫”本质上是 OpenAI Commitment 的泡沫。这种承诺在未来两年内没有明显的违约风险，主要的挑战集中在三年后的展期问题上，而在估值层面，二级市场并未出现明显的泡沫，因为市场并未基于三年后的高预期进行激进定价。

**•** AI 仍在持续催生新物种，比如多模态推理、Proactive Agent 等，AI 的新玩法也在不断涌现，这标志着 AI Beta 的浪潮仍在继续。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/025.png)

因此，我们既要坚守 AI Beta，又要对新物种保持极高的敏感度。如果有新物种涌现，我们将看到更大的 Alpha 机会；反之，如果迟迟没有新物种诞生，AI Beta 确实有可能接近阶段性高点。

**硬件层**

在硬件层面的对决中，GPU 与 TPU 两大阵营势均力敌，交替领先。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/026.png)

但只要市场需求远大于供给，AI Beta 就是主要矛盾，Alpha 是次要矛盾，因此无论是 Google 供应链还是 NVIDIA 供应链，都具备极佳的投资价值。在 AI Beta Basket 的分配中，两个阵营都应该持有，但可以向暂时落后的一方稍作倾斜。

**•** 从产品 Roadmap 来看，NVIDIA 是行业内最努力推动摩尔定律的公司

下一代 Rubin 芯片设计极其激进，功耗设计从 1800W 拉高到 2300W，HBM 带宽从 13TB/s 提升到 20TB/s，如果这一目标实现，Rubin 将能甩开 TPUv8 一个身位，但激进设计的代价是容错空间变小，TPU vs GPU 的竞争也开始进入“比拼谁犯错少”的阶段。

**•** 从商业模式视角看，NVIDIA 的优势更为清晰

虽然 Gemini 3 是 TPU 最好的广告，但这把双刃剑也暴露了 Google 与客户（如训练模型的云客户）的竞争关系。相比之下，NVIDIA 是更纯粹的军火商，拥有更多客户且口袋更深。在 Mega7 中，Amazon、Microsoft 等大概率不会使用 TPU，而会坚定站在 GPU 阵营。

**智能应用层**

在智能应用层的竞争中，OpenAI 之前走的弯路只是暂时的。

过去两年 OpenAI 重视 Reasoning，忽略了 Pre-training，但过去六个月 OpenAI 已经把资源重新集中到了 Pre-training 上，即使是大概率还没用上新 Pre-training 的 GPT-5.2，在榜单上也已经把 Gemini 3 刷了下去。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/027.png)

更重要的是，OpenAI 在 Agent（尤其是 Proactive Agent）上的布局更充分，OpenAI 的团队是由一群“由牛人组成的草台班子”，没有大企业病和组织限制，更能从第一性原理出发孵化新物种。

**Anti-Google 同盟**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/028.png)

如果 Gemini 的领先优势扩大，将推动 NVIDIA 和 OpenAI 形成更紧密的盟友关系，AI War 的软硬两个层面会合二为一，使得局势更加势均力敌。

在现金流之战中，NVIDIA 拿走了产业链里大部分现金流，是 OpenAI 现金流紧张的源头，如今 NVIDIA 应该成为 OpenAI 最重要的 Funding Source。NVIDIA 投资 OpenAI，本质上是用未来会折旧贬值的商品（GPU），去换取未来有巨大上限的资产（OpenAI 股权），这在投资逻辑上是非常合理的。

**Thesis 2：新物种萌芽：Agent Potential Picks**

Proactive Agent 目前仍处于早期萌芽阶段，初步判断 2026 年可能非常接近真正落地的时刻。在这一主题下，下列公司可能是 potential winner，有机会享受到趋势红利。但需要明确的是，从当前的市场情绪来看，AI play 更多集中在硬件板块，AI 软件叙事从 25 年下半年一直走弱，在板块叙事偏弱的背景下，受益公司可能不一定会被有效 price-in。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/029.png)

**•**应用新分发形态：Intuit

OpenAI APP SDK 的出现代表着 ChatGPT 已经成为了一个 Super App。它可以在与用户对话的过程中分发流量，由 AI 推荐并直接将 UI 推送到用户面前，无需用户手动打开应用程序。这种分发能力的摩擦力甚至比微信小程序更低。在这个领域，上市公司中的 Intuit（INTU）是 First Mover。Intuit 已经给了 OpenAI 1 亿美元，用于购买模型用量以及在 ChatGPT 内的展示位。OpenAI 有极强的动力将 Intuit 打造成一个标杆客户，只要能证明 Intuit 花这 1 亿美金带来了大于成本的新增收入或流量价值，就能吸引更多公司效仿。

**•** Agentic Commerce：Shopify

Shopping Agent 的苗头在黑五和圣诞季已经开始显现。Shopify 的优势在于它是一个极其重要的电商后台 Infra，并且与 OpenAI 和 Google 两边都有合作。无论最终 Shopping Agent 的形态收敛在何处，或者哪家模型胜出，作为“卖水人”的 Shopify 都有受益的机会。

**•** 企业定制化：Snowflake & MongoDB

目前企业在 AI 使用上面临“Build vs Buy”的经典问题，过去两年主要以 Buy 为主（如购买 Copilot、Agentforce），Build 仍停留在小规模实验阶段。Data Infra 公司真正受益的逻辑，需要等到企业开始有信心大规模自己 Build 新的 Agent，目前这仍处于早期观察阶段。

**•** 新码农：JFrog

在 Coding Agent 领域，JFrog（FROG）是一个值得关注的标的。JFrog 存储的是写完代码编译后的二进制构建（Artifacts），这是一个集中管理系统，且商业模式是按量计价的。如果 Coding Agent 导致代码产生的应用数量爆发，JFrog 将直接受益。但仍需持谨慎态度，因为目前 Coding Agent 更多是减少了码农招聘需求，尚未看到应用程序的大爆发。

**•**新客服：Twilio

Twilio（TWLO）提供全渠道通信 API，是按量计价的 Communication Infra，如果 Voice Agent 使用量爆发，Twilio 将从中获益。

排版：傅一诺

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/030.jpg)

延伸阅读

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/031.jpg)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520859&idx=1&sn=3306bd85aeba655abd653dd59d15dce2&scene=21#wechat_redirect)

OpenAI 关键九问：2026 AI 战局升级后迎来叙事反转

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/032.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/033.png)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520737&idx=1&sn=79738c7acaa5460dc05f4830c6ba3440&scene=21#wechat_redirect)

凭借 27 万小时真机数据，Generalist 可能是最接近“GPT-1 时刻”的顶级机器人团队

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/034.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/035.png)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520673&idx=1&sn=74ce5042601a24ccf62305a65f5504a4&scene=21#wechat_redirect)

红杉对话 LangChain 创始人：2026 年 AI 告别对话框，步入 Long-Horizon Agents 元年

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/036.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/037.png)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520636&idx=1&sn=d8d5fb9b3ee29a4cf8c9160d09de4cac&scene=21#wechat_redirect)

2026 年的 Coding 时刻是 Excel

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/038.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/039.png)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247520607&idx=1&sn=ade1f59ff9dc93694eac24c9c136785a&scene=21#wechat_redirect)

当顶级视频模型半衰期只有 30 天，fal.ai 为什么收入反而一年增长 60 倍？

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2026-02-02-how-to-play-ai-beta-shi-xiang-2026-agi-tou-zi-si-kao-kai/040.png)
