# Component Guidelines

> How components are built in this project.

---

## Overview

This project uses **Vue.js 3 Single File Components (SFC)** exclusively with the **Composition API** and `<script setup>` syntax. All components use **runtime prop validation** (no TypeScript). Components are organized by reusability: reusable UI components in `components/`, page-level components in `pages/`.

---

## Component Structure

### Standard SFC Format

Every component follows this structure:

```vue
<!--
@file ComponentName.vue
@brief Brief description of the component
@author Author name
-->
<template>
  <!-- HTML template -->
</template>

<script setup>
// Component logic with Composition API
</script>

<style scoped>
/* Component styles */
</style>
```

### File Header Comment

All components include a JSDoc-style header:

```vue
<!--
@file EnvVarTooltip.vue
@brief Tooltip component for displaying environment variable documentation
@author Team
-->
```

**Example**: `ui/app/components/EnvVarTooltip.vue:1-5`

---

## Composition API with `<script setup>`

### Pattern

All components use `<script setup>` with Composition API:

```vue
<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";

// Props
const props = defineProps({
  docSection: {
    required: true,
    type: String,
  },
});

// Reactive state
const localState = ref(null);

// Computed properties
const computedValue = computed(() => {
  return localState.value * 2;
});

// Lifecycle hooks
onMounted(() => {
  // Initialization
});

// Watchers
watchEffect(() => {
  // Reactive side effects
});
</script>
```

**Examples**:

- `ui/app/pages/LoginPage.vue:60-121` - Full Composition API usage
- `ui/app/pages/StatusPage.vue:1281-1303` - Complex state management

---

## Props Conventions

### Runtime Prop Validation

All props use object syntax with `type` and `required`:

```javascript
const props = defineProps({
  // Required prop
  docSection: {
    required: true,
    type: String,
  },
  // Optional prop (rarely used, prefer required)
  optionalProp: {
    type: Number,
    default: 0,
  },
});
```

**Examples**:

- `ui/app/components/EnvVarTooltip.vue:36-50` - Required props with type validation

### No Default Values Pattern

Most props are **required** rather than optional with defaults:

**Pattern**:

```javascript
// Preferred - required props
const props = defineProps({
  envVar: {
    required: true,
    type: String,
  },
});
```

**Anti-pattern** (avoid unless necessary):

```javascript
// Avoid - optional props with defaults
const props = defineProps({
  envVar: {
    type: String,
    default: "UNKNOWN",
  },
});
```

---

## Component Composition

### Parent-Child Communication

**Props down, events up**:

```vue
<!-- Parent component -->
<template>
  <child-component :data="parentData" @update="handleUpdate" />
</template>

<!-- Child component -->
<script setup>
const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});

const emit = defineEmits(["update"]);

function sendData() {
  emit("update", newData);
}
</script>
```

### Slot Pattern

Use slots for flexible content:

```vue
<!-- Parent -->
<template>
  <env-var-tooltip :env-var="var">
    <template #default> Custom content here </template>
  </env-var-tooltip>
</template>

<!-- Child -->
<template>
  <el-tooltip>
    <slot />
  </el-tooltip>
</template>
```

---

## Icon Components

### Lucide Icons Library

Icon components are thin wrappers around Lucide Icons (`lucide-vue-next`), providing a consistent API and reusable interface across the application.

**Location**: `ui/app/components/icons/`

**Pattern**: Wrapper components with customizable props

### Icon Component Structure

Each icon component follows this pattern:

```vue
<!--
@file IconHome.vue
@brief Home icon component wrapper
@author Team
-->
<script setup>
import { Home } from "lucide-vue-next";

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  strokeWidth: {
    type: Number,
    default: 1.5,
  },
});
</script>

<template>
  <Home :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
```

**Examples**:

- `ui/app/components/icons/IconHome.vue` - Home icon
- `ui/app/components/icons/IconSettings.vue` - Settings icon
- `ui/app/components/icons/IconCheckCircle.vue` - Success status icon

### Props Convention

All icon components accept three props:

| Prop          | Type   | Default          | Description                                  |
| ------------- | ------ | ---------------- | -------------------------------------------- |
| `size`        | Number | `24`             | Icon size in pixels (viewBox is 24x24)       |
| `color`       | String | `"currentColor"` | Icon color (inherits from parent text color) |
| `strokeWidth` | Number | `1.5`            | Stroke width (1.5-2.0 for clarity)           |

