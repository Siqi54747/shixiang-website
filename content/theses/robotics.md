---
title: 通用机器人是 AI 时代的新 "iPhone" 吗？
publish_date: '2024-07-12'
mp_name: 海外独角兽
url: https://mp.weixin.qq.com/s/n695VewySScJkJxpl9rcdg
msgid: 2247508357
appmsgid: 2247508357
itemidx: 1
digest: 通用机器人的到来可能比我们想象的更遥远
cover: https://mmbiz.qpic.cn/sz_mmbiz_jpg/3tHNibnJ2jgzabdMocZOJN75kuMR7ic3dlOdwXZdKsdKgEfPsLRWYcbFMe2xosgNDKDMO06gIAzgSVHG5xS5vpcg/0?wx_fmt=jpeg
image_count: 23
archived_at: '2026-04-19T22:12:58+08:00'
---

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/001.jpg)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247507749&idx=1&sn=1403008340bbe16dff1b9fc2d5ae6eae&scene=21#wechat_redirect "https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247507749&idx=1&sn=1403008340bbe16dff1b9fc2d5ae6eae&scene=21#wechat_redirect")

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/002.png)

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/003.jpg)

作者：kefei，yongxin

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/004.png)

具身智能是过去一年中和 LLM 一样受到市场高度关注的领域，通用机器人领域什么时候会出现 “iPhone 时刻”？这是所有人都关注的问题。拾象团队在过去一年中也深度追踪通用机器人和机器人 foundation model 的进展。本篇文章是我们对机器人领域研究的开源。

相较于 LLM ，通用机器人的发展可能是个更长期的事情，在这个漫长的过程中，明星 researchers、成功连续创业者所组建的团队更有机会获得充足的资金和资源支持。此外，全球范围内顶级 Embodied AI researchers 并不多，这也让 Embodied AI 领域的竞争极度人才导向，因此，我们也对赛道内重要公司的人才储备情况进行了详细梳理。

