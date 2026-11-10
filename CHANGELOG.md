# CHANGELOG

本技能 fork 自 oil-ui 0.33.2(MIT,致谢 oil-oil),此后独立演进。

## 1.0.19(2026-11-09)

- R28 截断计数 bug 修复(粘贴 200 字显示 200/140 → 先截断再计数);R25-R27 大屏 1920/平板 768/图表键盘 Enter 全部验证通过

## 1.0.18(2026-11-09)

- R23 跨页 UX 走查(真实点击全链):抓到 cockpit 导航 3 链接 404(R3 建导航从未点击验证)→ 修复+复验回环全绿
- challenge 第 3 维必须过补「导航链接逐一点击可达」
- 表单自绘勾选测试方法:click label(零尺寸 input 的 check 不可用,用户交互不受影响)

## 1.0.17(2026-11-09)

- R21 全仓链接断链检查(0 断链)+cockpit 首屏回归(导航加入后 lint/issues 仍零)
- R22 showcase 增第二档案:设计蓝图(概念页+原型入库 docs/blueprint/)+R10-R20 循环续报节

## 1.0.16(2026-11-09)

- R20 色盲模拟评审:hot 柱加黑顶帽第二通道;data-viz 补色盲滤镜验证方法(本环境 headless 根级 filter 不生效,记 pending)
- R19 README 训练循环节(R1-R18 状态表)

## 1.0.15(2026-11-09)

- R18 漂移源消除:主页徽章去版本号(常青文案),og:image 绝对 URL——手工同步三处必漏,机制消除优于纪律约束

## 1.0.14(2026-11-09)

- R17 1.20.1 新控件贴图实证(重新解包 jar):checkbox 64²/slider/tab_button/bars/分隔线 32×2 独立化 → 基线版本差异节更新
- R16 主页 og 分享标签补齐+徽章/lead 同步至当前版本(W9 同步漂移修复)
- R15 三页移动档+蓝图补验(零溢出)
- R14 极端窄屏 320 档四页复验(零溢出,响应式规则复利验证)

## 1.0.13(2026-11-09)

- R13 极端数据鲁棒性:challenge 第 8 维补「荒谬值报数据源错误,不直接展示」;状态切换残留旧数据问题修复(空态二次孤立体教训:改状态必须清旧内容)

## 1.0.12(2026-11-09)

- R11 断线态:cockpit 断线横幅(信号块/重试/数据降透明)+基线补故障态横幅规格
- R12 加载态:进度条+mono 状态文字+超时去向;基线补 loading 规格
- challenge 第 8 维扩为数据面板状态机四态(加载/正常/空/断线)+表单六态并列

## 1.0.11(2026-11-09)

- R10 键盘可达性循环:tabwalk.mjs 工具收编(连续 Tab 报焦点序列/断裂);cockpit 操作按钮与 economy 图例改原生 button+focus-visible;challenge 第 4 维判定动作化(必须 Tab 走查)

## 1.0.10(2026-11-09)

- R7 评审盲测(7 缺陷植入 7/7 全抓,规则面达标,W5 转长期观察)
- R8 规则瘦身审计:1648 行总量合理,新增规则无语义冲突,通过
- R9 回归测试:新规则回审四产物,抓到 6 组语义色未登记基线+1 处旧色残留——基线补「语义/系列扩展色」5 行

## 1.0.9(2026-11-09)

- R6 强概念循环收官(W7 出池):「carliber-ui 设计蓝图」概念页——工程制图美学承载技能方法论,看图抓到雷达 viewBox 裁切并修复
- challenge 第 2 维补「隐喻贯穿检查」(强概念页半途退化即失败)

## 1.0.8(2026-11-09)

