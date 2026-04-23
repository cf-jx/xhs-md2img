# XHS · Type Studio

> **Markdown, set in type.** 把 Markdown 排成小红书图文的纯前端编辑工坊。

一个零后端的 Next.js Web 应用：左边写 Markdown，右边实时预览多张小红书尺寸卡片，一键切换 12 套视觉主题，批量导出 PNG / ZIP。UI 本身按 editorial 方向雕刻，Claude 官方设计语言——奶油底、赤陶红、Gloock serif 报头、罗马数字章节、杂志 drop-cap 页码。

![Hero Screenshot](docs/hero.png)

---

## ✨ 特性

- **纯前端 SPA**：无需服务端，客户端 `html-to-image` 直出 PNG，部署 Vercel 即可
- **12 套内置主题**：小红书官方红 / Claude 暖棕 / ChatGPT 墨绿 / Notion 极简白 / 杂志黑白 / 终端深色 / 知乎蓝 / IG 渐变 / 苹果备忘录 / 奶油胶 / 复古牛皮纸 / 公众号极简
- **4 档小红书尺寸**：竖版 3:4 (1080×1440) · 4:5 (1080×1350) · 正方形 1:1 · 故事 9:16
- **智能分页**：`---` / `<!-- pagebreak -->` 手动分页 + 按尺寸字符预算自动溢出分页（封面不拆、标题不落单、代码块保完整）
- **导出 2× 清晰度**：`pixelRatio: 2`，默认 3:4 出 2160×2880 PNG，可直接上传小红书
- **批量 ZIP**：JSZip 纯浏览器打包，文件名 `xhs-{theme}-01.png` 递增
- **Google Fonts 嵌入**：预 fetch Fonts CSS 作为 `fontEmbedCSS` 传入，导出中文字体无丢失、无 CORS warning
- **页脚自定义**：小红书号 · 页码 · 自定义水印
- **Editorial UI**：Gloock display serif · Public Sans body · OKLCH 配色 · 罗马数字章节 · 杂志 drop-cap 页码 · 纸张阴影 · stagger rise-in 动画

---

## 🏗 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js 15（App Router） |
| 语言 | TypeScript 5.7 |
| 样式 | Tailwind CSS 3.4 + CSS 变量（主题 token 层）|
| MD 解析 | `react-markdown` 9 + `remark-gfm` 4 + `remark-breaks` 4 |
| 代码高亮 | `rehype-highlight` + `highlight.js` |
| 图片导出 | `html-to-image` |
| 批量打包 | `jszip` + `file-saver` |
| 编辑器 | `@uiw/react-codemirror` + `@codemirror/lang-markdown`，自定义 Claude 配色 |
| 状态 | Zustand |
| 字体 | Gloock（display） · Public Sans · Noto Sans SC · Noto Serif SC · JetBrains Mono |

**不引入**：后端 API、Playwright、数据库、登录体系。

---

## 🚀 快速开始

```bash
# 1. 安装依赖（pnpm / npm / yarn 任选）
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 浏览器打开
open http://localhost:3000
```

构建生产版本：

```bash
pnpm build
pnpm start
```

---

## 📁 目录结构