### Usage Pattern

```vue
<script setup>
import IconHome from "@/components/icons/IconHome.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
</script>

<template>
  <!-- Default usage -->
  <icon-home />

  <!-- Custom size and color -->
  <icon-settings :size="32" color="#EC4899" :stroke-width="2" />

  <!-- Inherit color from parent -->
  <span class="status-icon">
    <icon-check-circle :size="20" />
  </span>
</template>

<style scoped>
.status-icon {
  color: var(--color-success); /* Icon inherits this color */
}
</style>
```

### Icon Index File

All icons are exported from `ui/app/components/icons/index.js` for convenient importing:

```javascript
// ui/app/components/icons/index.js
export { default as IconHome } from "./IconHome.vue";
export { default as IconSettings } from "./IconSettings.vue";
// ... more icons
```

**Usage**:

```javascript
import { IconHome, IconSettings, IconLogOut } from "@/components/icons";
```

### When to Create New Icon Components

Create a new icon component when:

- The icon is used in multiple places
- The icon needs consistent styling across the app
- You want to encapsulate Lucide implementation details

**Don't create icon components for**:

- One-time-use icons (use Lucide directly)
- Icons that need highly customized rendering

### Replacing Inline SVG Icons

When migrating from inline SVG icons to Lucide components:

**Before** (inline SVG):

```vue
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
>
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9 22 9 12 15 12 15 22" />
</svg>
```

**After** (Lucide component):

```vue
<icon-home :size="24" :stroke-width="2" />
```

**Benefits**:

- Cleaner template code
- Consistent icon styling
- Easier maintenance
- Smaller component files

### Critical: SVG Fill Style Rule

**Problem**: When using inline SVG icons, CSS `fill` property can override the SVG's `fill="none"` attribute. This causes icons to appear as solid color blocks instead of outlined shapes.

**Root Cause**: External CSS (e.g., Element Plus global styles) may set `svg { fill: currentColor }`, which fills the entire SVG shape with the current text color.

**Solution**: Always explicitly set `fill: none` in CSS for SVG icons:

```less
// Required for all inline SVG icons
.menu-item svg,
.label svg,
.floating-btn svg {
  fill: none;
}
```

**Why Lucide Icons don't have this issue**: Lucide components internally set `fill: "none"` as a default attribute, which CSS respects. Inline SVGs rely on the `fill` attribute in markup, which CSS can override.

**Best Practice**: Prefer Lucide icon components over inline SVGs to avoid this issue entirely. If you must use inline SVGs, always add `fill: none` to the CSS.

**Bug Reference**: Session 5 - Sidebar active icon showed as solid white block because `.menu-item.active { color: white }` combined with missing `fill: none` caused the icon to fill completely.

### Available Icon Components

The project includes **43 icon components** in `ui/app/components/icons/`:

**Navigation & UI Icons**:

- `IconHome` - Home page navigation
- `IconSettings` - Settings/configuration
- `IconFileText` - Documents/logs
- `IconLanguages` - Language switcher
- `IconLogOut` - Logout action

**Status & Feedback Icons**:

- `IconActivity` - Activity/service status
- `IconCheckCircle` - Success state
- `IconXCircle` - Error state
- `IconAlertCircle` - Warning/alert
- `IconAlertTriangle` - Warning triangle
- `IconCheck` - Checkmark
- `IconX` - Close/cancel

**Server & Infrastructure Icons**:

- `IconServer` - Server/host
- `IconCloud` - Cloud/browser connection
- `IconDatabase` - Database
- `IconGlobe` - Globe/web/world
- `IconTerminal` - Terminal/console

**User & Session Icons**:

- `IconUsers` - Users/groups
- `IconUserCheck` - User verification

**Settings & Controls Icons**:

- `IconSliders` - Sliders/adjustments
- `IconToggleLeft` - Toggle switch (off)
- `IconToggleRight` - Toggle switch (on)
- `IconRefreshCw` - Refresh/reload
- `IconZap` - Lightning/power

**Data & Charts Icons**:

- `IconLayers` - Stacked layers
- `IconBarChart3` - Bar chart
- `IconColumns` - Columns/grid

**UI Actions Icons**:

- `IconCopy` - Copy to clipboard
- `IconLink` - Link/chain
- `IconExternalLink` - External link
- `IconDownload` - Download
- `IconTrash2` - Delete/remove

**Navigation Controls Icons**:

