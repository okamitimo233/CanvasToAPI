# Responsive Design

> Responsive design strategy and mobile navigation patterns for CanvasToAPI.

---

## Overview

CanvasToAPI follows a **desktop-first design approach** with responsive adaptations for tablet and mobile devices. The application uses specific breakpoints and navigation patterns to ensure optimal user experience across device sizes.

---

## Breakpoint Strategy

### Breakpoint Definitions

| Breakpoint | Width         | Target Device   | Layout Behavior                 |
| ---------- | ------------- | --------------- | ------------------------------- |
| Desktop    | ≥ 768px       | Desktop, laptop | Fixed sidebar, full layout      |
| Tablet     | 600px - 767px | Tablet          | Optimized grid, sidebar visible |
| Mobile     | < 600px       | Phone           | Drawer menu, single column      |

### CSS Media Query Pattern

```less
// Mobile (default in some cases)
.component {
  padding: 15px;
}

// Tablet and up
@media (min-width: 600px) {
  .component {
    padding: 20px;
  }
}

// Desktop and up
@media (min-width: 768px) {
  .component {
    padding: 30px;
  }
}
```

### Grid Layout Responsive Pattern

The dashboard grid adjusts columns based on viewport:

```less
.dashboard-grid {
  display: grid;
  gap: 20px;
  width: 100%;

  // Mobile: single column
  grid-template-columns: 1fr;

  // Tablet: 2 columns
  @media (min-width: 600px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // Desktop: 3 columns
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Example**: `ui/app/pages/StatusPage.vue:1475-1483`

---

## Navigation Patterns

### Desktop Navigation (≥ 768px)

**Pattern**: Fixed vertical sidebar with icon-only navigation

**Implementation**:

```vue
<template>
  <aside class="sidebar desktop-only">
    <div class="sidebar-menu">
      <button class="menu-item" :class="{ active: activeTab === 'home' }" @click="switchTab('home')">
        <icon-home :size="24" />
      </button>
      <button class="menu-item" :class="{ active: activeTab === 'settings' }" @click="switchTab('settings')">
        <icon-settings :size="24" />
      </button>
    </div>
  </aside>
</template>

<style lang="less" scoped>
.sidebar {
  width: 60px;
  background: var(--bg-elevated);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.menu-item {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: transparent;
}

.menu-item:hover {
  background: var(--bg-base);
  color: var(--color-primary);
}

.menu-item.active {
  background: var(--color-primary);
  color: var(--text-on-primary);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

// Critical: SVG icons must have fill: none
.menu-item svg {
  fill: none;
}

// Desktop only
.desktop-only {
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
```

**Key Features**:

- Fixed position, 60px width
- Icon-only buttons (40x40px)
- Active state with primary color background
- Hover state with subtle background change
- SVG icons must have `fill: none` to prevent solid fill bug

**Example**: `ui/app/pages/StatusPage.vue:31-130`, `1350-1418`

---

### Mobile Navigation (< 768px)

**Pattern**: Hamburger menu button + Element Plus Drawer

**Implementation**:

```vue
<template>
  <!-- Mobile Header -->
  <header class="mobile-header">
    <button class="hamburger-button" @click="mobileMenuOpen = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
    <h1 class="mobile-title">{{ t("statusHeading") }}</h1>
  </header>

  <!-- Mobile Drawer Menu -->
  <el-drawer v-model="mobileMenuOpen" direction="ltr" :title="t('menu')" size="280px" class="mobile-drawer">
    <div class="drawer-menu">
      <button
        class="drawer-menu-item"
        :class="{ active: activeTab === 'home' }"
        @click="
          switchTab('home');
          mobileMenuOpen = false;
        "
      >
        <icon-home :size="20" />
        <span>{{ t("statusHeading") }}</span>
      </button>
      <button
        class="drawer-menu-item"
        :class="{ active: activeTab === 'settings' }"
        @click="
          switchTab('settings');
          mobileMenuOpen = false;
        "
      >
        <icon-settings :size="20" />
        <span>{{ t("actionsPanel") }}</span>
      </button>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";

const mobileMenuOpen = ref(false);
const activeTab = ref("home");

const switchTab = tab => {
  activeTab.value = tab;
};
</script>

<style lang="less" scoped>
.mobile-header {
  display: none; // Hidden on desktop

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border-light);
    position: sticky;
    top: 0;
    z-index: 50;
  }
}

.hamburger-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: transparent;
}

.hamburger-button:hover {
  background: var(--bg-base);
  color: var(--color-primary);
}

.mobile-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.drawer-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.drawer-menu-item:hover {
  background: var(--bg-base);
}

.drawer-menu-item.active {
  background: var(--color-primary);
  color: var(--text-on-primary);
}

.drawer-divider {
  height: 1px;
  background: var(--border-light);
  margin: 8px 0;
}
</style>
```

**Key Features**:

- Hamburger button in sticky header
- Element Plus `el-drawer` component with `direction="ltr"` (left-to-right)
- Drawer width: 280px
- Menu items with icons (20px) and text labels
- Auto-close drawer on item click
- Active state highlighting

**Example**: `ui/app/pages/StatusPage.vue:11-28`, `132-225`, `1340-1368`

---

## Content Layout

### Desktop Layout

```less
.content-area {
  flex: 1;
  margin-left: 60px; // Sidebar width
  padding: 2rem;
  min-width: 0;
}