除了创业公司，Tesla 同样也是通用机器人领域软硬件综合实力极强的选手。今年 6 月，Tesla 已经在德州的 Giga 工厂部署了 2 台 Optimus-Gen2 机器人来自主执行任务。作为 [AGIX Index](http://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247507749&idx=1&sn=1403008340bbe16dff1b9fc2d5ae6eae&chksm=ce9b60bbf9ece9ad6b7028fd2aa90e43dba20a6a92f9202cdd88b806dd9a18f3e0e17ce7e8e1&scene=21#wechat_redirect) 组合中的重要公司，Tesla 在 FSD、Robotaxi 以及 Optimus-Gen2 的综合布局让它成为物理世界 AGI 的关键角色。

**💡**目录 **💡**

01 行业总结

         • 行业背景

         • 重要问题

         • 投资思考

      02 海外重要公司 Mapping

         • Tesla

         • The Bot Company

         • Figure

         • 1X

         • Physical Intelligence

         • Skild AI

**01.**

**行业总结**

**行业背景**

**Robot Learning 和通用机器人**

Robot Learning 是 AI 和机器人学科交叉的一个研究领域，它是指机器人通过学习算法获得新技能或适应新环境的技术，学习算法所针对的技能主要包括感知运动技能以及互动技能。Robot Learning 想要解决的核心问题是让机器人能够自己学会执行各种决策控制任务，也就是我们今天常提到的一个概念——通用机器人。

与 Learning 相对的是机器人的传统控制。在传统控制中，机器人的运动往往通过建模辨识、规划或控制这几个步骤来实现，也就是说机器人的运动依靠机器人专家手动编程实现。手动编程的方式能使机器人在结构化的环境下快速实现稳定可靠的运动，目前大部分实用的机器人尤其是工业机器人都是靠这种方式获得运动能力。

然而，1）为多组任务编程非常困难，2）并非所有情况和目标都是可预见的，3）现实世界的环境通常是非结构化的和复杂多样的。因此，在某些场景中，**原来基于手动编程的方式将不再适用，如何使机器人在复杂的非结构化环境中灵活自如地运动成为机器人研究领域最重要的课题。**人类能在实际的非结构化环境下进行灵活的运动是由于我们从小到大不断地学习，通过 learning 的方式使得机器人获得运动能力是替代传统手动编程方式的一个重要方向。

之前，Robot Learning 和通用机器人研究主要在学术界进行，后来在产业界和资本市场受到关注主要受到了下列一系列事件影响：

•  2021 年 8 月， Tesla 发布 Tesla bot；

•  2022 年末至今，Google 相继发布 SayCan、RT-1、RT-2、RT-X 等一系列机器人 foundation model 相关的论文；

•  ChatGPT 问世后，微软、Meta 等大厂也相继发布相关研究，既点燃了市场对机器人的 ChatGPT 时刻的期待，还有对通用机器人的热情。

**机器人的 Foundation Model**

Robot Learning 通俗来讲也是在研究机器人的 Foundation Model，拾象团队从 2023 年初跟踪机器人 Foundation Model 的进展，核心结论是 high-level 层面的技术已趋近成熟，即感知、规划、自然语言交互等方面，目前的主要瓶颈在 low-level，尤其是 manipulation 操纵控制。

💡

**机器人 Foundation Model 的定义和特点**

**• 一个基础模型：**机器人所需要的顶层的感知、理解、推理能力（high-level），以及底层控制能力（low-level）均包含在一个基础模型中，底层控制能力可以简单理解为“执行”、“与物理世界交互"。

**• 泛化性：**一方面指机器人通过学习，可以在非结构化环境中成功执行任何指令和动作；另一方面指一个机器人基础模型可以适配所有硬件。

**• 自然语言交互：**人类可以使用自然语言与机器人交互，给机器人下达指令，而非通过硬编码的方式。

Foundation Model for Robotics 也指的是学术界常提到的 Embodied AI 和 Robot Learning，以及产业界所说的通用机器人的软件部分。

由于 high-level 层面进展迅速，且随着 LLM 的 scaling law 被验证，机器人科研界开始尝试用数据解决 low-level 层面的问题，包括机器人数据、多模态数据、仿真数据，不同技术路线对各类数据的需求和配比不同。

在 2023 年上半年，学术界和产业界普遍对通用机器人的 ChatGPT 时刻抱有较大期待，2023 年 7 月 Google RT-2 发布更是引爆通用机器人浪潮。2023 年第三季度是一个有意思的时间节点，对于产业界和资本市场而言这是大浪起来的一个重要“拐点”，无论是中国还是美国该领域许多创业公司拿到大额融资，也陆陆续续有新的创业公司出现，此前对硬件不感兴趣的美国投资人也开始关注这一领域。但对于一些较早在该领域探索的公司和 researcher 而言却更像是遇到了瓶颈。

从 2023 年 Q3 开始，硅谷很多核心 researcher 和产业界最核心的公司和团队对 low-level 问题逐渐持冷静和保守态度，之前以为沿着 scaling law、利用大量的互联网数据如视频数据能很快迎来 tipping point，但从实验结果看效果并不理想，实验的可靠性和稳定性较差。有部分 researcher 表示要成功做出机器人的 foundation model 仍需要非常大量的现实世界机器人数据，而非大量互联网数据加上少量现实世界的机器人数据即可实现，目前世界上所有的机器人数据并不多，收集数据需要更长的时间和更高的成本。还有 researcher 表示机器人的 foundation model 需要新的架构，需要更底层的算法突破，在现有架构下对数据进行大量投资未必能看到技术突破。

许多顶尖研究机构和头部公司的专家均表示，从时间维度看，通用机器人可能是个短期内无法实现的事，从软件层面看，过去一年技术进步虽快，但距离一开始期望的在家庭场景或工厂场景做到完全通用这一目标仍十分遥远。我们今天看到的很多很惊艳的、能做很多事情的机器人 demo 实际上是在一个相对结构化的环境中演示，实际的操纵能力并没有达到所谓“泛化”，比如将现场灯光调暗，或将机器人需要拾起的物品换一种颜色、换一个摆放位置，机器人大概率就无法完成指定任务。

**通用机器人软件层面最领先的是 Google，软硬件综合能力最强的目前看来是 Tesla，两家公司对于如何走向通用机器人路径也不太一致。**Google 信仰的路径是一个机器人 foundation model 可以适配所有形态的硬件，能够在任何场景下做到通用性、泛化性，也就是上文提到的机器人 Foundation Model 的定义。而 Tesla 则倾向于一个 foundation model 难以适配所有硬件，即使可以适配，稳定性也不会太好，不会达到可实际落地、可大规模部署的水平，因此更可行的路线是先定义好硬件和产品形态，再针对特定硬件调整算法加入 AI 能力，软硬件同步迭代。

**重要问题**

**除了技术路线和 timing，关于通用机器人还有几个重要问题：**

**1. 场景**

没有成熟、刚需的场景是通用机器人面临的最大问题之一。从技术角度看，训练通用机器人的基础模型需要大量数据，收集大量数据最好的方法是有大规模的机器人被部署和应用在实际场景中，而想要大规模部署机器人又需要找到一个能充分体现和发挥机器人价值的场景，这样客户才会大规模采购，大规模采购和应用才能收集大规模数据，这个飞轮才能转起来。自动驾驶也是通过这样的路径逐步实现泛化，但汽车出行本身就是一个非常成熟且刚需的场景，车也不是一个全新的东西，需求和产品形态都已经非常稳定。但今天的通用机器人没有这样自然且刚需的场景，也没有稳定的产品形态。

目前大家在尝试的场景包括：安防巡检；工厂作业；家庭清洁；酒店清洁；超市零售拣货补货；药房捡药等等。大多数公司选择先从 2B 场景切入。也有公司认为场景未必由机器人公司 figure out，当前最重要是把产品定义好，把机器人智能能力提升至一定水平，把成本降低，把机器人卖出去，也许用户就能自己找到有意义的场景。

**2. 机器人数据**

机器人数据不足也是通用机器人面临的一大问题。这里的机器人数据指机器人与现实世界交互的数据。除了真正将机器人部署至实际生产环境中、实际使用之外，机器人数据收集方式还包括以下几种：

**•** **人类 teleoperate 机器人做任务：**可以是远程也可以在现场。机器人获取 camera、马达，以及 action 三类数据。这种方法收集的数据最全，因此效果也最好，但也是最贵的。这个方向的经典案例是今年很火的开源项目 ALOHA。

**•****通用操控接口（UMI）：**UMI 通过手持夹具和精心设计的接口实现数据收集，通过算法反推机器人应该如何做相同的任务，不需要机器人看数据。这种方法成本更低。

**•****纯视觉收集数据：**通过戴眼镜或者类似的方式收集数据，但在学术界看来，这样收集的数据有用但也有较大局限性。

**3. 多模态对机器人的影响**

多模态对机器人研究的影响主要体现在多模态理解上，多模态生成目前没有对机器人研究产生直接影响。而多模态理解对机器人的影响又主要体现在视频数据理解上，即机器人通过理解视频数据学习知识和动作。Google、Tesla 都在此路径上进行探索：大量的视频数据 + 少量现实世界数据去训练机器人的 foundation model。如果该路径能跑通，则多模态理解对机器人的 foundation model 有很大帮助。

**投资思考**

**以上是从技术和产业视角进行分析，从投资视角看，我们对机器人重要细分赛道的投资机会判断如下：**

**1. 通用机器人：**

目前通用机器人公司有三类：1)软硬件均涉及的公司，比如 Tesla、1X、Figure；2)只做 Robotics Foundation Model 或更强调软件实力的公司，例如 Physical Intelligence；3)更强调硬件实力的公司。