- `IconChevronDown` - Expand/show more
- `IconChevronUp` - Collapse/show less

**Information & Status Icons**:

- `IconInfo` - Information
- `IconBookmark` - Bookmark/version
- `IconClock` - Time/version check
- `IconMonitor` - Monitor/display
- `IconList` - List items

**Appearance Icons**:

- `IconSun` - Sun/light mode
- `IconCircleDot` - Circle indicator

**Brand Icons**:

- `IconGithub` - GitHub logo (filled variant, custom SVG)

**Usage Example**:

```javascript
import { IconHome, IconServer, IconGlobe, IconCheckCircle } from "@/components/icons";
```

---

## Styling Patterns

### Scoped Styles

Most components use **scoped styles** with LESS:

```vue
<style lang="less" scoped>
@import "../styles/variables.less";

.component-class {
  color: var(--color-primary);
  background: var(--bg-body);
}
</style>
```

**Examples**:

- `ui/app/pages/LoginPage.vue:123-211` - Scoped LESS with imports
- `ui/app/pages/NotFound.vue:25-39` - Minimal scoped styles

### CSS Custom Properties

Use CSS variables from `variables.less` for theming:

```less
.component {
  color: var(--color-primary); // Theme-aware
  background: var(--bg-body); // Light/dark mode
  border: var(--border-color); // Consistent styling
}
```

### Mixed Scoped and Global

Some components mix scoped and global styles:

```vue
<!-- Scoped for component-specific -->
<style lang="less" scoped>
.component-specific {
  /* ... */
}
</style>

<!-- Global for Element Plus overrides -->
<style lang="less">
.el-message {
  /* Global style override */
}
</style>
```

**Example**: `ui/app/components/EnvVarTooltip.vue:121-215`

---

## Element Plus Integration

### Component Usage

Element Plus components are used throughout:

```vue
<template>
  <el-button type="primary" @click="handleClick"> Button </el-button>

  <el-input v-model="inputValue" placeholder="Enter text" />

  <ElMessage :message="notification" />
</template>
```

**Examples**:

- `ui/app/pages/StatusPage.vue` - Extensive Element Plus usage
- `ui/app/components/EnvVarTooltip.vue` - `el-tooltip` component

### Global Registration

Element Plus is registered globally in `ui/app/index.js`:

```javascript
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

app.use(ElementPlus);
```

---

## Accessibility

### Minimal A11y Requirements

- Use semantic HTML elements (`<button>`, `<input>`, `<nav>`)
- Provide `alt` attributes for images
- Use ARIA labels where needed

**Pattern**:

```vue
<button aria-label="Close dialog" @click="handleClose">
    <icon-close />
</button>
```

---

## Common Mistakes

### 1. Options API Usage

**Forbidden**: ❌

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
```

**Required**: ✅

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>
```

### 2. TypeScript in Components

**Forbidden**: ❌

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
```

**Required**: ✅

```vue
<script setup>
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});
</script>
```

### 3. Inline Styles

**Forbidden**: ❌

```vue
<template>
  <div style="color: red; background: blue;">Content</div>
</template>
```

**Required**: ✅

```vue
<template>
  <div class="styled-container">Content</div>
</template>

<style scoped>
.styled-container {
  color: var(--color-error);
  background: var(--color-primary);
}
</style>
```

### 4. Hardcoded Strings (No i18n)

**Forbidden**: ❌

```vue
<template>
  <h1>Server Status</h1>
</template>
```

**Required**: ✅

```vue
<template>
  <h1>{{ t("status.title") }}</h1>
</template>

<script setup>
import { ref } from "vue";
import I18n from "../utils/i18n.js";

const langVersion = ref(I18n.state.version);
const t = key => {
  langVersion.value; // Reactivity trigger
  return I18n.t(key);
};
</script>
```

---

## Examples

### Simple Component

**File**: `ui/app/pages/NotFound.vue`

**Pattern**: Minimal component with template and styles only

```vue
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}
</style>
```

### Complex Component

**File**: `ui/app/pages/StatusPage.vue`

**Pattern**: Full-featured component with:

- Reactive state management
- WebSocket communication
- Element Plus integration
- i18n support
- Theme integration
- Lifecycle hooks

### Reusable Component

**File**: `ui/app/components/EnvVarTooltip.vue`

**Pattern**: Reusable component with:

- Props interface
- Slot support
- i18n integration
- Element Plus tooltip wrapper
