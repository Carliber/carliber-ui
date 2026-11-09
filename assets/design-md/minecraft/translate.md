# HTML 原型 → MC 1.7.10 Java GUI 翻译方法

返回 [DESIGN.md](DESIGN.md)。让模型照此把 HTML 原型(如 [mcgui.html](mcgui.html)、terminal.html)逐元素翻译成 GuiContainer/GuiScreen 子类。规矩来自 mc1710 技能 §六(用户定调):**原型 = 唯一规格文档,CSS 值 ÷3 = 游戏 GUI 坐标,一个数值都不自己定**。

## 第一步:先出对照表,用户核过再写代码

写 Java 前先产出全量对照表,每行:`元素(选择器) → 原型 CSS 值 → GUI 坐标/色值 → 绘制方式 → 层次序`。原型未定稿不写游戏代码;用户还在改原型时只改原型。

## 映射规则

| HTML 原型 | Java 1.7.10 |
|---|---|
| 面板容器 `.gui`(宽高) | GuiContainer 子类;`xSize = 宽÷3`,`ySize = 高÷3`;`guiLeft=(width-xSize)/2`,`guiTop=(height-ySize)/2` |
| 纯色块/边框 div | `drawRect(x1,y1,x2,y2,color)`(背景层,**未平移**,以 guiLeft/guiTop 为原点加偏移) |
| 渐变按钮 `.vbtn` | 贴图:widgets.png 200×20 段 `drawTexturedModalRect`,u=0、v=46+k×20(k=0常态/1悬停/2禁用);宽不足 200 用左段 u0..w + 右段 u200-w..200 拼接;文字 E0E0E0/FFFFA0(悬)/A0A0A0,字高 8,y=(h-8)/2 |
| 立体外凸边(面板) | 逐边 1px drawRect:上左亮(#ffffff)下右暗(#555555) |
| 立体内凹边(槽) | 方向相反:上左暗(#373737)下右亮(#ffffff),底 #8b8b8b |
| 文本节点 | `fontRenderer.drawString(s, x, y, color, shadow)`;白字带阴影=shadow true(+1px);y 为顶部基线,居中先 `(h-8)/2` |
| CSS `text-shadow` | 仅"白字+1px 黑影"有对应;其余阴影游戏内不存在,原型期就删 |
| tooltip(hover 弹层) | `drawHoveringText`:边 0xF0100010,内 0x505000FF→0x5028007F 渐变,行高 10,首行白余行 §7;画在 FG 层 |
| 槽位 `.cell` hover 白罩 | drawScreen 中当前悬停槽 `drawRect` 0x80FFFFFF(渲染第 4 层);槽与数据绑定用 Slot 子类注册 `inventorySlots` |
| 槽位 grid | 双重循环按 18×18 节奏排;图标 16×16 居中(drawTexturedModalRect 或 item render) |
| 自绘滚动条 `.vbar` | 宽 12/滑块高 15(creative tabs.png 规格);滑块 y = trackY + (track-24)×scroll/max |
| 进度条/箭头 | 贴图段裁剪:熔炉箭头 u176 v14(24×16);填充 = 比例×总宽(宽度参数动态) |
| CSS 过渡/动画 | 游戏 GUI 无 CSS 式过渡;动效=每帧重算坐标/宽度,无 easing 就线性 |

## 坐标换算细则

- 一切 px **÷3 取整**;字号 24px CSS = 8 GUI = FontRenderer 实际字高。
- 中文宽度**只能 `fontRenderer.getStringWidth` 实测**,不许按 CSS 字宽推;超宽用 renderScaledText(Mekanism 式)缩放兜底,不换行。
- 两套坐标:背景层(贴图/drawRect,加 guiLeft/guiTop)与 FG 层(已 `translate(guiLeft,guiTop)`,文字/tooltip 直接用面板内坐标)。对照表里标清每个元素属于哪层。

## 层次与生命周期(DOM 树序 → drawScreen 调用序)

1. `drawDefaultBackground` 暗化(对应原型页黑底 demo 区)
2. `drawGuiContainerBackgroundLayer`:背景贴图、静态色块、进度条
3. `super.drawScreen`:按钮(在 `initGui` 里 `buttonList.add`,事件走 `actionPerformed`)
4. 槽渲染 + 悬停高亮
5. `drawGuiContainerForegroundLayer`(已平移):标题、动态文字、tooltip

自绘交互控件(滚动条/rail 按钮组)在 `mouseClicked`/`mouseMovedOrUp` 里命中测试,不用 buttonList。

## 写码红线(mc1710 技能摘录)

- **从零写新类**,不在旧类上缝补(缝补一次坏一处);结构顺序照 DOM 树。
- API 名以 `javap forgeBin` 为准,不凭记忆;`-source 1.6` 语法(无钻石操作符/多 catch/数字下划线)。
- 游戏内做不到的效果(圆角/粗体/字距/投影滤镜)原型期删除,不翻译。

## 自检清单

- [ ] 每个原型元素在对照表有一行,每个 Java 数值能反推回"CSS÷3"
- [ ] 中文行有"待实测 getStringWidth"标注或已实测
- [ ] 无圆角/粗体/text-shadow(白字阴影除外)/浏览器滚动条残留
- [ ] 验证走调试桥(/screenshot /clickAt /switchGui)+日志,等待 ≤5s 一轮