**•****软硬一体公司：**

这类公司的目标是做出具有通用能力、能完成多项任务的机器人，通常是自己开发硬件+AI，或者在现有硬件基础上加上AI。硬件以人形机器人为主，也有部分公司选择轮式或四足+双臂+灵巧手的形态。需要团队具备软硬件综合能力。商业模式是向 B 端或 C 端销售带有智能能力的完整的机器人。

从投资角度看，此类公司商业价值最高，但实现难度大，目前仍处在 research 阶段，research 中的 low-level 问题何时能解决是个未知数，即使解决，从 research 走到大规模商业化还要经过漫长的产品定义、场景定义、量产、降成本、GTM 等阶段。因此，从投资角度看，在 research 阶段进入可能带来较多不确定性和资本效率较低的问题。**对于团队而言，除了基本的产品定义能力、AI 能力、供应链能力、销售能力外，融资能力在这个漫长的周期下也显得尤为重要。**

**•****纯软件公司：**

这类公司将大部分或全部精力放在研究机器人的 foundation model 上，商业模式是向硬件厂商或综合型厂商提供 API，或通过项目制与它们合作。团队通常来自顶级 Embodied AI 实验室，如 Google DeepMind 的机器人团队或 Stanford、Berkeley 等顶级院校。此类公司同样会面临上文提到的所有的科研问题，但他们也是最有实力解决这些问题的团队。

