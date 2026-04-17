# Journal - mika (Part 1)

> AI development session journal
> Started: 2026-04-15

---

## Session 1: Bootstrap development guidelines

**Date**: 2026-04-15
**Task**: Bootstrap development guidelines
**Branch**: `main`

### Summary

Analyzed codebase patterns and filled 11 spec files (backend: 5 files, frontend: 6 files) with real code examples. Total: +3970 lines documenting actual project conventions including directory structure, error handling, logging, state management, and quality standards.

### Main Changes

(Add details)

### Git Commits

| Hash      | Message       |
| --------- | ------------- |
| `2905892` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete

## Session 1: 前端重设计需求发现（Brainstorming）

**Date**: 2026-04-16
**Task**: 前端重设计需求发现（Brainstorming）
**Branch**: `main`

### Summary

(Add summary)

### Main Changes

## 会话概览

完成了 CanvasToAPI 前端界面重设计的完整需求发现和规划。

## 需求决策

| 决策项     | 结果                                   |
| ---------- | -------------------------------------- |
| 重设计原因 | 视觉风格过时，提升品牌形象             |
| 设计风格   | 技术感暗色主题（Real-Time Monitoring） |
| 布局结构   | 保持侧边栏导航（优化设计）             |
| 配色方案   | 深黑 #18181B + 品红 CTA #EC4899        |
| 排版字体   | Bodoni Moda (标题) + Jost (正文)       |
| 图标风格   | Lucide Icons 线性图标                  |
| 移动端策略 | 桌面优先，移动端抽屉菜单               |

## 技术方案

**设计系统**：

- 暗色模式优先设计
- 状态指示器动态效果（脉冲动画）
- 监控语义色（成功/警告/错误）
- CSS 变量系统

**实施计划**（6 个 PR）：

1. 设计系统基础（变量、图标库）
2. 登录页面重设计
3. 主状态页面视觉重设计
4. 信息架构优化
5. 响应式实现
6. 最终优化和测试

## 核心功能保留

- ✅ 状态监控（服务状态、会话池、代理设置）
- ✅ 设置管理面板
- ✅ 实时日志查看
- ✅ 国际化支持（中英文）
- ✅ 暗色模式支持

## MVP 范围

- 重设计现有核心功能
- 确保移动端响应式可用
- 为未来扩展预留空间

## 超出范围

- 数据可视化图表
- 多用户权限管理
- 离线模式增强
- 后端 API 修改

## 工具使用

- ui-ux-pro-max skill：生成设计方案、配色方案、排版建议
- 分析了 4 个设计方案，选择了方案 C（技术感暗色主题）

## 输出文件

**创建文件**：

- `.trellis/tasks/04-16-redesign-frontend/prd.md` — 完整的产品需求文档

**PRD 内容**：

- Goal（目标）
- Requirements（需求）
- Design Decisions（设计决策）
- Technical Approach（技术方案）
- Implementation Plan（实施计划）
- Acceptance Criteria（验收标准）
- Out of Scope（超出范围）

## 下一步

任务已记录，等待实施。下一步将按照 6 个 PR 的计划逐步实施。

### Git Commits

(No commits - planning session)

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete

## Session 2: PR1 - 设计系统基础实施

**Date**: 2026-04-17
**Task**: 实施前端重设计 PR1（设计系统基础）
**Branch**: `main`

### Summary

完成了前端重设计任务的第一个 PR：设计系统基础。建立了新的配色系统、排版系统、图标组件库，并确保向后兼容性。

### Main Changes

## 实施内容

**1. 配色系统**：

- 主色调：深黑 `#18181B`
- 次要色：中灰 `#3F3F46`
- CTA色：品红 `#EC4899`
- 背景：亮色 `#FAFAFA` / 暗色 `#09090B`
- 文字：深色 `#09090B` / 亮色 `#FAFAFA`
- 状态色：成功 `#22C55E`、警告 `#F97316`、错误 `#EF4444`

**2. 排版系统**：

- 标题字体：Bodoni Moda（优雅衬线）
- 正文字体：Jost（几何现代）
- Google Fonts 异步加载

**3. 图标系统**：

- 安装 `lucide-vue-next`
- 创建 10 个可复用图标组件
- 支持 size、color、strokeWidth props

