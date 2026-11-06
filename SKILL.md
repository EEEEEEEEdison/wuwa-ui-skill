---
name: wuwa-ui
description: 'Build UI with a Wuthering Waves (鸣潮) acoustic terminal and resonance look on web, mobile, desktop. Deep obsidian carbon, resonance gold accents, soundwave cut corners, uppercase frequency labels, hairline telemetry.'
---

# 鸣潮风味声学终端 UI（wuwa-ui）

本 skill 用于构建《鸣潮》联觉终端风格的界面。本 skill 不使用任何游戏官方版权素材。

## 六条核心法则

1. **唯一主强调色**：默认使用共鸣金 `#E5B842`。强调色只表示当前位置、可点击和核心遥测数据。
2. **切角代表可点击**：能按的按钮与标签必须使用 45° 切角。展示面板保持平角或四角微切角。
3. **双语标题与前缀**：标题必须中英成对，前缀必须使用 `//`。上方为英文大写，下方为中文粗体。
4. **真实声学数字装饰**：装饰必须使用真实数据。包含编号如 `#0142`、频率如 `44.1 kHz`。不得编造无意义的伪科技乱码。
5. **细线分区**：必须使用 1px 细线分区。不得使用弥漫性投影与渐变。
6. **短硬机械动效**：动效必须短硬。单次入场不得超过 520 毫秒，序列总长不得超过 1000 毫秒。系统开启减少动态效果时必须停用动画。

## 第一步：选页面类型

1. **控制台**：用于仪表盘与管理后台。采用深黑底色、遥测数字看板与示波器。
2. **阅读页**：用于详情、文档与设置。采用常规字重与大行高，使用细线分层。
3. **展示页**：用于首页与大屏。采用大号声学字标、背景波纹与入场动效。

## 第二步：定变体

制作前先阅读 `references/variation.md`：
- `spectro`（衍射金）：默认终端风格。
- `glacio`（冷凝青）：高精尖实验监控。
- `havoc`（湮灭紫）：深邃异能调试。
- `laboratory`（实验白）：明亮科研报表。

## 第三步：开发与检查

1. 网页端直接引用 `assets/wuwa.css` 与 `assets/fx.js`。
2. 几何参数与颜色数值必须参照 `assets/tokens.json`。
3. 界面文案必须参照 `references/glossary.md`。内部术语不得直接写在用户界面中。
4. 交付前必须对照 `references/rules.md` 检查。

## 文件地图

| 路径 | 内容 |
| --- | --- |
| `assets/tokens.json` | 平台无关设计令牌：色值、切角与动效参数 |
| `assets/wuwa.css` | 网页样式套件：原生 CSS 变量与组件库 |
| `assets/fx.js` | 交互脚本：示波器跳动与数字跳变 |
| `assets/waves/` | 声学波纹 SVG 与生成脚本 |
| `templates/terminal.html` | 联觉终端参考模板 |
| `templates/specimen.html` | 部件规范全集样张 |
| `templates/antipatterns.html` | 正反例对照参考 |
| `references/` | 详细规范：调研、公理、令牌、变体与术语表 |