与 Google、Tesla、Nvidia 等大公司相比，这类创业公司的资源和 infra 可能是短板，因此也需要团队有较强的融资能力，同时注意补齐工程和 infra 能力。从投资角度看，此类公司在美国有较大投资价值，核心 thesis 是人才。**由于全球顶级 Embodied AI researchers 不多，而美国的收并购环境又较好，当越来越多大企业或传统企业关注 Embodied AI，收购的机会就越来越大，可参考自动驾驶和 LLM 的收购现象。**

**• 纯硬件公司：**

这一领域最有竞争力的玩家多为中国公司，最 PMF 的市场是科研市场。受益于中国的供应链和制造能力，不少中国公司能够在短时间内制作出性能好同时成本低的机器人硬件，卖给全球顶尖机器人、AI 实验室。

**从投资角度看，能够把硬件做到极致的公司有一定投资价值，但从 upside 看，需要开拓更多场景，找到更多商业化路径。**一方面科研市场规模有限，随着进入的玩家变多，每一个玩家能分到的市场份额变小。同时，受国际关系影响，部分高价值地区未来进入难度变大，这部分市场规模在萎缩。因此，许多原本更强调硬件实力的公司也纷纷向软硬一体、综合型公司转型。

**2. 特定场景下的非通用机器人**

通用是一个思路，垂直场景也是一个思路。相比于通用，垂直场景的机器人确定性更高，价值也未必更低。过去被充分验证的手术机器人、仓储机器人、扫地机器人等属于垂直场景的非通用机器人。它不要求机器人在所有场景下都有泛化能力，也不要求机器人的产品形态能够完成很多动作，而是在特定场景解决特定需求、特定问题即可。今天加了 AI、LLM、多模态等能力后，哪些原有场景价值有明显地提升，又有哪些新场景被挖掘出来，也是很值得关注的一个方向。

**3. 机器人领域的 Scale AI**

上文提到机器人的 foundation model 目前的主要瓶颈在于缺少机器人数据。随着机器人关注越来越高，越来越多公司参与到机器人的研发中，对机器人数据的需求在极速上升，因此机器人领域也有诞生新的 “Scale AI” 的机会。关于主流的几种数据收集方式我们在上文也已经提到。

从团队角度看，机器人领域的 Scale AI 的理想的团队画像需要具备以下能力：

**•**有懂运营的人才。因为收集数据、处理数据、搭建整套数据处理体系、人才管理等都需要有成熟的 operate 能力；

**•**有了解通用机器人的 researcher，了解工业界、学术界的需求，并能持续跟进需求。

**02.**

**海外重要公司 Mapping**

除了 Tesla 的 Optimus 之外，该领域绝大部分公司都还相对早期。如上文提到，这个阶段创始团队成员背景是进行投资判断的重要指标，并且随着通用机器人领域的爆火，不乏明星 research、连续创业者加入该领域创业，因此我们对重要公司的核心成员背景也进行了详细梳理。

**Tesla**

**Tesla 机器人团队是目前来看综合实力最强、战略规划最清晰的团队。**路线上，如同我们上文提到的，Tesla 更倾向于认为一个 foundation model 难以适配所有硬件，因此他们选择先定义好硬件和产品形态，再针对特定硬件调整算法加入 AI 能力，软硬件同步迭代。Tesla 预计将于 2025 年开始量产人形机器人，将有超过 1000 个机器人在 Tesla 工厂完成任务，长期目标是把机器人卖给个人。

Tesla 的机器人项目为 Tesla Bot，也叫 Optimus，是 Tesla 在 Elon Musk 领导下开发的一款通用双足人形机器人，Tesla Bot 概念于 2021 年首次推出，如今已经迭代到第二代。Optimus 二代机器人（Optimus Gen2）于 2023 年 12 月首次在公开发布 demo，并于本月在 WAIC 亮相。市场对 Optimus Gen2 评价很高，认为这是机器人领域的 “iPhone” 的雏形。

相比 Gen1，Gen 2 的步行速度提高了 30%；重量减轻了 10 公斤，机器人行走模式也更加稳定。Gen 2 采用了全部由特斯拉自主设计和制造的执行器和传感器；配备了全新的双手，能够抓握更重的物体并进行更加精细的操作。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/005.png)

**The Bot Com****pany**

