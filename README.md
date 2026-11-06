# wuwa-ui

一个让 AI 编写出《鸣潮》联觉终端风格界面的 Agent Skill。

界面包含渊黑碳底、共鸣金高亮、声学切角与示波器波形指标。

本仓库不包含任何游戏官方素材。

## 六条核心法则

1. **唯一主强调色**：默认使用共鸣金 `#E5B842`，用于当前位置、可点击内容和核心遥测数据。
2. **切角代表可点击**：能按的按钮与标签采用 45° 切角。展示面板保持平角。
3. **双语标题与前缀**：标题采用中英成对，前缀带 `//`。
4. **真实声学数字装饰**：使用真实频率与计数指标，禁止编造假乱码。
5. **细线分区**：使用 1px 细线分区，不使用弥漫性发光与投影。
6. **短硬机械动效**：动效利落平稳，入场时间控制在 1000 毫秒以内。

## 目录结构

```text
wuwa-ui-skill/
├── SKILL.md                  Agent 入口：法则、页面类型、变体与检查清单
├── agents/openai.yaml        Codex 与 AI 平台元数据配置
├── assets/
│   ├── tokens.json           跨端设计令牌（色值、切角、动效曲线）
│   ├── wuwa.css              网页原生样式套件
│   ├── fx.js                 示波器跳动与数字跳变脚本
│   └── waves/                声学波形 SVG 与生成脚本
├── references/
│   ├── research.md           官网与游戏终端调研笔记
│   ├── rules.md              做与不做正反例细则
│   ├── tokens.md             颜色对比度与尺寸定义
│   ├── variation.md          四套预设与六个维度变体
│   └── glossary.md           内部设计术语隔离表
└── templates/
    ├── terminal.html         联觉终端与数据坞控制台模板
    ├── specimen.html         全套部件样张展示页
    └── antipatterns.html     正反例错误对照参考
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
- 控制台模板：`http://localhost:8767/templates/terminal.html`
- 部件样张：`http://localhost:8767/templates/specimen.html`
- 反例对照：`http://localhost:8767/templates/antipatterns.html`

## 声明

本项目与广州库洛科技有限公司无关。项目内不包含任何游戏官方素材、字体、标志与立绘。