**4. 主题支持**：

- 完整的暗色模式 CSS 变量
- 自动字体加载
- 优雅降级

## 创建文件

**样式文件**：

- `ui/app/styles/variables.less` - 更新（新增设计变量）
- `ui/app/styles/global.less` - 修复（应用新字体）

**图标组件**（10 个）：

- `ui/app/components/icons/IconHome.vue`
- `ui/app/components/icons/IconSettings.vue`
- `ui/app/components/icons/IconFileText.vue`
- `ui/app/components/icons/IconLanguages.vue`
- `ui/app/components/icons/IconLogOut.vue`
- `ui/app/components/icons/IconCheckCircle.vue`
- `ui/app/components/icons/IconXCircle.vue`
- `ui/app/components/icons/IconAlertCircle.vue`
- `ui/app/components/icons/IconActivity.vue`
- `ui/app/components/icons/IconUsers.vue`
- `ui/app/components/icons/index.js` - 导出索引

**工具文件**：

- `ui/app/utils/loadFonts.js` - 字体加载器
- `ui/app/index.js` - 更新（集成字体加载）

**测试和文档**：

- `ui/app/components/DesignSystemDemo.vue` - 测试组件
- `docs/design-system-pr1.md` - 实施文档

## 质量检查

- ✅ ESLint: 通过（0 错误，1 个预存在警告）
- ✅ Stylelint: 通过
- ✅ 代码格式化: 完成
- ✅ 向后兼容性: 保持
- ✅ 无破坏性变更: 确认

## 修复问题

**问题**: `ui/app/styles/global.less:23` 使用了通用 sans-serif 字体
**修复**: 改为使用新的设计系统字体 `@font-body` (Jost)

### Git Commits

(No commits yet - ready for testing)

### Testing

- [OK] Lint 检查通过
- [OK] 设计系统完整性验证
- [OK] 向后兼容性确认
- [ ] 用户测试：运行 `npm run dev` 并导入 `DesignSystemDemo` 组件测试

### Status

[OK] **PR1 Complete - Ready for Testing**

### Next Steps

1. **测试新设计系统**：
   - 运行 `npm run dev`
   - 在任意 Vue 页面导入 `DesignSystemDemo` 组件
   - 测试主题切换、配色、字体、图标

2. **提交代码**：
   - 确认测试通过后，使用 `/trellis:finish-work` 完成工作
   - 使用 `/trellis:record-session` 记录会话

3. **继续 PR2**：
   - PR2: 登录页面重设计
   - 应用新的设计系统到 LoginPage

## Session 3: PR1 - 设计系统基础实施

**Date**: 2026-04-17
**Task**: PR1 - 设计系统基础实施
**Branch**: `main`

### Summary

(Add summary)

### Main Changes

## 实施内容

**PR1: 设计系统基础**

| 模块     | 内容                                                     |
| -------- | -------------------------------------------------------- |
| 配色系统 | 新增品牌色、背景色、文字色、状态色（支持暗色模式）       |
| 排版系统 | Bodoni Moda（标题）+ Jost（正文），Google Fonts 异步加载 |
| 图标系统 | 安装 lucide-vue-next，创建 10 个可复用图标组件           |
| 主题支持 | 完整的暗色模式 CSS 变量，优雅降级                        |

## 设计规格

- **品牌色**: Primary #18181B, Secondary #3F3F46, CTA #EC4899
- **背景**: Light #FAFAFA, Dark #09090B
- **状态色**: Success #22C55E, Warning #F97316, Error #EF4444
- **图标**: Lucide linear, stroke-width 1.5, viewBox 24x24

## 创建文件

**样式和配置**:

- `ui/app/styles/variables.less` - 更新（新增设计变量）
- `ui/app/styles/global.less` - 修复（应用新字体）
- `package.json` - 添加 lucide-vue-next 依赖

**图标组件** (10 个):

- `ui/app/components/icons/IconHome.vue`
- `ui/app/components/icons/IconSettings.vue`
- `ui/app/components/icons/IconFileText.vue`
- `ui/app/components/icons/IconLanguages.vue`
- `ui/app/components/icons/IconLogOut.vue`
- `ui/app/components/icons/IconCheckCircle.vue`
- `ui/app/components/icons/IconXCircle.vue`
- `ui/app/components/icons/IconAlertCircle.vue`
- `ui/app/components/icons/IconActivity.vue`
- `ui/app/components/icons/IconUsers.vue`
- `ui/app/components/icons/index.js` - 导出索引

