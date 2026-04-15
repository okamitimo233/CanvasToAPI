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
