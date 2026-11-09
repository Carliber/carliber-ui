# HTML 原型 → MC 1.12.2 Java GUI 翻译方法(增量)

返回 [translate.md](translate.md)。1.12.2 与 1.7.10 是近亲:绘制概念、贴图规格、事件模型几乎一致,按 translate.md 的流程走,以下为增量差异。API 名使用前仍以 MCP 映射/源码核验。

## 与 1.7.10 的差异(增量)

| 1.7.10 | 1.12.2 |
|---|---|
| 裸 GL11 调用(`glEnable(GL_BLEND)` 等) | `GlStateManager` 静态方法包装(`GlStateManager.enableBlend()` 等),语义同,别再裸调 GL |
| Tessellator 直接取 | Tessellator→`BufferBuilder`(`begin`/`pos`/`tex`/`endVertex` 链式),用法同构 |
| `drawTexturedModalRect(u,v,x,y,w,h)` | **签名相同**,内部实现换;256×256 贴图约定不变 |
| `drawDefaultBackground`/`drawCenteredString` | 同名同位 |
| 字体 textures/font/ascii.png | 同左(实物解包实证一致) |

- 控件体系(GuiScreen/GuiButton 200×20/GuiContainer 槽位)完全同构,translate.md 的映射表逐条适用。
- 主要坑在**映射名与混淆差异**(MCP 名在不同版本有小幅漂移),不在绘制方式。
- 贴图资源三版本同规格(DESIGN.md 版本差异节实证),mcgui.html 规格直接可用。

## 翻译步骤

照 translate.md 六步走,仅把"写码红线"里的 javap 对象换成 1.12.2 的映射源;对照表无需改动。
