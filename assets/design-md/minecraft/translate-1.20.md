# HTML 原型 → MC 1.20.1 Java GUI 翻译方法(增量)

返回 [translate.md](translate.md)。1.20.1 与 1.7.10 断代:渲染管线换了(无 immediate GL),但**像素规格/贴图/层次概念完全不变**——对照表先行、层次照 DOM、一个数值都不自己定的纪律照旧。本表 API 名为通识级路线图,写码前逐个以 1.20.1 源码/yarn 映射核验。

## 与 1.7.10 的核心差异

| 1.7.10 | 1.20.1 |
|---|---|
| `drawTexturedModalRect(x,y,u,v,w,h)`(256×256 隐含) | `GuiGraphics.blit(ResourceLocation, x, y, u, v, w, h, texW, texH)`——**贴图尺寸显式传**,不再限 256(资源层 widgets/icons 仍 256×256,实证) |
| 裸 GL11 / GlStateManager | `RenderSystem`(enableBlend/setShaderColor 等)+ 内置 shader;**不再手写 Tessellator 顶点**,高级自绘才碰 BufferBuilder |
| `drawRect` / `drawGradientRect` | `GuiGraphics.fill(...)` / `fillGradient(...)` |
| `fontRenderer.drawString(s,x,y,color,shadow)` | `GuiGraphics.drawString(font, Component/String, x, y, color, shadow)`;文本用 `Component` 而非裸串 |
| `drawScreen(int,int,float)` | `render(GuiGraphics guiGraphics, int mouseX, int mouseY, float partialTick)`——GuiGraphics 由框架传入,别自建 |
| `initGui` + `buttonList.add` | `init()` + `addRenderableWidget(widget)`;按钮为 `Button.builder(...).bounds(x,y,w,h).build()`,**bounds 显式给宽高** |
| `actionPerformed(GuiButton)` | 按钮构造时传 `onPress` 回调;其他控件实现 `GuiEventListener` |
| `mouseClicked(III)` | `mouseClicked(double,double,int)`;坐标全 double |
| 容器 GuiContainer + inventorySlots | `AbstractContainerScreen<T extends AbstractContainerMenu>` + `getMenu()`;槽位 hover 高亮/tooltip 框架已有(`renderTooltip`) |
| GL 平移(translate) | 不手动 GL 平移,GuiGraphics 的 blit/fill/drawString 都带最终坐标;FG 层坐标 = guiLeft/guiTop + 面板内坐标,直接算 |
| 贴图 ResourceLocation("textures/gui/x.png") | 同左;1.20.1 尚未 sprites 化(实证),自定义贴图放同名结构即可 |

## 保持不变的(实证)

- 像素网格:槽 18×18、容器 176×166、按钮 200×20、字高 8、边距 8(DESIGN.md 版本差异节)
- 渲染层次顺序(暗化→背景→控件→槽/高亮→文字/tooltip)
- 悬停槽高亮、tooltip 渐变的视觉规格
- mcgui.html / translate.md 的对照表流程与映射规则的"左侧"(HTML 侧)

## 翻译步骤

照 translate.md 六步走;对照表的"绘制方式"列按上表替换,重点核对:
1. 每处 `drawTexturedModalRect` → `blit` 时 texW/texH 是否传对(自定义贴图尺寸自由,不再隐含 256)
2. 文本全部转 `Component`(`Component.literal(...)`),颜色与阴影参数位置
3. 事件坐标 double 化、回调式按钮
4. 动效:1.20 无 CSS 过渡同理,每帧重算;渲染在 render() 内,不囤积 GL 状态
