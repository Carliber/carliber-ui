---
name: minecraft-design
description: Minecraft 1.7.10 原版 GUI 视觉基线。做 MC 风格界面/Mod GUI 原型时以此为规格文档:画布缩放、18px 槽位网格、widgets 按钮三态、tooltip 渐变,全部源码或像素采样实证。
source: |
  mc1710 技能(ScaledResolution/GuiContainer/FontRenderer/GuiButton 源码实证)+
  个人 1.7.10 Mod 项目原型(本地未开源,用户拍板的 1 GUI px = 3 CSS px 体系)
captured: 2026-11-09
---

# Minecraft 原版 GUI DESIGN.md

像素级复刻基线。核心思想:**一切控件落在 GUI 坐标网格上,HTML 原型按 1 GUI px = 3 CSS px 换算,一个数值都不自己定**。

## 画布与缩放(绝对像素定位的前提)

```yaml
gui-scale:
  auto: "scaleFactor 从 1 递增,条件 = 画布宽 ≥320 且 高 ≥240"   # ScaledResolution.java
  examples: ["1920×1080 auto → factor 4 → 画布 480×270", "手设 2 → 960×540", "手设 3 → 640×360"]
rule: 一切 GUI 坐标在画布坐标系;面板物理大小随 factor 变,原型只管画布坐标
```

## 像素网格与组件尺寸(全系一致节奏)

```yaml
unit:       16                 # 1 格 = 16×16(物品图标)
slot:       18                 # 槽位间距 18×18,图标 16×16 居中
slot-margin: 8                 # 容器左右边距 8;9 槽 = 8+9×18 = 170
container:  { width: 176, height-default: 166 }   # vanilla 容器标准宽 176
chest:      "ySize = 114 + rows×18"                # GuiChest 构造
ae2-terminal: { width: 197 }                      # GuiMEMonitorable.drawBG 实证
hotbar-gap: 4                                      # 背包行与 hotbar 间距(ContainerPlayer: rows end 138, hotbar 142)
button:     { width: 200, height: 20 }             # widgets.png 标准按钮段
scrollbar:  { width: 12, knob-height: 15 }         # vanilla creative tabs.png 滑块
font-height: 8                                     # ASCII 字高 7.99,阴影 +1px
furnace-arrow: { w: 24, h: 16 }                    # GuiFurnace u176 v14
```

**HTML 换算:1 GUI px = 3 CSS px**(槽 54px、按钮 600×60px、字高 24px)。

## colors

```yaml
# 面板与槽位(vanilla 容器)
panel-bg: "#c6c6c6"            # 容器底色
panel-border-out: "#ffffff"    # 外凸边:top/left 亮
panel-border-in: "#555555"     # 外凸边:bottom/right 暗(3px 立体)
slot-bg: "#8b8b8b"
slot-border-dark: "#373737"    # 内凹边:top/left 暗
slot-border-light: "#ffffff"   # 内凹边:bottom/right 亮(与面板方向相反 → 凹感)

# 按钮(widgets.png 像素采样,三态)
btn-outline: "#030303"         # 1px 外框
btn-highlight: "#aaaaaa"       # 1px 顶部高光
btn-gradient: ["#6b6b6b", "#707070", "#565656"]   # 纵向渐变
btn-hover-gradient: ["#bec7ff", "#808ac1", "#5c669d"]  # 悬停蓝紫
btn-text: "#e0e0e0"            # 常态字
btn-text-hover: "#ffffa0"      # 悬停黄字
btn-text-disabled: "#a0a0a0"

# 文字与 tooltip
text-shadow: "+1px +1px 黑"    # drawStringWithShadow;白字带阴影是唯一允许的"阴影"
tooltip-border: "#100010"      # 0xF0100010
tooltip-gradient: ["#50000FF", "#5028007F"]   # 0x505000FF→0x5028007F 纵向渐变
tooltip-first-line: "#ffffff"  # 首行白,其余 §7 灰

# 其他
slot-hover: "rgba(255,255,255,.5)"   # 悬停槽高亮 0x80FFFFFF
search-bg: "#000"                    # GuiTextField 黑底
search-border: "#a0a0a0"             # 边框,聚焦变 #fff
disabled-mask: "#66111111"           # 断电/禁用遮罩(AE2)
progress-track: "#4a4a4a"            # 熔炉进度条底
progress-fill: "#7fd47f"
```

## typography

```yaml
base:     { height: 8, shadow: "+1px", family: "等宽/点阵感,原型用 Courier New" }
ascii:    "可变宽 charWidth 表"
cjk:      "renderUnicodeChar 点阵;中文宽度只能 getStringWidth 实测,排版断言须实测"
overflow: "renderScaledText(GL 横向缩放)兜底,不换行不省略"
```

## 禁则(游戏内做不到的效果不许进原型)

无 border-radius 圆角 · 无 font-weight 粗体(MC 无粗体) · 无 text-shadow(白字 1px 阴影除外) · 无字距 letter-spacing · 无 box-shadow 投影滤镜 · 不用浏览器原生滚动条(自绘 12×15 滚动条) · 嵌入宿主页面(Miracle/miniui)时禁用通配符选择器与全局 reset,样式一律显式类名(独立静态原型页除外)。

## 渲染顺序(GuiContainer.drawScreen,写 HTML 时 DOM 层序照此)

