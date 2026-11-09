# CHANGELOG

本技能 fork 自 oil-ui 0.33.2(MIT,致谢 oil-oil),此后独立演进。

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
