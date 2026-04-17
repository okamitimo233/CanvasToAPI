# Design System

> CanvasToAPI 设计系统 — 技术感暗色主题设计规范

---

## Overview

CanvasToAPI 采用**技术感暗色主题**设计风格，参考 DevOps 监控工具和实时数据平台。设计系统优先考虑：

- **技术专业性**：几何感、未来感的视觉风格
- **暗色模式优先**：适合长时间监控场景
- **状态语义明确**：清晰的成功/警告/错误指示
- **现代简洁**：大量留白、清晰的信息层级

---

## Design Philosophy

### 核心原则

1. **暗色模式优先**：暗色主题是主要设计，亮色主题作为可选项
2. **技术感**：使用几何字体和现代配色，体现技术专业性
3. **状态驱动**：监控场景需要清晰的状态指示（成功/警告/错误）
4. **简洁克制**：极简设计、大量留白、清晰层次

### 视觉特点

- **配色**：深色背景 + 品红 CTA，技术感强
- **字体**：Space Grotesk（标题）+ Inter（正文），几何现代
- **图标**：线性图标（Lucide Icons），stroke-width: 1.5
- **动画**：状态指示器脉冲、平滑过渡

---

## Color System

### 品牌色（Brand Colors）

用于品牌标识、重要元素、CTA 按钮等。

| Variable                  | Light Theme | Dark Theme | Usage              |
| ------------------------- | ----------- | ---------- | ------------------ |
| `--color-brand-primary`   | `#18181B`   | `#FAFAFA`  | 品牌主色、标题文字 |
| `--color-brand-secondary` | `#3F3F46`   | `#D4D4D8`  | 次要元素、辅助文字 |
| `--color-brand-cta`       | `#EC4899`   | `#EC4899`  | CTA 按钮、强调元素 |

**使用示例**：

```less
.brand-title {
  color: var(--color-brand-primary);
  font-family: @font-heading;
}

.cta-button {
  background: var(--color-brand-cta);
  color: #fff;
}
```

### 背景色（Background Colors）

分层背景系统：base → elevated → surface

| Variable        | Light Theme | Dark Theme | Usage                  |
| --------------- | ----------- | ---------- | ---------------------- |
| `--bg-base`     | `#FAFAFA`   | `#09090B`  | 页面基础背景           |
| `--bg-elevated` | `#FFF`      | `#18181B`  | 卡片、模态框、提升层级 |
| `--bg-surface`  | `#F4F4F5`   | `#27272A`  | 表面元素、输入框背景   |

**层级关系**：

```
base (页面背景)
  └─ elevated (卡片/模态框)
      └─ surface (输入框/小组件)
```

**使用示例**：

```less
.login-page {
  background: var(--bg-base);
}

.login-form {
  background: var(--bg-elevated);
}

.input-field {
  background: var(--bg-base);

  &:focus {
    background: var(--bg-elevated);
  }
}
```

### 文字色（Text Colors）

三级文字层次：primary → secondary → muted

| Variable           | Light Theme | Dark Theme | Usage          |
| ------------------ | ----------- | ---------- | -------------- |
| `--text-primary`   | `#09090B`   | `#FAFAFA`  | 主要文字、标题 |
| `--text-secondary` | `#3F3F46`   | `#D4D4D8`  | 次要文字、说明 |
| `--text-muted`     | `#71717A`   | `#A1A1AA`  | 禁用、占位符   |

**使用示例**：

```less
.heading {
  color: var(--text-primary);
}

.description {
  color: var(--text-secondary);
}

.placeholder {
  color: var(--text-muted);
}
```

### 状态色（Status Colors）

用于状态指示、警告、错误等场景。

| Variable          | Color                         | RGB                  | Usage                |
| ----------------- | ----------------------------- | -------------------- | -------------------- |
| `--color-success` | `#22C55E`                     | `34, 197, 94`        | 成功状态、在线、正常 |
| `--color-warning` | `#F97316`                     | `249, 115, 22`       | 警告状态、注意       |
| `--color-error`   | `#EF4444`                     | `239, 68, 68`        | 错误状态、离线、异常 |
| `--color-primary` | `#007bff` (L) / `#339aff` (D) | `0/51, 123/154, 255` | 交互元素、链接       |

**使用示例**：

```less
.status-online {
  color: var(--color-success);

  &::before {
    content: "";
    background: var(--color-success);
    animation: pulse 2s infinite;
  }
}

.error-message {
  color: var(--color-error);
  border-left: 3px solid var(--color-error);
}
```

### RGB 变量（用于透明度）

所有状态色提供 RGB 分量变量，方便创建半透明效果：

```less
--color-success-rgb: 34, 197, 94;
--color-warning-rgb: 249, 115, 22;
--color-error-rgb: 239, 68, 68;
```

**使用示例**：

