# WPF 写法要点

本篇说明如何在 Windows 桌面应用（WPF）中使用 wuwa-ui。

`assets/wpf/WuwaControls.xaml` 已在 WWisnotOK 0.1.5 之后的界面中实测：深浅两套主题，100%、150%、200% 缩放，1100×720 最小窗口。

## 接入

1. 把 `assets/wpf/WuwaControls.xaml` 复制进项目，在 `App.xaml` 中合并：

   ```xml
   <Application.Resources>
     <ResourceDictionary>
       <ResourceDictionary.MergedDictionaries>
         <ResourceDictionary Source="UI/WuwaControls.xaml"/>
       </ResourceDictionary.MergedDictionaries>
     </ResourceDictionary>
   </Application.Resources>
   ```

2. 主窗口是 `Window` 的子类，隐式样式不会自动生效，必须写 `Style="{StaticResource {x:Type Window}}"`。
3. 颜色一律用 `DynamicResource` 引用画刷。写成 `StaticResource` 或硬编码色值后，切换主题不会生效。

## 切换主题

字典里的画刷是深色默认值。切换主题时，在代码里按同名键替换 `Application.Current.Resources` 中的画刷：

```csharp
var colors = light ? Light : Dark; // 两张表的键与下表“画刷”列一致
foreach (var (name, color) in colors)
{
    var brush = new SolidColorBrush((Color)ColorConverter.ConvertFromString(color));
    brush.Freeze();
    Application.Current.Resources[name + "Brush"] = brush;
}
```

| 画刷 | 令牌 | 深色 | 浅色 |
| --- | --- | --- | --- |
| `BackgroundBrush` | `bg` | `#000000` | `#F7F5F0` |
| `SidebarBrush` | 桌面专用 | `#0B0B0B` | `#F0ECE4` |
| `SurfaceBrush` | `surface` 叠在底色上 | `#121212` | `#FFFFFF` |
| `SurfaceSolidBrush` | `surfaceSolid` | `#1A1A1A` | `#FFFFFF` |
| `RaisedBrush` / `OnRaisedBrush` | `surfaceRaised` / `onRaised` | `#2A2A2A` / `#E1E1E1` | `#242220` / `#FFFFFF` |
| `InputBrush` | `input` | `#121212` | `#FFFFFF` |
| `TextBrush` | `silver` | `#E1E1E1` | `#242220` |
| `SandBrush` | `sand` | `#D3CBB8` | `#70685C` |
| `MutedBrush` | `textMuted` | `#989898` | `#6E665A` |
| `GoldBrush` | `gold` | `#C4AC7D` | `#B5986A` |
| `GoldBorderBrush` | `goldBorder` | `#C9AC67` | `#C4AC7D` |
| `TitleBrush` | `goldTitle` | `#DAB67D` | `#8E7340` |
| `GoldTextBrush` | `goldText` | `#C4AC7D` | `#7A6233` |
| `OnGoldBrush` | `onGold` | `#16130E` | `#16130E` |
| `LineBrush` / `SoftLineBrush` | `borderLine` / `borderSoft` | `#505050` / `#2E2E2E` | `#D2CAB8` / `#E7E2D7` |
| `SelectedBrush` | `selected` | `#1FC4AC7D` | `#29B5986A` |
| `HoverBrush` | 桌面专用 | `#0FFFFFFF` | `#0A3C2D14` |
| `OkBrush` / `WarnBrush` / `DangerBrush` | `ok` / `warn` / `danger` | `#9DBB86` / `#D9A55B` / `#E07A6E` | `#4E7A36` / `#8C5B12` / `#B0453A` |

WPF 的颜色写法是 `#AARRGGBB`，透明度在前。`rgba(196, 172, 125, 0.12)` 写成 `#1FC4AC7D`。

## 样式清单

| 键 | 类型 | 用途 |
| --- | --- | --- |
| 隐式 `Button` | 细线按钮 | 普通操作：刷新、选择文件。悬停时变为流金 |
| `PrimaryButton` | 流金实底按钮 | 主操作。同一区域只放一个 |
| `DarkButton` | 炭黑金边按钮 | 次要操作：导入、查看记录 |
| `DangerButton` | 危险细线按钮 | 删除等不可恢复的操作 |
| `TextButton` | 无边框文字按钮 | 表格行内操作、批量操作 |
| `Segment` | `RadioButton` | 分段选择，如深色、浅色、跟随系统 |
| `NavItem` | `ListBoxItem` | 侧栏导航，只写中文 |
| `Banner` | `ContentControl` | 左金条卡片，放当前最重要的状态 |
| `Eyebrow` / `SectionTitle` | `TextBlock` | 页头英文眉标与中文段落标题 |
| `MutedText` | `TextBlock` | 说明文字 |
| `FocusRing` | `FocusVisualStyle` | 键盘焦点的 1px 金框 |

隐式样式还覆盖 `TextBox`、`CheckBox`、`ComboBox`、`ListBox`、`DataGrid`、`ToolTip` 与 `ScrollBar`。