The Bot Company 是 Cruise 前 CEO  Kyle Vogt 在今年 4 月创立的。公司定位是一个针对家庭场景的通用机器人平台，目前正在开发用于做家务的机器人。成立一个月后，公司即完成了 1.5 亿美金融资，投后估值 5.5 亿美金，由 Nat friedman、Daniel Gross、Nabeel 领投，其他投资人还包括 Stripe CEO Patrick Collison，Elad Gil 等。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/006.png)

除了  Kyle 来自动驾驶领域外，团队 CTO Paril Jain 是 Tesla 前高管，在 Tesla Autopilot team 负责 Planning, Imitation Learning 和 RL。创始团队其他核心成员绝大部分拥有 Cruise、Tesla 以及 MIT 的背景，团队间彼此有多年共事经历。

**•** **Kyle Vogt：CEO Kyle 是一个连续创业者，**2013 年至 2023 年担任 Cruise CEO，Cruise 在 2016 年被通用汽车以 10 亿美元收购；2006 年至 2013 年，Kyle 还联合创立了 Twitch，Twitch 后来被亚马逊以 11 亿美元收购。作为天使投资人，Kyle Vogt 还投资了超过 40 家创业公司，有 7 家成功退出；

**•** **Paril Jain：**CTO 及联合创始人。Paril 曾是 Tesla Autopilot 的 head of Planning,，在 2021 年 10 月至 2024 年 3 月任职于 Tesla 期间先后在 Limitation Learning & RL team 工作，

**Figure**

**基本信息**

Figure AI 成立于 2022 年，目标是设计可以应用于人类环境的通用型机器人，让机器人可以执行各种不同的任务，可为制造、物流、仓储和零售等多个行业提供帮助。

CEO Brett Adcock 是一位连续创业者，有 20 年的创业经验，在过去 15 年中一直在创建软件和硬件公司。2022 年，在上一家公司 Archer 在纽交所上市 9 月后，Brett 创立了 Figure。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/007.png)

Figure 目前有 80 名全职员工，团队成员主要来自波士顿动力、Tesla、Google、Standford、Lucid、Apple、IHMC 机器人实验室以及丰田等顶尖企业和高校。

**产品**

Figure 的目标是开发出可以执行通用任务的机器人，目前已经推出人形机器人产品。

Figure 的人形机器人重 60 千克，有效载荷 20 千克，身高 5 英尺 6 英寸，运动速度 1.2 米/秒，运行时间 5 小时。此外，该机器人还能负重举起 30 公斤、约合 66 磅的物品，作为比较，美国职业安全与健康管理局规定的人类员工合法举起的最大重量是 51 磅。Figure AI 正在开发能够以人类水平操作物品的双手。

Figure 选择电动马达而不是气动马达为机器人提供动力。电动马达的优势在于续航时间，之前的人形机器人一般只能连续工作 1-2 个小时。Figure 的机器人如果充电 15 分钟，可以工作 1.5 小时，充电 40 分钟就能工作 4 小时，可以较容易地满足每天工作 8 小时的要求。机器人可以自动停靠充电。

**商业化**

Figure 在将聚焦三个重点行业来开发通用机器人，因为不同领域成熟度之间存在差异，所以在 roadmap 上有不同优先级，短期内 2B 场景的劳动力需求是 Figure 关注的重点：

**1. 初期：2B 场景劳动力**

公司初期将重点关注美国劳动力短缺的企业应用场景，包括制造业（1300 万个工作岗位）、物流业（200 万个工作岗位）、仓储和配送中心（500 万个工作岗位）以及零售业（3200 万个工作岗位）。

其中，3PL （第三方物流）仓库将是第一个部署机器人的场景，原因在于：

• 和室外环境比，室内场景在硬件设计中不用考虑风雨、暴晒等情况；

• 仓库拥有结构化的环境，例如货物的 SKU 数量、位置、重量、尺寸、何时开始、需要运往何处、位于何处等一切信息 ；

• 无需与人进行过多的交互，仓库有成熟的管理系统，从拆箱到发货都能全程跟踪发出机器指令，无人化程度高，利于尽快落地；

• 仓储业是全美工人流失率最高的行业之一。全美平均工人流失率为 3.6%，而仓储业流失率是 37%，这个领域长期存在缺勤和工伤问题。

**2. 中长期：居家养老服务**

全球有 23 亿个家庭，7 亿老龄人口需要居家养老服务。未来，公司希望人形机器人能够协助人类做家务和跑腿。不过这是长期目标，公司认为如果以居家服务作为起点不利于快速规模化量产，因为居家场景：