- R5 移动档循环收官(W6 出池):四产物 390×844 全量复验——三页 viewport meta 缺失修复、cockpit 玩家行窄屏 wrap 修复,全部零溢出
- layout-and-viewport 补「新页面自检 viewport meta;窄档验证用真实小视口渲染」
- R3/R4 补录:tabs-active 配方、中文大标题行高 ≥1.45、出场动画页滚动截图 stuck 误报语境
- 循环机制五轮完成(W1/W2/W3/W4/W6 出池,余 W5 长期项/W7 待需求)

## 1.0.7(2026-11-09)

- R3 多页一致性收官(W3 出池):第三页排行榜+三页统一导航(当前页高亮),风格零漂移
- minecraft 基线新增 tabs-active 配方:浅底当前页高亮 = 文字 #0a5bb5 + 3px 底条 #1190FF(双通道,单用 #1190FF 灰底 1.90:1 禁止)

## 1.0.6(2026-11-09)

- R2 数据可视化实战循环收官(W2 出池):三系列折线(图例联动)/堆叠柱/双轴对照全部落地,四态截图验收
- data-viz 新增两条实战规则:「同轴多系列量级兼容 3×」(累计量与日增量不共轴,默认隐藏+图例标注)、「低饱和系列色需底色对比」(垫中性深底或对比分隔缝)
- 捕获验证:shoot 控制台错误捕获抓到 2 个真 JS bug(二维数组 Math.max=NaN、作用域泄漏连环崩)

## 1.0.5(2026-11-09)

