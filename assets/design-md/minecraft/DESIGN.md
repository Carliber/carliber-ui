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

## 证据

- `~/.agents/skills/mc1710/SKILL.md` §二(GUI 绘制机制,全部源码实证)
- 个人 1.7.10 Mod 项目原型(本地)— 原型 v27,用户拍板的 1:3 换算体系
- 本目录 `mcgui.html` — 原版 GUI 组件 HTML 复刻(按钮/槽位/hotbar/tooltip/HUD/进度条)
- 本目录 [translate.md](translate.md) — HTML 原型→Java GUI 翻译方法(对照表+映射规则,模型照此自行翻译)
