---
name: wuwa-ui
description: 'Build UI in the Wuthering Waves (鸣潮) official-website look for web pages and Windows desktop apps (WPF): obsidian black, matte champagne gold #C4AC7D, diagonal rounded corners, asymmetric gold edges, one uppercase eyebrow per page over Chinese titles, 1px hairlines, plain and spacious layouts without decorative small text, dark and light themes. Use for dashboards, tool apps, settings pages, data tables, landing and content pages, or when a user asks for a 鸣潮 / wuwa style, 流金 / 玄黑 UI, or to restyle a WPF or HTML front end.'
---

# 鸣潮官网风格 UI（wuwa-ui）

本 skill 用于制作《鸣潮》官网风格的网页与 Windows 桌面界面。全部数值来自官网样式表实测，记录在 `references/research.md`。本 skill 不包含游戏官方素材、字体、标志与立绘。

## 六条核心法则

1. **玄黑底与哑光流金**：深色主题底色必须为 `#000000`，唯一强调色必须为流金 `#C4AC7D`（浅色主题 `#B5986A`）。强调色只能表示当前位置、主操作和关键数字。
2. **对角圆角**：按钮、卡片与输入框必须一组对角为圆弧、另一组对角为直角。卡片与炭黑按钮的圆弧在左上与右下（`16px 0`、`18px 0`）；流金按钮、输入框与标签的圆弧在右上与左下（`0 10px`）。不得使用 45° 切角、胶囊形和四角等圆角。
3. **按钮分层级**：主操作用流金实底，同一区域只能有一个。次要操作用炭黑底加底部与右侧 3px 金边。普通操作用 1px 中性细线，悬停时才变为流金。重点卡片用左侧 4px 金条加上下 1px 细线。
4. **标题与字号**：页面标题由一个英文大写眉标和中文粗体标题组成，段落标题只写中文。眉标只能写真实的业务名词。不得用小字做装饰，包括导航英文副标题、装饰标语和徽标小字。正文必须为 14px，说明、表头与表单标签不得小于 13px，眉标不得小于 12px。
5. **简约大气**：用留白和 1px 细线分区。不得使用弥漫投影、外发光、渐变背景，也不宜把每个区块都包进实底大框。
6. **短而克制的动效**：悬停过渡宜在 200 毫秒内，单次入场不得超过 520 毫秒，序列总长不得超过 1000 毫秒。系统开启减少动态效果时必须停用动画。

## 第一步：选页面类型

1. **工具台**：桌面应用、控制台与后台。左侧侧栏导航，右侧为页头加内容区。状态用圆点加文字，操作按层级排列。
2. **阅读页**：详情、文档与设置。单栏，常规字重，行高 1.6，用细线分组，表单标签在上、说明在下。
3. **展示页**：首页与资讯。顶部导航，大号流金标题，可加 `assets/waves/` 的淡雅波纹。

## 第二步：定变体

制作前必须阅读 `references/variation.md`，确定主题（深色、浅色或跟随系统）、密度和动效强度。强调色不能替换为流金以外的颜色。

## 第三步：按平台编写

- **网页**：直接引用 `assets/wuwa.css` 与 `assets/fx.js`，组件写法参照 `templates/specimen.html`。
- **Windows 桌面（WPF）**：必须阅读 `references/desktop-wpf.md`，资源与控件样式从 `assets/wpf/WuwaControls.xaml` 开始改。
- **其他平台**：颜色、几何、字号与动效数值必须取自 `assets/tokens.json`。

## 第四步：检查

1. 界面文案必须参照 `references/glossary.md`，设计术语不得出现在用户界面中。
2. 改动配色后必须运行 `node scripts/check-contrast.mjs`，结果必须全部通过：正文对比度不低于 4.5:1，24px 以上标题不低于 3:1。
3. 交付前必须对照 `references/rules.md` 的“做与不做”逐条检查，并在深色、浅色两种主题下各看一遍成品截图。桌面应用还必须检查 150% 和 200% 缩放。

## 文件地图

| 路径 | 内容 |
| --- | --- |
| `assets/tokens.json` | 平台无关设计令牌：深浅两套色值、状态色、几何、字号、间距与动效 |
| `assets/wuwa.css` | 网页样式套件：CSS 变量与组件 |
| `assets/fx.js` | 网页交互：主题切换与页签 |
| `assets/wpf/WuwaControls.xaml` | WPF 资源字典：画刷与控件样式 |
| `assets/waves/` | 淡雅波纹 SVG 与生成脚本 |
| `scripts/check-contrast.mjs` | 令牌对比度检查 |
| `templates/terminal.html` | 官网风格资讯页模板 |
| `templates/specimen.html` | 部件样张：按钮、状态、表单、数据表、侧栏导航 |
| `templates/antipatterns.html` | 正反例对照 |
| `references/research.md` | 官网样式表实测记录 |
| `references/rules.md` | 做与不做 |
| `references/tokens.md` | 令牌说明与跨平台换算 |
| `references/variation.md` | 主题、密度与动效变体 |
| `references/glossary.md` | 设计术语与界面文案对照 |
| `references/desktop-wpf.md` | WPF 写法要点 |