```less
.success-bg {
  background: rgba(var(--color-success-rgb), 0.1);
}
```

---

## Typography

### 字体栈

| Role        | Font Family                             | Usage                  |
| ----------- | --------------------------------------- | ---------------------- |
| **Heading** | `"Space Grotesk", sans-serif`           | 标题、品牌名、重要文字 |
| **Body**    | `"Inter", sans-serif`                   | 正文、表单、按钮       |
| **Mono**    | `"SF Mono", Consolas, Menlo, monospace` | 代码、日志、终端输出   |

### 字体加载

**Google Fonts 引用**（`ui/app/index.html`）：

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### 字重（Font Weights）

| Weight          | Usage                |
| --------------- | -------------------- |
| 400 (Regular)   | 正文、说明文字       |
| 500 (Medium)    | 按钮文字、导航、强调 |
| 600 (Semi-Bold) | 小标题、重要按钮     |
| 700 (Bold)      | 大标题、品牌名       |

**使用示例**：

```less
.brand-title {
  font-family: @font-heading;
  font-weight: 700;
}

.button-text {
  font-family: @font-body;
  font-weight: 600;
}
```

### 字体大小（Font Sizes）

使用相对单位 `em`，基础大小为 `1em`：

```less
@font-size-base: 1em;
@font-size-small: 0.9em;
@font-size-large: 1.1em;
```

**推荐响应式字体**：

```less
.title {
  font-size: 2.5rem; // 大标题

  @media (max-width: 480px) {
    font-size: 2rem;
  }
}
```

---

## CSS Variables

### 命名约定

采用**语义化命名**，而非描述性命名：

**✅ 正确**：

```less
--text-primary       // 语义：主要文字
--bg-elevated        // 语义：提升层级的背景
--color-brand-cta    // 语义：CTA 元素的颜色
```

**❌ 错误**：

```less
--dark-gray          // 描述：深灰色
--light-background   // 描述：浅色背景
--pink-color         // 描述：粉色
```

### 主题切换

通过 `[data-theme="dark"]` 属性切换主题：

**HTML**：

```html
<html data-theme="dark"></html>
```

**CSS**：

```less
:root {
  --bg-base: #fafafa; // Light theme
}

[data-theme="dark"] {
  --bg-base: #09090b; // Dark theme
}
```

**JavaScript 切换**：

```javascript
// 切换到暗色模式
document.documentElement.setAttribute("data-theme", "dark");

// 切换到亮色模式
document.documentElement.setAttribute("data-theme", "light");
```

---

## Icon System

### 图标库选择

**Lucide Icons**（推荐）：轻量、现代、完整

### 图标组件规范

所有图标组件位于 `ui/app/components/icons/`，命名格式：`Icon<Name>.vue`

**示例**：`IconLanguages.vue`

```vue
<script setup>
import { Languages } from "lucide-vue-next";

defineProps({
  color: {
    default: "currentColor",
    type: String,
  },
  size: {
    default: 24,
    type: Number,
  },
  strokeWidth: {
    default: 1.5,
    type: Number,
  },
});
</script>

<template>
  <Languages :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
```

### 图标使用规范

| 属性           | 默认值           | 说明                |
| -------------- | ---------------- | ------------------- |
| `size`         | `24`             | 图标尺寸（px）      |
| `stroke-width` | `1.5`            | 线条粗细（1.5-2.0） |
| `color`        | `"currentColor"` | 继承父元素文字颜色  |

**使用示例**：

```vue
<!-- 默认尺寸和颜色 -->
<IconLanguages />

<!-- 自定义尺寸 -->
<IconLanguages :size="20" />

<!-- 自定义颜色 -->
<IconLanguages color="#EC4899" />

<!-- 继承父元素颜色 -->
<div style="color: var(--text-primary);">
    <IconLanguages />  <!-- 自动继承 #09090B -->
</div>
```

### 图标风格

- **线性图标**（outline），不使用填充图标
- **stroke-width**：1.5-2.0
- **viewBox**：24x24
- **禁止使用 emoji** 作为图标

---

## Spacing

### 间距系统

采用 8px 基础单位的间距系统：

| Variable      | Value  | Usage                |
| ------------- | ------ | -------------------- |
| `@spacing-xs` | `8px`  | 极小间距、图标间距   |
| `@spacing-sm` | `10px` | 小间距、输入框内边距 |
| `@spacing-md` | `15px` | 中等间距、元素间距   |
| `@spacing-lg` | `20px` | 大间距、区块间距     |
| `@spacing-xl` | `40px` | 超大间距、容器内边距 |

**使用示例**：

```less
.card {
  padding: @spacing-xl; // 40px
  margin-bottom: @spacing-lg; // 20px
}

.input-field {
  padding: 14px @spacing-md; // 14px 15px
}
```

---

## Border Radius

### 圆角系统

