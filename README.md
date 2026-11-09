# carliber-ui

AI Agent 的界面设计技能。主流程:**判定页面类型 → 锁定主要矛盾 → 收敛设计方向 → 实现 → 独立评审 → 多轮打磨**,配 8 维质疑矩阵与多轮对比收敛协议。适用于网站、App、后台与组件的设计、改进与评审。

由 [oil-ui](https://github.com/oil-oil/oil-ui) 0.33.2 fork(MIT,感谢 oil-oil)独立演进,变更见 [CHANGELOG.md](CHANGELOG.md)。

## 特性

- **类型→矛盾→方向**:先判定页面类型并写下该页要赢的主要矛盾,后续主角/方向/质疑都对着它
- **8 维质疑矩阵**:层级、差异化(镜像测试防撞脸)、任务、可访问性、密度、真实性、一致性、边界——选候选打分、方向确认找风险、交付前终检三节点复用
- **多轮对比收敛**:并排对比+三问(变好了什么/变差了什么/下轮只修什么)+评分,带停止条件与防振荡
- **独立评审协议**:交接矛盾与约束,反馈先归维再处置
- **设计基线库**:Minecraft 1.7.10 原版 GUI(像素级规格+HTML 复刻+翻译成 Java GUI 的方法)、Miracle 平台(miniui 实测)
- **截图工具链**:对比度/字号/行高/透明卡死检查,加动效 lint(transition:all、几何属性过渡、无 reduced-motion 回退)

## 结构

- `SKILL.md` — 主流程与场景路由
- `references/` — 22 篇细则:设计方向、视觉语言、素材、动效、评审协议、中文排版、数据可视化、质疑矩阵、多轮收敛等
- `assets/design-md/` — 设计基线(minecraft 含 DESIGN.md / mcgui.html / translate.md;miracle 含实测皮肤 CSS)
- `scripts/` — 截图(shoot)、素材检索(curate-media)、对比页生成(build_explorer)、图片处理、测量
- `tests/` — 脚本单测

## 安装

复制本目录到 Agent 的技能目录(如 `~/.agents/skills/carliber-ui/`),按宿主方式加载 SKILL.md。

## License

MIT(含上游 oil-ui 版权声明,见 [LICENSE](LICENSE))
