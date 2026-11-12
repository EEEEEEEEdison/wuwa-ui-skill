# wuwa-ui

一个让 AI 写出《鸣潮》官网风格界面的 Agent Skill，适用于网页和 Windows 桌面应用（WPF）。

界面元素包括玄黑底色、哑光流金强调、对角圆角、非对称金边、双语标题与 1px 细线分区。

本 skill 提供深色与浅色两套主题，基础色值全部来自官网样式表实测。

本仓库不包含任何游戏官方素材。

## 六条核心法则

1. **玄黑底与哑光流金**：唯一强调色为流金 `#C4AC7D`，只表示当前位置、主操作和关键数字。
2. **对角圆角**：一组对角为圆弧，另一组对角为直角；不用 45° 切角和胶囊形。
3. **按钮分层级**：主操作用流金实底，次要操作用炭黑底加金边。普通操作用中性细线，悬停才变金。
4. **标题与字号**：每页最多一个英文眉标，段落标题只写中文。不用小字做装饰，正文 14px，说明不小于 13px。
5. **简约大气**：用留白和 1px 细线分区，不用投影、外发光和渐变。
6. **短而克制的动效**：悬停 200 毫秒，入场不超过 520 毫秒，尊重系统的减少动态效果设置。

## 目录结构

```text
wuwa-ui-skill/
├── SKILL.md                    Agent 入口：法则、页面类型、平台与检查清单
├── agents/openai.yaml          Codex 与 AI 平台元数据
├── assets/
│   ├── tokens.json             跨端设计令牌：深浅两套色值、状态色、几何、字号、动效
│   ├── wuwa.css                网页样式套件
│   ├── fx.js                   网页交互：主题切换与页签
│   ├── wpf/WuwaControls.xaml   WPF 画刷与控件样式
│   └── waves/                  淡雅波纹 SVG 与生成脚本
├── scripts/check-contrast.mjs  令牌对比度检查
├── references/
│   ├── research.md             官网样式表实测记录
│   ├── rules.md                做与不做
│   ├── tokens.md               令牌说明与 CSS、WPF 换算
│   ├── variation.md            主题、密度、布局与动效变体
│   ├── glossary.md             设计术语与界面文案对照
│   └── desktop-wpf.md          WPF 写法要点
└── templates/
    ├── terminal.html           官网风格资讯页
    ├── specimen.html           部件样张
    └── antipatterns.html       正反例对照
```

## 本地预览

在项目根目录下启动静态文件服务器：

```bash
# 使用 Node.js
npx http-server -p 8767

# 或使用 Python
python -m http.server 8767
```

打开浏览器访问：
- 资讯页模板：`http://localhost:8767/templates/terminal.html`
- 部件样张：`http://localhost:8767/templates/specimen.html`
- 正反例对照：`http://localhost:8767/templates/antipatterns.html`

修改配色后运行 `node scripts/check-contrast.mjs` 检查对比度。

## 声明

本项目与广州库洛科技有限公司无关。项目内不包含任何游戏官方素材、字体、标志与立绘。