```
xhs-md2img/
├── app/
│   ├── layout.tsx              # 全局字体 + metadata
│   ├── page.tsx                # 三栏主页面
│   └── globals.css             # OKLCH 色彩、editorial primitives、CodeMirror 覆盖
├── components/
│   ├── editor/
│   │   ├── TopBar.tsx          # 顶栏：logo + manifesto + 导出按钮
│   │   ├── Sidebar.tsx         # 左侧控件：主题 · 尺寸 · 缩放 · 页脚
│   │   ├── MdEditor.tsx        # CodeMirror 编辑器
│   │   └── PreviewStack.tsx    # 右侧预览区 + drop-cap 页码
│   └── render/
│       ├── CardFrame.tsx       # 卡片容器 + CSS var 注入
│       ├── MarkdownCard.tsx    # react-markdown + 主题 token 映射
│       └── FooterBadge.tsx     # 页脚：小红书号 + 水印 + 页码
├── lib/
│   ├── themes/
│   │   ├── types.ts            # Theme / SizePreset 类型
│   │   ├── registry.ts         # 12 套主题注册
│   │   └── presets/            # 单主题 preset 文件
│   ├── markdown/
│   │   └── paginate.ts         # 显式 + 自动分页
│   ├── export/
│   │   ├── toPng.ts            # html-to-image + ZIP
│   │   └── fonts.ts            # Google Fonts CSS 预 fetch
│   ├── editor/
│   │   └── cmClaudeTheme.ts    # CodeMirror Claude 配色
│   └── store/
│       └── useEditorStore.ts   # Zustand 状态
└── .impeccable.md              # Editorial design context（UI 设计守则）
```

---

## ✍️ 使用指南

### 1. 写 Markdown

左侧 CodeMirror 编辑器支持完整 CommonMark + GFM（表格、任务列表、删除线、自动链接）。

### 2. 手动分页

用 `---` 或 `<!-- pagebreak -->` 切分卡片：

```markdown
# 封面标题

> 一句副标题

---

## 第一卡内容

- 重点 1
- 重点 2

---

## 第二卡内容
...
```

### 3. 自动分页

单个 chunk 超过该尺寸的字符预算（3:4 ≈ 420 字，正方形 ≈ 320 字）时，会按空行自动二次切分。规则：

- 封面卡不会被自动拆分
- 段落、列表、代码块作为原子块，不会被半切
- 标题不单独成页——总跟着下一段

### 4. 切换主题

Sidebar `I · Theme` 中选择任意一套，预览即时更新。每套主题包含：

- `tokens`：背景、墨色、强调色、分隔、代码块、引用块等语义色
- `typography`：标题字体、正文字体、字号、行高、字距
- `cover`：封面装饰模式（dark-radial · gradient · terminal · paper 等）

### 5. 选择尺寸

Sidebar `II · Format` 四档：

| ID | 标签 | 尺寸 | 推荐场景 |
|---|---|---|---|
| `xhs-3-4` | 小红书竖版 3:4 | 1080×1440 | **默认**，主流信息流 |
| `xhs-4-5` | 小红书 4:5 | 1080×1350 | 信息流最大展示 |
| `square` | 正方形 1:1 | 1080×1080 | 封面通用 |
| `story-9-16` | 故事 9:16 | 1080×1920 | 竖屏故事 |

### 6. 页脚配置

Sidebar `IV · Colophon`：

- **显示页脚**：全局开关
- **显示页码**：右下角 `1 / 5`
- **小红书号**：左下角 `@handle`
- **水印**：中间自定义文字

### 7. 导出

- **导出首图**：当前第一张卡片 → `xhs-{theme}-01.png`
- **导出全部**：所有卡片打包 → `xhs-{theme}-{timestamp}.zip`

导出的 PNG 分辨率为 2× 像素（1080×1440 → 2160×2880），字体通过 `fontEmbedCSS` 嵌入，可直接上传小红书。

---

## 🎨 主题一览