| Variable                | Value  | Usage        |
| ----------------------- | ------ | ------------ |
| `@border-radius-sm`     | `5px`  | 小元素、标签 |
| `@border-radius-md`     | `8px`  | 按钮、输入框 |
| `@border-radius-lg`     | `10px` | 卡片、模态框 |
| `@border-radius-xl`     | `12px` | 大卡片、容器 |
| `@border-radius-circle` | `50%`  | 圆形元素     |

**使用示例**：

```less
.button {
  border-radius: @border-radius-md; // 8px
}

.card {
  border-radius: @border-radius-lg; // 10px
}
```

---

## Shadows

### 阴影系统

| Variable         | Value                            | Usage            |
| ---------------- | -------------------------------- | ---------------- |
| `@shadow-light`  | `0 4px 6px rgba(0,0,0,0.1)`      | 轻阴影、悬停效果 |
| `@shadow-medium` | `0 4px 8px rgba(0,0,0,0.1)`      | 中等阴影、卡片   |
| `@shadow-focus`  | `0 0 0 3px rgba(0,123,255,0.25)` | 聚焦环           |

**使用示例**：

```less
.card {
  box-shadow: @shadow-medium;

  &:hover {
    box-shadow: @shadow-light;
  }
}

.input-field:focus {
  box-shadow: @shadow-focus;
}
```

---

## Transitions

### 过渡动画

| Variable             | Value       | Usage              |
| -------------------- | ----------- | ------------------ |
| `@transition-fast`   | `0.2s ease` | 快速交互、hover    |
| `@transition-normal` | `0.3s ease` | 常规动画、主题切换 |

**使用示例**：

```less
.button {
  transition: all @transition-fast;

  &:hover {
    transform: translateY(-1px);
  }
}

.theme-switch {
  transition: background @transition-normal;
}
```

---

## Best Practices

### 1. 使用 CSS 变量

**✅ 推荐**：

```less
.text {
  color: var(--text-primary);
  background: var(--bg-base);
}
```

**❌ 避免**：

```less
.text {
  color: #09090b; // 硬编码，暗色模式不生效
}
```

### 2. 遵循颜色语义

**✅ 推荐**：

```less
.error {
  color: var(--color-error); // 语义明确
}

.success {
  color: var(--color-success); // 语义明确
}
```

**❌ 避免**：

```less
.error {
  color: #ef4444; // 应使用变量
}

.highlight {
  color: #ec4899; // 应使用 var(--color-brand-cta)
}
```

### 3. 字体继承

**✅ 推荐**：

```less
.component {
  font-family: @font-body; // 使用变量
  font-size: 1rem;
}
```

**❌ 避免**：

```less
.component {
  font-family: sans-serif; // 应使用设计系统字体
}
```

### 4. 响应式设计

优先使用相对单位，并考虑移动端：

```less
.container {
  padding: @spacing-xl;

  @media (max-width: 480px) {
    padding: @spacing-lg;
  }
}
```

### 5. 暗色模式优先

设计时优先考虑暗色模式，确保在深色背景上可读：

```less
.text {
  color: var(--text-primary); // 自动适配暗色模式
}
```

---

## File Structure

设计系统相关文件：

```
ui/app/
├── styles/
│   └── variables.less          # CSS 变量定义
├── components/
│   └── icons/                  # 图标组件库
│       ├── IconActivity.vue
│       ├── IconLanguages.vue
│       └── ...
└── index.html                  # 字体加载

.trellis/spec/frontend/
└── design-system.md            # 本文档
```

---

## Migration Guide

### 从旧系统迁移

1. **替换硬编码颜色**：

   ```less
   // 旧代码
   color: #333;

   // 新代码
   color: var(--text-primary);
   ```

2. **使用新字体变量**：

   ```less
   // 旧代码
   font-family: sans-serif;

   // 新代码
   font-family: @font-body;
   ```

3. **应用新间距系统**：

   ```less
   // 旧代码
   padding: 15px;

   // 新代码
   padding: @spacing-md;
   ```

---

## Testing Checklist

在实现新组件或页面时，确保：

- [ ] 所有颜色使用 CSS 变量，支持暗色模式
- [ ] 字体使用 `@font-heading` 或 `@font-body` 变量
- [ ] 间距使用 `@spacing-*` 变量
- [ ] 圆角使用 `@border-radius-*` 变量
- [ ] 过渡动画使用 `@transition-*` 变量
- [ ] 图标使用 Lucide Icons 组件
- [ ] 响应式设计考虑移动端
- [ ] 所有交互元素有 hover/focus 状态

---

## References

- **Space Grotesk**: https://fonts.google.com/specimen/Space+Grotesk
- **Inter**: https://fonts.google.com/specimen/Inter
- **Lucide Icons**: https://lucide.dev/
- **CSS Variables Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

---

**Last Updated**: 2026-04-17
**Version**: 1.0
**Author**: mika