• 场景不标准化；

• 场景中有人，在避障、交互方面需要更成熟的技术，对安全性要求也更高。

**3. 长期：太空经济**

公司计划在未来协助太空探索。太空探索是一项危险的工作，而机器人可以在恶劣的条件下很好地工作，因此对于太空经济来说，机器人将是一个理想的大规模劳动力解决方案。但显然这个愿景还很远。

**商业模式：选择订阅、租赁的方式而非出售**

**在商业模式上，Figure 选择租赁了而不是直接出售整机，**由于目前机器人单机成本太高，也没有非常成熟的落地场景，选择订阅和租赁的方式可以把单次使用成本降低，对用户和客户而言是更好接受的方式。公司在收费方面的目标是每个机器人的年收费从 5 万美元到 10 万美元不等，最低价格基本和一名人类工人成本等齐。

假设一名工人每小时平均工资为 23 美元，一个普通的仓库运营中可能以 8 小时为一个班次，按每个月 22 天工作计算，每年每位仓库工人工资大约 4 万 8 千美元，而机器人的工时是工人工时的两倍以上，此外，蓝领工人短缺、工资不断上涨是美国近几年的普遍现象，直接带来了机器人的需求。

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/008.png)

Figure 融资历史

**1X**

**基本信息**

1X 创立于 2014 年成立，开发人形机器人软硬件，机器人拥有近似于人类的能量密度、体型和运动范围，可以在商业安全、零售、物流和医疗保健公司部署，未来将会在消费级部署。

**公司发展历史**

1X 由 Bernt Øivind Børnich 于 2014 年在挪威创办，最初公司名为 Halodi Robotics，旨在制造通用机器人来处理劳动密集型任务。2018 年，公司开发了世界上扭矩最大的重量驱动伺服电机机器人 Revo1，Revo1 是一款低齿轮比的机器人，可以模仿人类的肌肉运动。2019 年，公司在旧金山建立了第二个总部。2020 年公司与 Everon 合作，签署了部署 150-250 个机器人在美国商业建筑中进行夜间守卫的合同。2022 年，公司有了重大突破，与 OpenAI 合作，并开始寻求借助人工智能模型来为其机器人增加智能。公司引入了语言模型和具体的学习模型，使机器人能够理解用户用自然语言提出的要求，并在学习的过程中执行任务。

**产品**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/009.png)

EVE（左）和 NEO（右）

**EVE（已上市）**

EVE 是一种仿人机器人，它靠一对轮子行走，既能理解自然语言，也能理解物理空间，现已上市。该机器人主要用于物流设施和工厂等工业环境：例如，在工厂中执行任务、在制造业中协助后勤工作、作为巡逻警卫在建筑物中导航和放哨等。目前，EVE 已经在多个企业和组织中部署（大概 70 个 EVE），用于搬运设备、开门和履行订单等工业任务，同时能够自然地在非结构化和结构化空间中移动。

在学习方面，机器人从演示中学习。EVE 能够通过观察人类执行任务的方式来学习新任务，并复制工作流程。此外，内置的人工智能软件还能理解自然语言指令。受到自动驾驶汽车的启发，公司的数据收集方法与传统的编码和预定算法有所不同。通过使用 VR Teleop，操作员引导机器人观察不同的现实世界场景，提供对任务难度和可行性的直观理解。当数据被大规模收集时，机器人就学会了一项新技能。

在硬件方面，EVE 的所有硬件组件几乎都是自己设计的。该机器人使用一系列内部电机为其运动提供动力，更加灵活和高效。这些电机不包括任何齿轮，齿轮在提供动力的同时，会增加重量，降低自然动力，妨碍灵活性。1X 的机器人已成功开发出无需使用齿轮即可达到人类肌肉约 80% 力量密度的电机。同样，连接机器各部件的内部电缆也是基于定制设计。这些电缆减少了 EVE 必须安装的传感器数量，从而降低了制造成本。此外，传感器数量的减少还为机器人底盘内的其他组件留出了更多空间。

在通用能力方面，1X 通过设计让机器人可以请求人类干预复杂任务。例如，EVE 可以自主巡逻设施，但在遇到意外情况（如门被挡住）时可能需要人类的帮助，这样不仅能为客户提供了直接的实用性，还创造了一个数据反馈回路，帮助机器人不断学习和适应。