| ID | 中文名 | 视觉关键词 | 主色 |
|---|---|---|---|
| `xhs-official` | 小红书官方红 | 奶油底 + 小红书红 | `#FF2442` on `#FFF5F0` |
| `claude` | Claude 暖棕 | Tan · Terra · Charcoal 三色暖调 | `#D4A27F` on `#1F1915` |
| `chatgpt` | ChatGPT 墨绿 | 深灰底 + OpenAI 绿 | `#10A37F` on `#202123` |
| `notion-minimal` | Notion 极简白 | 纯白 + 黑字 + 细灰线 | `#37352F` on `#FFFFFF` |
| `magazine-mono` | 杂志黑白 | 大衬线标题 · 强黑白对比 | `#000` on `#FAFAFA` |
| `dark-terminal` | 终端深色 | 黑底霓虹绿 · 等宽字体 | `#00FF9C` on `#0A0E14` |
| `zhihu-blue` | 知乎蓝 | 白底 + 知乎品牌蓝 | `#056DE8` on `#FFF` |
| `instagram-gradient` | IG 渐变 | 紫粉橙渐变封面 | `linear-gradient(#833AB4,#FD1D1D,#FCB045)` |
| `apple-notes` | 苹果备忘录 | 米黄笺纸 + 横线手账感 | `#FFCC00` on `#FFF9E6` |
| `cream-glue` | 奶油胶 | 马卡龙粉 + 牛仔蓝双色块 | `#FF6B9D` + `#B8D0FF` |
| `retro-paper` | 复古牛皮纸 | 牛皮纸 + 手写衬线 | `#B8441F` on `#E8DCC0` |
| `wechat-official` | 公众号极简 | 白底 + 灰文 + 细分隔 | `#07C160` on `#FFFFFF` |

---

## 🛠 添加自定义主题

在 `lib/themes/presets/` 下新建一个 `.ts` 文件：

```ts
import type { Theme } from '../types';

export const myTheme: Theme = {
  id: 'my-theme',
  name: '我的主题',
  tagline: '一句话描述',
  cover: 'cream-minimal',
  previewBadge: '#XXXXXX',
  tokens: {
    bg: '#...',
    surface: '#...',
    ink: '#...',
    muted: '#...',
    accent: '#...',
    accentSoft: '#...',
    divider: '#...',
    codeBg: '#...',
    codeInk: '#...',
    coverBg: '#...',
    coverInk: '#...',
    quoteBg: '#...',
    quoteBorder: '#...',
  },
  typography: {
    titleFamily: '"Your Display Font", serif',
    bodyFamily: '"Your Body Font", sans-serif',
    titleWeight: 700,
    bodyWeight: 400,
    h1Size: 72,
    h2Size: 48,
    h3Size: 32,
    bodySize: 28,
    lineHeight: 1.7,
    letterSpacing: '-0.5px',
  },
};
```

然后在 `lib/themes/registry.ts` 里导入并加入 `THEMES` 数组。

---

## 📐 UI 设计守则

本项目的 UI chrome 遵循 `.impeccable.md` 中定义的 editorial direction：

- **视觉：温暖（warm） · 克制（restrained） · 编辑部感（editorial）**
- **字体**：Gloock 做 display，Public Sans 做 body，避开 Inter/Fraunces/Newsreader 等 AI reflex fonts
- **色彩**：OKLCH 中性色朝 hue 70 暖黄棕微偏，60-30-10 权重（paper 主 · ink 次 · terra 唯一强调）
- **布局**：破对称，罗马数字章节 + eyebrow caption，不做 rounded icon + heading 的卡片墙
- **绝对禁忌**：border-left 彩条 · 渐变文字 · glassmorphism 装饰 · AI 紫蓝配色

---

## 🗺 路线图

- [ ] 首屏空状态 empty state（引导 MD 语法）
- [ ] 主题对比视图（同一 MD 多主题并排预览）
- [ ] MD 前端 template 库（常见小红书结构：种草 / 吐槽 / 干货）
- [ ] 自定义字体上传（用户自带 woff2）
- [ ] 图片占位（`![](xxx)`）渲染到卡片内
- [ ] 移动端适配（当前 desktop-first）

---

## 📄 License

MIT

---

## 🙏 致谢与参考

- [RedBookCards](https://github.com/pilipala5/RedBookCards) — 分页算法与主题清单灵感
- [gcui-art/markdown-to-image](https://github.com/gcui-art/markdown-to-image) — React 组件 API 形状
- [Claude.ai](https://claude.ai) — editorial 设计语言灵感
- Anthropic [Claude Code](https://claude.com/claude-code) — 本项目由 Claude Code 主导实现