.main-layout {
  display: flex;
  min-height: 100vh;
}
```

### Mobile Layout

```less
@media (max-width: 767px) {
  .content-area {
    margin-left: 0; // No sidebar on mobile
    padding: 1rem;
  }
}
```

---

## Element Plus Drawer Integration

### Configuration

```vue
<el-drawer v-model="mobileMenuOpen" direction="ltr" :title="t('menu')" size="280px" class="mobile-drawer">
  <!-- Menu content -->
</el-drawer>
```

**Props**:

| Prop        | Value         | Purpose                         |
| ----------- | ------------- | ------------------------------- |
| `v-model`   | `boolean` ref | Control drawer open/close state |
| `direction` | `"ltr"`       | Slide from left-to-right        |
| `title`     | String        | Drawer header title             |
| `size`      | `"280px"`     | Drawer width                    |

### Drawer Styling

Element Plus drawers may need custom styling for dark mode:

```less
// Dark mode drawer styling
[data-theme="dark"] {
  .mobile-drawer {
    .el-drawer__header {
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-light);
      color: var(--text-primary);
    }

    .el-drawer__body {
      background: var(--bg-elevated);
      color: var(--text-primary);
    }
  }
}
```

---

## Responsive Typography

### Font Size Scaling

Typography should scale down on smaller screens:

```less
.page-header h1 {
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
}

.card-title {
  font-size: 1.125rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
}
```

---

## Responsive Spacing

### Padding and Margin Scaling

Spacing should reduce on mobile:

```less
.container {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
}
```

---

## Testing Breakpoints

### Manual Testing Checklist

Test the application at these viewport widths:

- [ ] **1440px** - Large desktop (sidebar visible, 3-column grid)
- [ ] **1024px** - Standard desktop (sidebar visible, 3-column grid)
- [ ] **768px** - Tablet portrait (sidebar visible, 2-column grid)
- [ ] **600px** - Large phone (mobile header, 1-column grid)
- [ ] **375px** - iPhone SE (mobile header, drawer menu)

### Browser DevTools

Use Chrome/Firefox DevTools to test responsive layouts:

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Enter custom viewport width
4. Test all interactive elements (navigation, buttons, forms)

---

## Common Mistakes

### 1. Missing Mobile Header

**Problem**: No navigation on mobile

**Solution**: Always implement both desktop sidebar and mobile header + drawer

```vue
<!-- Bad: Only desktop sidebar -->
<aside class="sidebar">...</aside>

<!-- Good: Both patterns -->
<aside class="sidebar desktop-only">...</aside>
<header class="mobile-header">...</header>
<el-drawer>...</el-drawer>
```

### 2. Forgetting to Close Drawer

**Problem**: Drawer stays open after navigation

**Solution**: Close drawer on menu item click

```vue
<!-- Bad: Drawer stays open -->
<button @click="switchTab('home')">Home</button>

<!-- Good: Close drawer on click -->
<button
  @click="
    switchTab('home');
    mobileMenuOpen = false;
  "
>Home</button>
```

### 3. Fixed Width Content Overflow

**Problem**: Content overflows viewport on mobile

**Solution**: Use flexible widths and min-width: 0

```less
// Bad: Fixed width overflows
.content {
  width: 800px;
}

// Good: Flexible width
.content {
  flex: 1;
  min-width: 0; // Prevent flex item overflow
}
```

### 4. SVG Fill Bug on Mobile

**Problem**: Active menu icons appear as solid blocks

**Solution**: Always set `fill: none` for SVG icons

```less
.menu-item svg {
  fill: none; // Critical for icon outline style
}
```

**Reference**: See "Icon Guidelines - Critical SVG Fill Rule" in `component-guidelines.md`

---

## Best Practices

### 1. Use CSS Variables for Responsive Values

```less
.component {
  padding: var(--spacing-lg);

  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
}
```

### 2. Mobile-First vs Desktop-First

This project uses **desktop-first** approach:

```less
// Desktop-first (preferred in this project)
.component {
  padding: 20px; // Desktop default

  @media (max-width: 768px) {
    padding: 15px; // Mobile override
  }
}
```

### 3. Test Dark Mode on Mobile

Dark mode affects drawer and mobile header styling:

```less
[data-theme="dark"] {
  .mobile-header {
    background: var(--bg-elevated);
    border-bottom-color: var(--border-light);
  }
}
```

### 4. Ensure Touch Targets are Large Enough

Minimum touch target size: 44x44px

```less
.menu-item {
  width: 40px;
  height: 40px;
  // With padding, effective touch area is >= 44px
}
```

---

## Examples

### Complete Responsive Layout

**File**: `ui/app/pages/StatusPage.vue`

**Pattern**: Full responsive implementation with:

- Desktop sidebar navigation
- Mobile header with hamburger menu
- Element Plus drawer for mobile navigation
- Responsive grid layout
- Responsive typography and spacing
- Dark mode support

---

## References

- **Element Plus Drawer**: https://element-plus.org/en-US/component/drawer.html
- **MDN Media Queries**: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
- **Responsive Design Basics**: https://web.dev/responsive-web-design-basics/

---

**Last Updated**: 2026-04-25
**Version**: 1.0
**Author**: mika