**工具和测试**:

- `ui/app/utils/loadFonts.js` - Google Fonts 加载器
- `ui/app/index.js` - 更新（集成字体加载）
- `ui/app/components/DesignSystemDemo.vue` - 测试组件
- `docs/design-system-pr1.md` - 实施文档

**规范文档**:

- `.trellis/spec/frontend/component-guidelines.md` - 新增 Icon Components 章节
- `.trellis/spec/frontend/directory-structure.md` - 更新 icons 目录

## 质量检查

- ✅ ESLint: 通过（0 错误，1 个预存在警告）
- ✅ Stylelint: 通过
- ✅ Prettier: 格式化完成
- ✅ 向后兼容性: 保持所有现有 CSS 变量
- ✅ 无破坏性变更: 确认

## 修复问题

**问题**: `ui/app/styles/global.less:23` 使用了通用 sans-serif 字体
**修复**: 改为使用新的设计系统字体 `@font-body` (Jost)

## 下一步

- PR2: 登录页面重设计
- PR3: 主状态页面视觉重设计
- PR4: 信息架构优化
- PR5: 响应式实现
- PR6: 最终优化和测试

### Git Commits

| Hash      | Message       |
| --------- | ------------- |
| `16c8f9f` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete

## Session 4: Session 4 - PR2 Login Page Redesign & Design System Docs

**Date**: 2026-04-17
**Task**: Session 4 - PR2 Login Page Redesign & Design System Docs
**Branch**: `main`

### Summary

(Add summary)

### Main Changes

## 📦 PR2: Login Page Redesign

### Design System Application

