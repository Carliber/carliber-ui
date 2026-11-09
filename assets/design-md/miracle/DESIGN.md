---
name: miracle-design
description: Miracle 6.22.2 平台(内部部署实测)的视觉基线。做 Miracle 项目界面时以此为一致性基准:自写页必遵,与 miniui 控件并排时不打架。
source: |
  内部 Miracle 6.22.2 部署环境实测(miniui 皮肤:default + metro-gray,
  含平台定制段;皮肤 CSS 原文件存于本目录,色值可复核)
captured: 2026-11-09
---

# Miracle 平台 DESIGN.md

自写页与 miniui 控件共存的视觉基线。目标只有一个:**新做的页面和平台其他页面像一家**。

## colors

```yaml
# 品牌与交互
primary: "#2779aa"        # 主色:标题/强调/当前态(= miniui default 皮肤 tab-active,AGENTS.md)
focus: "#1190FF"          # 控件焦点/选中文字色(metro-gray skin: textbox-focus/grid-row-selected)
selected-bg: "#E7F4FF"    # 选中行/选中项背景(metro-gray skin)

# 边框
border-control: "#ddd"    # 控件边框(metro-gray skin 全局)
border-card: "#aed0ea"    # 白卡/面板边框(AGENTS.md 三件套;= default skin 边框蓝)
border-btn: "#A9ACB5"     # 按钮边框(metro-gray 禁彩钮规则)

# 中性底
canvas-form: "#F2F2F2"    # 表单页背景(miracle 定制 #form-body)、hover 底、工具条底
header-grid: "#E9E9E9"    # 表格表头底(metro-gray 覆盖值;default 蓝系为 #e4effa)
row-alt: "#F7F7F7"        # 表格斑马纹
row-hover: "#ecedef"      # 表格行 hover
panel-tint: "#e4effa"     # 面板辅底/默认系表头(AGENTS.md「#e4effa 系」)
window-header: "#506077"  # mini-window 弹窗标题条(藏蓝)
icon: "#666"              # 控件图标色

# 语义
success: "#5CB85B"        # 成功(AGENTS.md)
danger: "#D9534F"         # 危险(AGENTS.md)
error-border: "#ffa8a8"   # 校验错误控件边框(metro-gray skin)
required-bg: "mintcream"  # 必填字段底(miracle 定制 .mini-required)
```

## typography

```yaml
body:      { font-family: "Microsoft YaHei", font-size: 12px, line-height: 22px }  # AGENTS.md 正文;miniui 默认行高同
number:    { font-family: Consolas }                                                 # 数字/编码(AGENTS.md)
h1-page:   { font-size: 22px, font-weight: 700, color: "#2779aa" }                   # 顶部大标题(AGENTS.md)
miniui-base: Tahoma, Verdana, 宋体 12px                                              # miniui.css body,平台控件底层
```

## components

```yaml
button:   { height: 26px, border-radius: 3px, bg: white, border: "#A9ACB5" }  # miniui.css+skin;彩钮(info/warning)已被平台禁用
card:     { bg: "#fff", border: "1px solid #aed0ea", radius: 4px, shadow: true }  # 白卡三件套(AGENTS.md)
grid:
  cell-padding: "5-6px 上下"      # default 5px / metro-gray 6px
  header-bg: "#E9E9E9"
  zebra: "#F7F7F7"
  row-selected: { color: "#1190FF", bg: "#E7F4FF" }
panel:    { toolbar-bg: "#F2F2F2", border: "#ddd" }
fieldset: { bg: white, border: "1px solid #ddd", legend-mark: "竖线 | #1190FF 加粗" }  # field-ul + legend-icon(miracle 定制)
```

## 平台约束(做界面前先读,与 miracle6/miniui 技能衔接)

1. **交互控件一律 miniui**(select/input/table/datepicker…不自绘);meta.jsp 已引全套。降级顺序:元数据页 → 平台在线配置(含 /mf/metadata/style.do 下拉取数)→ miniui 直改 → 自写页。
2. **禁全局 reset 和通配符选择器**——会打掉 miniui 皮肤。
3. 自写页布局基准:顶部大标题(22px/700/#2779aa)→ 工具条/查询区 → 白卡内容区;面板辅底 #e4effa 系。
4. 展示类页面(四色图/告知卡等)部门筛选走 mini-combobox 两级联动 + 平台样式管理取数,默认定位登录人部门。
5. mini 控件实例化晚于 DOMContentLoaded:轮询等 `mini.get(id)` 可用再 setValue。
6. 旧页 sbgl 系无体系,不算基准;新页必遵本基线,旧页改造向它看齐。

## 证据

- `miniui_themes_default_miniui.css` / `miniui_themes_default_skin.css` / `miniui_themes_metro-gray_skin.css` — 实测环境加载的皮肤原文件(metro-gray 为当前生效,末尾含平台定制段;2026-11-09 抓取)
- 另有内部环境的风向基准原文与登录截图,因含内部信息不入公开仓库,仅在本地使用时参照