**NEO（开发中）**

NEO 是在工作和家庭中的双足人形机器人，既能理解自然语言，又能理解物理空间，目前正在开发阶段。与 EVE 不同，NEO 不是靠轮子行走，而是步行。它的最高速度略低于 EVE，电池寿命也较短，身高也比 EVE 低。但 NEO 拥有更先进的机械臂，可以执行更广泛的任务。

NEO 擅长安全、物流、制造、操作机械和处理复杂任务等领域的工业任务。从长远来看，公司设想 NEO 可以为家庭提供有价值的帮助，完成清洁或整理等家务。1X 还在研究如何让 NEO 为行动不便的人提供支持。NEO 同样可以被远程控制。

**融资历史**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/010.png)

**Physical Intelligence**

创立于 2024 年 3 月成立，公司的目标是做可以适配所有硬件的通用机器人 foundation model，成为机器人领域的 OpenAI。Physical Intelligence 最大的亮点在于团队，其创始人 Sergey Levine 被公认为 robot learning 领域全球最强的 researcher 之一。Physical Intelligence 的首轮融资金额 7000 万美金，估值大约 4 亿美金，领投方为 Thrive Capital，跟投方为 OpenAI, Sequoia Capital, Khosla Ventures, Lux Capital。

**核心创始成员情况**

PI 的创始人Sergey 是 robot learning 领域全球最强的 researcher 之一，也非常有影响力。团队核心成员主要来自 Google，其中 Sergey、Chelsea、Hausman、Brian 均为 Google 机器人团队非常核心的成员，而 Google 是 robot learning 领域最强的 research lab。目前团队仍在不断从 Google 挖人，鉴于 Sergey 等人的影响力和号召力以及 Pi 的愿景，未来几个月我们可能会看到越来越多该领域的优秀的 researcher 和工程师加入团队。

**• Sergey Levine：**Berkeley 电子工程与计算机科学系副教授， Robot Learning 领域最顶级的研究员，他的 Google scholar 的被引用量为超过 12.9 万，也是被广泛使用的 Soft-Actor Critic（SAC）强化学习算法的共同发明人。他还是个顶会狂魔，在此前的不完全统计中，Sergey Levine 2018年在 ML 和 NLP 顶会上共发表 22 篇论文，为全球第一；ICML 2019，他参与论文数量排名第三；NeurIPS 2019、NeurIPS 2020，他均有 12 篇论文被接收。

**• Chelsea Finn：**斯坦福大学计算机科学与电子工程系的助理教授，她的实验室 IRIS 研究通过大规模机器人交互实现智能在 Deepmind 担任 Research Scientist。她的研究主要集中在让机器人和其他 agents 通过学习和互动发展广泛智能行为的能力。

**• Karol Hausman：**Google 机器人团队发布的 RT 系列论文的核心 lead。2018-2024 年，Karol 在 Google DeepMind 机器人团队担任 Staff Research Scientist and Robot Manipulation Lead；2021 年至今在斯坦福大学担任兼职教授，教授深度强化学习课程。

**• Brian Ichter：**2018-2024 年在 Google DeepMind Robotics team 担任 Research Scientist。他的研究兴趣在于使移动机器人系统能够通过 ML 和 large-scale models，在现实环境中规划和执行 long-horizon 任务。

• **Lachy Groom：** Stripe 的第 30 号员工，同时也是一位天使投资人。根据 pitchbook 的数据，他在 2021 年完成的第三期个人基金规模 2.5 亿美元，这是 Solo VC 的第三大募资记录。Lachy 在团队主要负责融资。

除此之外，创始团队成员还包括 Suraj Nair 和 Quan Vuong。Suraj Nair 在斯坦福大学人工智能实验室获得了计算机科学博士学位，得到 Chelsea Finn（公司联合创始人） 和 Silvio Savarese 教授的共同指导。Quan Vuong 是加州大学圣地亚哥分校的博士生，攻读博士学位期间在 Google DeepMind 的机器人团队实习。

**Skild AI**

Skild AI 成立于 2023 年，致力于开发机器人的 foundation model，用于驱动各种机器人，包括人形机器人、四足机器人等。2023 年 7 月，红杉美国和 Lightspeed 共同领投了 Skild 的 seed 轮融资。2024 年 4 月，公司完成了新一轮 3 亿美元融资，投后估值 15 亿美元，投资机构包括 Coatue Management, Lightspeed Venture Partners, Ryan Wilson， Sequoia, General Catalyst， Menlo Ventures 等。