- R1 表单实战循环收官(W1 出池):六态全链路(默认/聚焦/校验错误/提交中/成功/禁用)真实交互触发并逐态截图验收
- minecraft 基线新增「表单控件规格 + 浅底文本色谱」:输入框三边态、自绘像素勾选框、单选复用 widgets、灰底文本色 4 档(全部实测值,含「#1190FF 黑底语境色灰底仅 1.90:1 禁用」实证)
- challenge 矩阵扩强:第 4 维语义色实际底色验证、第 5 维 emoji 反模式、第 7 维平台默认样式纳管、第 8 维表单六态
- visual-review:主 Agent 可看图时按手册标准评审(视觉能力解锁后的路径升级)
- 新增训练循环机制:.carliber-ui/training/LOOP.md 弱点池 + 循环日志

## 1.0.4(2026-11-09)

- **视觉评审路径升级**:宿主模型确认可读截图后,主 Agent 能看图时按评审手册标准亲自看图评审(等同独立评审严格度),替代原「自检降级」路径;cockpit-demo 已按新路径出首份看图评审报告(抓到跨基线色 #2779aa 残留并修复,lint/代码查不出的问题)
- cockpit-demo 问题归因改进:challenge 第 4 维补「语义色在实际底色上验证」+反模式补警示色中灰底;第 5 维补「emoji 当图标」反模式;SKILL.md 步骤 3 补「方向卡承诺状态逐一实现、交付前对照」;layout-and-viewport 选型原则补「引用数值须注明出处,无据不取值」
- docs/showcase.html:八步时间线每步嵌入半成品摘录块(档案原文/灰度线框/lint 摘录),cta 居中

## 1.0.3(2026-11-09)

- 视口判定去固定值:challenge 矩阵、design-direction 不再写死 1280×800/1440×900,改按产品实际使用环境从常见档位选
- layout-and-viewport 新增「常见视口参考」表(桌面/平板/手机多档比例+选型原则)与「尺寸写法优先级」(clamp/vh/vw/% 优先,px 限边框/像素复刻/token 例外)
- 起因:cockpit-demo 实战中发现方向卡用了无依据的 1440×900,暴露技能文档固定值误导

## 1.0.2(2026-11-09)

- 标点体例统一为英文符号:SKILL.md + 22 篇 references 共 2656 处全角→半角(逐位校验零内容变化,代码块保留)
- tools.md 补 CHROME_PATH 用法:无系统浏览器时指向 Playwright 浏览器可执行文件(实战校准发现)
- SKILL.md 步骤 3 补 lint 豁免:复刻/还原类页面按还原优先原则豁免对比度提示(实战校准发现)
- docs/ 新增项目主页(GitHub Pages,https://carliber.github.io/carliber-ui/)

## 1.0.1(2026-11-09)

- minecraft 基线新增「版本差异」节:1.7.10/1.12.2/1.20.1 官方 client.jar 解包实证——GUI 贴图三版本同规格(widgets/icons/容器全 256×256),字体 1.20.1 起 JSON provider 化
- 新增 `translate-1.12.md`、`translate-1.20.md` 版本增量映射表:一次 HTML 原型,多版本翻译

## 1.0.0(2026-11-09)

- 更名 `ui-design` → **`carliber-ui`**,独立版本号起 1.0.0,工作区目录改为 `.carliber-ui/`
- 内部环境证据脱敏(移除取证截图与过程记录,基线保留可复核的皮肤 CSS)

## 0.33.2-fork.1(2026-11-09)

### 更名与切断
- `oil-ui` → `ui-design`,目录 `~/.agents/skills/ui-design`,版本号 `0.33.2-fork.1`
- 删除:版本检查/自动更新(`check_update.*`)、Pro 购买推荐(`recommend_once.py`)、oiloil 生图通道(`oiloil-image.mjs`)、对应测试、多语言品牌 README×3、上游 CI
- 清理 SKILL.md 与全部 references 的购买提示、oil-tone 提及、积分流程;生图只走宿主工具
- 工作区目录 `.oil-ui/` → `.ui-design/`(SKILL/workdir/tools/test_workdir 同步;shoot.mjs 路径例外同步,避免新目录被判私有路径)
- README 重写;LICENSE 保留原版权 + fork 声明

### 方法论增强
- 新增 `references/challenge.md`:8 维质疑矩阵(层级/差异化/任务/可访问性/密度/真实性/一致性/边界),三节点使用(选候选打分/方向确认找风险/交付前终检),❌必修/⚠️豁免附理由
- 新增 `references/iterate.md`:多轮对比收敛协议(并排对比+三问+评分,停止条件,防振荡)
- SKILL.md:主流程前置"页面类型/主要矛盾"条目+六类矛盾表;步骤 1 加 DESIGN.md 预检与多维质疑引用;步骤 4 加多轮触发;步骤 5 加矩阵终检
- 评审协议(visual-review.md)与矩阵/矛盾打通:交接必给矛盾一句,反馈先归维再处置

### 设计基线库(assets/design-md/)
- `miracle/DESIGN.md`:Miracle 6.22.2 平台视觉基线(内部部署环境实测皮肤 CSS,含平台约束),证据同目录存档
- `minecraft/DESIGN.md`:MC 1.7.10 原版 GUI 基线(mc1710 技能源码实证,画布缩放/18px 网格/禁则)
- `minecraft/mcgui.html`:原版 GUI 组件复刻规格文档(按钮三态/容器 176×166/tooltip/HUD,1 GUI px=3 CSS px,可直接复刻进游戏)
- `minecraft/translate.md`:HTML 原型→Java GUI 翻译方法(对照表+13 条映射规则)
- challenge.md 基线优先级:项目根 DESIGN.md > 内置(Miracle/Minecraft)> awesome-design-md 外部

### 其他
- 新增 `references/typography-zh.md`:中文排版参考(混排空格/行长/避头尾/窄屏断行)
- 新增 `references/data-viz.md`:数据可视化参考(用色/图例标注/空态极端值)
- shoot.mjs 新增三条动效 lint:`transitionAll`/`animatesGeometry`(几何属性过渡)/`motionNoFallback`(无 prefers-reduced-motion 回退),随截图报告输出;test_shoot 对应用例更新并通过
- Claude 宿主残留检查:0 处
- 验证:SKILL.md 全部引用存在;test_workdir gitignore 单测通过;残留扫描仅余 5 处内部功能标识(无网络指向)