- ✅ New color scheme (Deep Black #18181B + Magenta CTA #EC4899)
- ✅ New font system (Space Grotesk + Inter)
- ✅ CSS variables with dark mode support
- ✅ Lucide Icons components

### Visual Enhancements

- ✅ Brand section (CanvasToAPI branding)
- ✅ Form layout optimization
- ✅ State animations (error message slide-in)
- ✅ Dark mode perfect support

### Interaction Improvements

- ✅ Hover/Active/Focus states
- ✅ Smooth transitions
- ✅ Responsive design (mobile-optimized)

**Commit**: `94cfb81` - `feat(ui): redesign login page with new design system (PR2)`

---

## 📚 Design System Documentation

### New Documentation

Created `.trellis/spec/frontend/design-system.md` — Comprehensive design system specification

**Contents**:

1. **Design Philosophy**
   - Dark mode first
   - Tech aesthetic
   - State-driven design
   - Minimalist approach

2. **Color System**
   - Brand Colors
   - Background hierarchy (base → elevated → surface)
   - Text hierarchy (primary → secondary → muted)
   - Status colors (success/warning/error)
   - RGB variables (for transparency)

3. **Typography System**
   - Space Grotesk (headings)
   - Inter (body text)
   - Font weights and sizes
   - Responsive typography

4. **CSS Variables**
   - Semantic naming conventions
   - Theme switching mechanism
   - Best practices

5. **Icon System**
   - Lucide Icons component specs
   - Usage examples
   - Icon style guidelines

6. **Spacing/Borders/Shadows/Transitions**
   - Complete design token system

7. **Best Practices**
   - Using CSS variables
   - Following color semantics
   - Font inheritance
   - Responsive design
   - Dark mode first

8. **Migration Guide**
   - Steps for migrating from old system

**Commit**: `88deff9` - `docs(spec): add design system documentation`

---

## 📊 Progress Status

**Completed PRs**: PR1 ✅, PR2 ✅

**Next**: PR3 - Main Status Page Redesign (Visual)

**Task Status**: In progress (2/6 PRs completed)

### Git Commits

| Hash      | Message       |
| --------- | ------------- |
| `94cfb81` | (see git log) |
| `88deff9` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete

- None - task complete

## Session 5: PR3 - StatusPage Visual Redesign

**Date**: 2026-04-17
**Task**: PR3 - StatusPage Visual Redesign
**Branch**: `main`

### Summary

完成了前端重设计任务的第三个 PR：StatusPage 视觉重设计。创建了 30 个新的 Lucide 图标组件，替换了侧边栏和主要卡片标题的 SVG 图标，并更新了样式以应用新的设计系统。

### Main Changes

## 实施内容

**1. 图标系统扩展**：

- 创建 30 个新的 Lucide 图标组件
- 包括：Server, Cloud, Copy, Sliders, ToggleLeft/Right, ChevronDown/Up, RefreshCw, Trash2, Zap, Globe, Terminal, Info, AlertTriangle, Check, X, Layers, Database, Link
- 完整的图标导出索引

**2. StatusPage 图标替换**：

- ✅ 侧边栏：Home, Settings, FileText, Languages, LogOut
- ✅ 主要卡片标题：Activity (服务状态), Users (会话池)
- ⏳ Main Content 内联 SVG：约 60+ 个待替换（后续 PR）

**3. 样式更新**：

- 背景：`var(--bg-base)`, `var(--bg-elevated)`
- 状态指示器：脉冲动画（`@keyframes pulse`）
- 菜单项：hover 效果 + 品红 CTA 色
- 状态颜色：Success/Warning/Error 语义色
- 卡片：hover 阴影效果

## 创建文件

**图标组件** (30 个):

- PR1/PR2: IconHome, IconSettings, IconFileText, IconLanguages, IconLogOut, IconActivity, IconUsers
- PR3 新增: IconServer, IconCloud, IconCopy, IconSliders, IconToggleLeft, IconToggleRight, IconChevronDown, IconChevronUp, IconRefreshCw, IconTrash2, IconZap, IconGlobe, IconTerminal, IconInfo, IconAlertTriangle, IconCheck, IconX, IconLayers, IconDatabase, IconLink

**更新文件**:

- `ui/app/pages/StatusPage.vue` - 图标替换 + 样式更新
- `ui/app/components/icons/index.js` - 导出新图标

## 质量检查

- ✅ ESLint: 通过（0 错误，1 个预存在警告）
- ✅ Stylelint: 通过
- ✅ Prettier: 格式化完成
- ✅ 设计系统一致性: 确认

## 设计系统应用

**配色系统**:

- 背景：`var(--bg-base)` (#FAFAFA / #09090B)
- 卡片：`var(--bg-elevated)` (#FFF / #18181B)
- 状态：`var(--color-success)`, `var(--color-warning)`, `var(--color-error)`

**视觉效果**:

- 状态指示器脉冲动画（2s 循环）
- 卡片 hover 阴影增强
- 菜单项 hover 颜色变化（品红 CTA）
- 平滑过渡动画（0.2s ease）

## 下一步

- PR4: 继续替换 Main Content 中的 SVG 图标
- PR5: 实现响应式设计
- PR6: 最终优化和测试

### Git Commits

(Ready for commit)

### Testing

- [OK] Lint 检查通过
- [OK] 图标组件正确导入和使用
- [OK] 样式更新符合设计系统
- [ ] 用户测试：运行 `npm run dev` 测试视觉效果

### Status

[OK] **PR3 Complete - Ready for Testing**

### Next Steps

1. **测试新的视觉效果**：
   - 运行 `npm run dev`
   - 测试侧边栏图标和卡片标题图标显示
   - 测试状态指示器脉冲动画
   - 测试暗色模式

2. **提交代码**：
   - 使用 `/trellis:finish-work` 完成工作
   - 使用 `/trellis:record-session` 记录会话

3. **继续 PR4**：
   - 替换 Main Content 中剩余的 SVG 图标

## Session 5: Session 5: Fix SVG fill bug in sidebar icons

**Date**: 2026-04-17
**Task**: Session 5: Fix SVG fill bug in sidebar icons
**Branch**: `main`

### Summary

(Add summary)

### Main Changes

## Summary

Fixed bug where sidebar active icons displayed as solid white blocks instead of outlined shapes.

## Root Cause

CSS `fill` property from external styles (Element Plus) overrode SVG's `fill="none"` attribute. When `.menu-item.active { color: white }` was applied, the SVG was filled entirely with white.

## Changes

| File                                             | Change                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------- |
| `ui/app/pages/StatusPage.vue`                    | Added `fill: none` to `.menu-item svg`, `.label svg`, `.floating-btn svg` |
| `.trellis/spec/frontend/component-guidelines.md` | Added "Critical: SVG Fill Style Rule" section                             |

## Lessons Learned

- Always explicitly set `fill: none` in CSS for inline SVG icons
- Prefer Lucide icon components over inline SVGs (they handle this internally)
- External CSS can override SVG presentation attributes

## Next Steps

Continue with PR3: StatusPage visual redesign

### Git Commits

| Hash      | Message       |
| --------- | ------------- |
| `8f27a2c` | (see git log) |

### Testing

- [OK] (Add test results)

### Status

[OK] **Completed**

### Next Steps

- None - task complete

## Session 6: PR3 - Complete StatusPage Icon Replacement

**Date**: 2026-04-18
**Task**: Complete PR3 - Replace all inline SVGs in StatusPage.vue
**Branch**: `main`

### Summary

完成了前端重设计任务的 PR3 阶段：全面替换 StatusPage.vue 中的所有内联 SVG 图标。使用 Trellis 工作流程和多 subagent 协作，成功创建了 33 个新的 Lucide 图标组件，替换了 Main Content 部分的 37 个内联 SVG。

### Main Changes

## 实施内容

**1. Subagent 协作流程**：

使用 Trellis 工作流程，将任务分解为 4 个子任务，按依赖关系顺序执行：

| Task | Subagent Type | Description                          | Status      |
| ---- | ------------- | ------------------------------------ | ----------- |
| #3   | research      | 分析 SVG 图标并制定替换策略          | ✅ Complete |
| #4   | implement     | 创建缺失的 Lucide 图标组件           | ✅ Complete |
| #2   | implement     | 替换 StatusPage.vue 中的所有内联 SVG | ✅ Complete |
| #1   | implement     | 运行 lint 检查并修复问题             | ✅ Complete |

**2. 图标组件创建**：

- **新创建图标组件**: 33 个
- **图标组件总数**: 43 个（原有 10 个 + 新增 33 个）
- **位置**: `ui/app/components/icons/`
- **导出**: `ui/app/components/icons/index.js`

**新增图标列表**：

| Icon Component    | Lucide Icon       | Use Case                |
| ----------------- | ----------------- | ----------------------- |
| IconServer        | Server            | 服务连接状态            |
| IconCloud         | Cloud             | 浏览器连接状态          |
| IconColumns       | Columns           | WebSocket 端点          |
| IconCopy          | Copy              | 复制按钮                |
| IconUserCheck     | UserCheck         | 活跃会话                |
| IconLayers        | Layers            | 会话总数                |
| IconSliders       | SlidersHorizontal | 选择策略                |
| IconAlertTriangle | AlertTriangle     | 错误阈值                |
| IconBarChart3     | BarChart3         | 代理设置标题            |
| IconZap           | Zap               | 流式模式                |
| IconBrain         | Brain             | 强制思考                |
| IconGlobe         | Globe             | 强制网页搜索 / 语言设置 |
| IconLink          | Link              | 强制 URL 上下文         |
| IconRefreshCw     | RefreshCw         | 最大重试次数            |
| IconInfo          | Info              | 版本信息                |
| IconGithub        | Github (custom)   | GitHub 仓库链接         |
| IconBookmark      | Bookmark          | 当前版本                |
| IconClock         | Clock             | 最新版本                |
| IconExternalLink  | ExternalLink      | 外部链接                |
| IconList          | List              | 日志级别                |
| IconMonitor       | Monitor           | 日志最大数量            |
| IconSun           | Sun               | 主题切换                |
| IconDownload      | Download          | 下载日志                |
| IconTerminal      | Terminal          | 终端图标                |
| IconDatabase      | Database          | 数据库图标              |
| IconCheck         | Check             | 确认图标                |
| IconX             | X                 | 关闭图标                |
| IconToggleLeft    | ToggleLeft        | 切换开关（关）          |
| IconToggleRight   | ToggleRight       | 切换开关（开）          |
| IconChevronDown   | ChevronDown       | 向下箭头                |
| IconChevronUp     | ChevronUp         | 向上箭头                |
| IconTrash2        | Trash2            | 删除图标                |
| IconCircleDot     | CircleDot         | 圆点图标                |

**3. SVG 替换详情**：

| 区域                      | 替换的 SVG 数量 | 涉及的图标                                        |
| ------------------------- | --------------- | ------------------------------------------------- |
| Service Status            | 5               | Activity, Server, Cloud, Columns, Copy            |
| Session Pool              | 5               | Users, UserCheck, Layers, Sliders, AlertTriangle  |
| Proxy Settings Status     | 6               | BarChart3, Zap, Brain, Globe, Link, RefreshCw     |
| Browser Sessions          | 1               | Users                                             |
| Settings - Version Info   | 6               | Info, Github, Bookmark, Clock, Copy, ExternalLink |
| Settings - Log            | 3               | FileText, List, Monitor                           |
| Settings - Appearance     | 2               | Sun, Globe                                        |
| Settings - Proxy Settings | 6               | (复用前面的图标)                                  |
| Logs Tab                  | 1               | Download                                          |
| **总计**                  | **37**          | **23 个独特图标**                                 |

**4. 特殊处理**：

- **IconGithub**: 使用自定义 SVG（filled variant），因为 Lucide 没有内置 GitHub 图标
- **重复使用的图标**: Copy (3次), Globe (3次), Zap (2次), Brain (2次), Link (2次), Sliders (2次), BarChart3 (2次), Sun (2次), ExternalLink (2次)
- **保留的 SVG**: 侧边栏和浮动按钮的 SVG（在 PR3 前期已完成替换）

## 质量检查

- ✅ ESLint: 通过（0 错误，1 个预存在警告：v-html）
- ✅ Stylelint: 通过
- ✅ Prettier: 格式化完成
- ✅ 代码一致性: 所有图标组件遵循相同模式
- ✅ 无破坏性变更: 确认

## 技术收益

**代码质量提升**：

- ✅ 消除内联 SVG：Main Content 中 37 个内联 SVG 全部替换为组件
- ✅ 可维护性：图标集中管理，易于更新和替换
- ✅ 一致性：所有图标使用统一的 Lucide 风格
- ✅ 类型安全：图标组件有明确的 props 定义
- ✅ 可复用性：43 个图标组件可在整个项目中复用

**设计系统实现**：

- ✅ 配色系统：状态指示器使用设计系统的语义色
- ✅ 图标风格：线性图标，stroke-width 1.5，viewBox 24x24
- ✅ 暗色模式：所有图标支持暗色模式
- ✅ 响应式：图标尺寸可通过 props 调整

## 文件变更统计

**新增文件** (33 个图标组件):

- `ui/app/components/icons/Icon{Name}.vue` - 33 个文件

**修改文件**:

- `ui/app/pages/StatusPage.vue` - 替换所有 Main Content 的内联 SVG
- `ui/app/components/icons/index.js` - 导出 33 个新图标组件

**分析文档**:

- `.trellis/workspace/mika/svg-replacement-strategy.md` - SVG 替换策略文档

## 下一步

**PR3 状态**: ✅ 完成

**剩余 PR**:

- PR4: 信息架构优化（简化状态展示、优化信息层级、改进 Tab 切换体验）
- PR5: 响应式实现（移动端抽屉菜单、汉堡按钮交互、断点测试）
- PR6: 最终优化和测试（全面测试、性能优化、无障碍性、跨浏览器测试）

### Git Commits

(Ready for commit)

### Testing

- [OK] Lint 检查通过
- [OK] 图标组件正确创建和导出
- [OK] StatusPage.vue 中 SVG 替换完成
- [ ] 用户测试：运行 `npm run dev` 验证视觉效果和交互

### Status

[OK] **PR3 Complete - Ready for Testing**

### Next Steps

1. **测试新的图标系统**：
   - 运行 `npm run dev`
   - 测试所有图标正常显示
   - 测试暗色模式下的图标显示
   - 测试所有交互功能正常

2. **提交代码**：
   - 使用 `/trellis:finish-work` 完成工作
   - 使用 `/trellis:record-session` 记录会话

3. **继续 PR4**：
   - 信息架构优化
   - 简化状态展示逻辑
   - 优化信息层级
