# 设计令牌（Tokens）

本篇记录从《鸣潮》官网样式表中测算得到的唯一定义。

## 1. 颜色规范

### 核心流金色阶（Champagne Gold）
- 主流金 `gold`：`#C4AC7D`。官网按钮、激活滑块与悬停高光主色。
- 边框金 `goldBorder`：`#C9AC67`。边框线与标签边线。
- 标题金 `goldTitle`：`#DAB67D`。页面大标题文字。
- 深暗金 `goldDark`：`#B5986A`。激活态文字次级色。

### 矿物暖砂与银白色阶（Mineral Sand & Silver）
- 暖砂象牙白 `sand`：`#D3CBB8`。副标题与说明文字。
- 银白 `silver`：`#E1E1E1`。未激活导航项与细边框线。
- 浅灰白 `textMuted`：`#989898`。时间戳与技术小标。

### 底板与深炭阶梯（Obsidian & Charcoal）
- 官网纯黑 `bg`：`#000000`。
- 半透黑卡片 `surface`：`rgba(33, 33, 33, 0.5)` 或 `rgba(0, 0, 0, 0.65)`。
- 炭黑按钮底 `buttonBg`：`#2A2A2A` 与 `#3A3434`。
- 细分割线 `borderLine`：`#505050` 与 `#616161`。

## 2. 标志性几何尺寸

- 对角圆角：`border-radius: 16px 0;` 或 `border-radius: 0 10px;`。
- 非对称金边：`border-bottom: 3px solid #C4AC7D; border-right: 3px solid #C4AC7D;`。
- 左侧指示粗边：`border-left: 4px solid #C9AC67;`。
- 底部指示滑块高度：`3px`。

## 3. 字体配置

- 西文大标题与数字：优先使用 `Novecento Wide`，网页端回退到 `Cinzel`、`Saira` 或 `Barlow Semi Condensed`。
- 中文标题与正文：`Noto Sans SC`（思源黑体）与系统黑体。