## 段落标题与页面结构

页面用“中文段落标题 + 1px 细线”分段，不把每段包进实底大框。英文眉标每页只在页头放一个：

```csharp
static StackPanel Head(string title)
{
    var line = new Border { Height = 1, Margin = new Thickness(0, 12, 0, 16) };
    line.SetResourceReference(Border.BackgroundProperty, "LineBrush");
    var panel = new StackPanel();
    panel.Children.Add(new TextBlock { Text = title, Style = (Style)Application.Current.FindResource("SectionTitle") });
    panel.Children.Add(line);
    return panel;
}
```

工具台布局：侧栏宽 228，右侧页头为眉标、30px 流金标题和说明，连接状态放在页头右侧。只有当前最重要的状态区用 `Banner`。段落之间留 34px。

## 字号

| 文字 | 字号 |
| --- | --- |
| 正文（窗口默认） | 14 |
| 说明、表头、表单标签、状态栏 | 13 |
| 导航项 | 15 |
| 段落标题 | 17 |
| 页面标题 | 30 |
| 页头眉标 | 13，不得小于 12 |

信息放不下时调整布局或折行，不缩小字号。导航项不加英文副标题，品牌名下不加标语。

## 几何换算

CSS 与 WPF 的圆角顺序都是左上、右上、右下、左下。

| 部件 | CSS | WPF `CornerRadius` |
| --- | --- | --- |
| 卡片 | `16px 0` | `16,0,16,0` |
| 流金按钮 | `0 10px` | `0,10,0,10` |
| 细线按钮、输入框 | `0 8px` | `0,8,0,8` |
| 炭黑按钮 | `18px 0` | `14,0,14,0` |

官网炭黑按钮高约 48px，圆角 18px。桌面按钮高约 34px，圆角按比例缩为 14。

`DarkButton` 的 3px 金边写成 `BorderThickness="0,0,3,3"`。内边距为 `22,8,19,5`，减去边框后与细线按钮等高。

## 已验证的坑

- **字距**：WPF 的 `TextBlock` 没有字距属性。眉标在字母之间插入细空格 U+2009，约等于 0.2em：

  ```csharp
  static string Spaced(string text) => string.Join(' ', text.ToUpperInvariant().AsEnumerable());
  ```

- **字体**：英文眉标用 Bahnschrift，正文用 Microsoft YaHei UI。窗口样式设 `TextOptions.TextFormattingMode="Display"`，100% 缩放下的中文更清晰。
- **分边框颜色**：一个 `Border` 只能有一种边框色。左金条加上下细线要嵌套两层 `Border`，见 `Banner` 模板。
- **DataGrid 选中文字变白**：系统主题的 `DataGridCell` 选中触发器会把文字改成高亮色。隐式 `DataGridCell` 样式必须显式设 `Foreground` 与 `Background`，样式的设置值优先于主题触发器。
- **选中行金条**：`DataGridRow` 默认模板会使用 `BorderThickness`。设 `3,0,0,0` 透明边框，选中时换成 `GoldBrush`。
- **ComboBox 显示对象名**：自定义模板的 `ContentPresenter` 必须绑定 `SelectionBoxItemTemplate` 与 `ItemTemplateSelector`，否则 `DisplayMemberPath` 不生效。
- **滚动条滑块**：长列表的滑块会被压到系统最小长度，约 8px。滑块四周都留边距时只剩 2px，看起来像短划线。只在滑块两侧留边距，横向滚动条用触发器换成上下边距，见 `ScrollBar` 模板。
- **TextBox 模板**：只需保留名为 `PART_ContentHost` 的 `ScrollViewer`。`TextBox` 会把 `Padding` 与滚动条设置自动传给这个 `ScrollViewer`。
- **标题栏**：标题栏由 Windows 绘制。用 DWM 属性 20（深色模式）和 35（标题栏颜色）让标题栏跟随主题，在 `Window.Loaded` 的类处理器中对每个窗口设置：

  ```csharp
  [DllImport("dwmapi.dll")] static extern int DwmSetWindowAttribute(IntPtr hwnd, int attribute, ref int value, int size);
  var dark = isDark ? 1 : 0;
  DwmSetWindowAttribute(hwnd, 20, ref dark, sizeof(int));
  var caption = background.R | background.G << 8 | background.B << 16; // COLORREF 为 0x00BBGGRR
  DwmSetWindowAttribute(hwnd, 35, ref caption, sizeof(int));
  ```

  属性 35 需要 Windows 11。Windows 10 上调用返回错误码，界面不受影响。

## 截图检查

- `RenderTargetBitmap` 只截窗口内容，截不到标题栏。检查标题栏要用 `PrintWindow`，标志位取 2（`PW_RENDERFULLCONTENT`）。
- 150% 与 200% 截图可用 `RenderTargetBitmap` 按 144、192 DPI 渲染同一布局。
- 必须检查最小窗口尺寸下表格的操作列是否完整显示。