Skild AI 由 CMU 的 Abhinav Gupta 和 Deepak Pathak 两位教授创立，二位曾在 Meta Platforms 一起从事人工智能研究工作。

**•** **Abhinav Gupt**

**-**从 2009 年 8 月起，Abhinav Gupta 在 CMU Robotics Institute 担任教授，他的研究主要专注于通过构建自监督学习、终身学习和交互式学习系统来扩展学习。

**-** 从 2018 年 4 月至 2022 年 5 月，Abhinav Gupta 在 Facebook 担任 research manager。期间他在匹兹堡创立了一个新的研究实验室，还在 Facebook AI Research 建立了一个新的 robotics 团队，在这一阶段，他和团队在自监督学习、触觉传感、机器人导航和操纵等多个领域取得了关键性的创新；

**-** 在 2016 年 9 月至 2018 年 3 月期间，Abhinav Gupta 作为科学顾问兼职了 Allen Institute for AI (AI2)  的工作，他为 PRIOR 团队提供咨询，并与多个研究项目合作，包括著名的 Charades 数据集和 AI2 Thor；

**-** 2016 年 1 月至 2018 年 3 月，Abhinav Gupta 在谷歌兼职顾问，为计算机视觉和大规模视觉学习项目提供指导，并领导了一个使用 JFT-300B 图像学习大型模型的项目。

•**Deepak Pathak**

**-** Deepak Pathak 研究与计算机视觉、机器学习和机器人相关的人工智能课题，并从动物认知和生物学中汲取灵感。终极目标是制造出具有类似人类能力，能在真实而多样的环境中进行泛化的机器人。

**-** 曾是 VisageMap Inc. 的联合创始人，并在微软担任过研究实习生；

**-** Deepak Pathak 曾在 Meta AI Research 与 Jitendra Malik 合作担任研究员一年，并在加州大学伯克利分校与 Pieter Abbeel 合作担任访问博士后；

**-** 2020 年至今担任 CMU 计算机科学学院的助理教授，是 Robotics Institute 的成员并隶属于 Machine Learning Department。

**本文内容仅为研究分享，不作为投资建议。**

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/011.png)

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/012.png)

排版：Doro

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/013.jpg)

延伸阅读

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/014.png)](http://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247508283&idx=1&sn=1a096e4d2f545784a749b1cc018a6043&chksm=ce9b1ea5f9ec97b3f0272d4ad0b58ada6db7fbca8013cd67269eaf5946145a26d090eeb6ba15&scene=21#wechat_redirect)

专访 LanceDB 创始人：多模态 AI 需要下一代数据基建

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/015.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/016.jpg)](http://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247508115&idx=1&sn=3a897e184295128abbe124f8db6524b4&chksm=ce9b1f0df9ec961b90749b66452bb56cc9ac6fbf328b9149a377698299fa27e985a83e0dfab5&scene=21#wechat_redirect)

Kore.ai：LLM能否为AI客服带来新一轮洗牌与机遇

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/017.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/018.jpg)](http://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247508064&idx=1&sn=1f60f9c685f92ca914c2d4a128f83880&chksm=ce9b1ffef9ec96e8f15c7f7ea91ecea5ae6509dcdc32c804b41f1ad167471c80f51771f7ef83&scene=21#wechat_redirect)

为什么 AGI 应用还没有大爆发？

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/019.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/020.jpg)](http://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247507950&idx=1&sn=64c3d23960ec8e4cf91dccdece8aa4e1&chksm=ce9b6070f9ece96648ed9da6b2d4953fe2b8897629285b688253fa2e4a72473a7747d91baa74&scene=21#wechat_redirect)

互联：让数据中心成为新一代计算单元

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/021.png)

[![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/022.jpg)](http://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247507749&idx=1&sn=1403008340bbe16dff1b9fc2d5ae6eae&chksm=ce9b60bbf9ece9ad6b7028fd2aa90e43dba20a6a92f9202cdd88b806dd9a18f3e0e17ce7e8e1&scene=21#wechat_redirect)

拾象AGIX指数发布：AI 时代的纳斯达克100

![](https://raw.githubusercontent.com/Siqi54747/UO-articles/main/images/2024-07-12-tong-yong-ji-qi-ren-shi-ai-shi-dai-de-xin-iphone-ma/023.png)