暗化背景 → 背景贴图(未平移,guiLeft/guiTop 原点) → 按钮 → 槽+悬停高亮 → 前景文字(平移后)。

## 版本差异(实物实证:1.7.10 / 1.12.2 / 1.20.1 官方 client.jar 解包,2026-11-09)

**资源层三版本同规格**:widgets.png、icons.png 及全部容器贴图(crafting_table/furnace/generic_54/inventory/creative tabs)均为 256×256 画布——本文件的像素网格、tokens 与 mcgui.html 规格跨版本通用。

| 层 | 1.7.10 | 1.12.2 | 1.20.1 |
| --- | --- | --- | --- |
| GUI 贴图 | widgets/icons/container 全 256×256 | 同左(文件名/组织一致) | 同左(新增 bundle/cartography 等新容器贴图;advancements 拆子目录;尚未 sprites 化) |
| 字体 | textures/font/ascii.png 位图 + unicode_page_* | 同左 | ascii.png 仍在,**新增 font/default.json**(JSON provider 链:default→ascii + unifont) |
| 绘制 API | drawTexturedModalRect + 裸 GL11 + Tessellator | 同名 API + GlStateManager(近亲,写法几乎照搬) | GuiGraphics.blit + RenderSystem/shader(断代:无 immediate GL) |
| 事件 | mouseClicked(III)V 等 | 基本同 1.7 | 签名带 double 坐标/modifiers,render(GuiGraphics,…),initGui→addRenderableWidget |

API 层为通识级描述,真翻译前以对应版本源码/yarn 映射核验(mc1710 的 javap 纪律同理)。翻译增量见 [translate.md](translate.md)(1.7.10)、[translate-1.12.md](translate-1.12.md)、[translate-1.20.md](translate-1.20.md)。

## 表单控件规格(R1 实战沉淀)

原版只有按钮/槽位/tooltip 的现成材质,**输入框/勾选框需按同语言自绘**,规格如下(全部实测):

```yaml
# 输入框 = GuiTextField(黑底已有规格): 默认边 #a0a0a0 / 聚焦 #fff / 错误 #ffa8a8
# 勾选框: 自绘 18px 方块, 默认黑底+#a0a0a0 边, 选中绿底 #7fd47f + 深绿勾 #0f3d0f, 聚焦白边
# 单选按钮组: widgets 按钮三态复用, 选中态 = 悬停蓝紫渐变 + 黄字

# 浅底文本色谱(#c6c6c6 面板上, 黑底语境色不可直接用):
text-on-panel:    "#404040"       # 正文/数字
muted-on-panel:   "#373737"       # 次要说明
error-on-panel:   "#8f2f24"       # 错误文案(#c64545 太亮, 灰底 3.4:1)
link-on-panel:    "#0a5bb5"       # 链接(#1190FF 是黑底语境色, 灰底仅 1.90:1 禁用)
success-deep:     "#0f3d0f"       # 成功勾描边

# 语义/系列扩展色(R2/R3 实战新增, 均为浅底深档):
rank-gold:        "#d4a017"       # 榜单金银铜: #d4a017 / #9aa0a6 / #a2714b
warn-deep:        "#b8860b"       # 警示(WARN 日志/内存阈值边框)
series-death:     "#7fae6a"       # 死亡类型 PVE; PVP=#c64545; 环境=#b0b0b0(需垫槽底)
series-stock:     "#f4d03f"       # 库存/峰值系列黄(黑底黄字语境 #ffffa0 的浅底配对)
grid-line:        "#b5b5b5"       # 图表网格线(面板上最淡)

# 故障态横幅(R11 实战): 面板材质 + 红信号块 18px + 文字 #404040 + retry 按钮(widgets 语言)
# 数据区降透明(如 0.45)+ 禁交互, 表示"数据非实时"; 横幅 role=alert, 重试按钮键盘首个聚焦
# 加载态(R12): 全宽面板 + 进度条(复用 furnace 进度规格)+ mono 状态文字(如 Building terrain… 64%)
#   + 次行说明(拉取什么/超时去向); 操作按钮全部禁用; 超时转断线态(R11 横幅)

# 导航/tabs 当前页高亮配方(浅底, R3 实测): #1190FF 文字放灰面板仅 1.90:1, 禁止单用
tabs-active:      "文字 #0a5bb5 + 3px 底条 #1190FF"   # 双通道: 文字可读 + 品牌蓝装饰
```

规则:游戏内语境色(#1190FF/#ffffa0 等)只服务于黑底/深底;放到浅灰面板前,先验对比度,不可用时按色相取深档并在此表登记。

## 证据

- `~/.agents/skills/mc1710/SKILL.md` §二(GUI 绘制机制,全部源码实证)
- 个人 1.7.10 Mod 项目原型(本地)— 原型 v27,用户拍板的 1:3 换算体系
- 本目录 `mcgui.html` — 原版 GUI 组件 HTML 复刻(按钮/槽位/hotbar/tooltip/HUD/进度条)
- 本目录 [translate.md](translate.md) — HTML 原型→Java GUI 翻译方法(对照表+映射规则,模型照此自行翻译);另附 [translate-1.12.md](translate-1.12.md) 与 [translate-1.20.md](translate-1.20.md) 版本增量
- 版本差异(1.7.10/1.12.2/1.20.1 官方 client.jar 解包实证:GUI 贴图三版本同规格 256×256;字体 1.20 起 JSON provider 化)见上方「版本差异」节
