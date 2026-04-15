# Hook Guidelines

> How hooks are used in this project.

---

## Overview

This project uses **Vue 3 Composition API composables** (similar to React hooks). Composables are utility functions prefixed with `use` that encapsulate and reuse stateful logic. They are located in `ui/app/utils/` and use module-level singletons for shared state.

---

## Custom Composable Patterns

### Structure

Composables follow this pattern:

```javascript
// ui/app/utils/useTheme.js

// Module-level state (shared across all usages)
const theme = ref(localStorage.getItem("theme") || "auto");

// Exported composable function
export function useTheme() {
  // Return reactive state and methods
  return {
    theme,
    setTheme: newTheme => {
      theme.value = newTheme;
      localStorage.setItem("theme", newTheme);
    },
  };
}
```

### When to Create Composables

Create a composable when:

- Logic needs to be shared across multiple components
- State needs to persist across component instances
- Complex side effects need encapsulation
- Business logic should be separated from UI

---

## Existing Composables

### `useTheme` - Theme Management

**File**: `ui/app/utils/useTheme.js`

**Purpose**: Manage light/dark/auto theme with localStorage persistence

**Usage**:

```vue
<script setup>
import { useTheme } from "../utils/useTheme.js";

const { theme, setTheme } = useTheme();
</script>

<template>
  <el-select v-model="theme" @change="setTheme">
    <el-option label="Light" value="light" />
    <el-option label="Dark" value="dark" />
    <el-option label="Auto" value="auto" />
  </el-select>
</template>
```

**Features**:

- Detects system dark mode preference
- Persists theme choice in localStorage
- Applies theme via `data-theme` attribute
- Reactive state with Vue refs

---

## Utility Functions (Non-Composables)

### `i18n.js` - Internationalization

**File**: `ui/app/utils/i18n.js`

**Purpose**: Custom i18n implementation without vue-i18n

**Usage**:

```vue
<script setup>
import { ref } from "vue";
import I18n from "../utils/i18n.js";

const langVersion = ref(I18n.state.version);

const t = (key, options) => {
  langVersion.value; // Access to track changes
  return I18n.t(key, options);
};

const changeLang = lang => {
  I18n.setLang(lang);
};
</script>

<template>
  <h1>{{ t("status.title") }}</h1>
  <el-button @click="changeLang('zh')"> Switch to Chinese </el-button>
</template>
```

**Features**:

- Browser language detection
- LocalStorage persistence
- Reactive translation with version counter
- Template string interpolation
- DOM element translation (`data-i18n` attribute)

**Pattern**: Module-level singleton with reactive state

```javascript
// Module-level state
const state = {
  lang: currentLang,
  version: 0, // Incremented on language change
};

export default {
  state,
  t(key, options) {
    // Translation logic
  },
  setLang(lang) {
    state.lang = lang;
    state.version++; // Trigger reactivity
  },
};
```

### `escapeHtml` - XSS Prevention

**File**: `ui/app/utils/escapeHtml.js`

**Purpose**: Sanitize HTML to prevent XSS attacks

**Usage**:

```javascript
import escapeHtml from "../utils/escapeHtml.js";

const userInput = "<script>alert('xss')</script>";
const safe = escapeHtml(userInput);
// Result: "&lt;script&gt;alert('xss')&lt;/script&gt;"
```

---

## Data Fetching

### Direct Fetch with Refs

No data fetching library (React Query, SWR). Use native `fetch()` with reactive refs:

```vue
<script setup>
import { ref, onMounted } from "vue";

const data = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    data.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>{{ data }}</div>
</template>
```

**Example**: `ui/app/pages/StatusPage.vue:1281-1303` - Complex data fetching with WebSocket

---

## Naming Conventions

### Composables

- **Prefix**: Always start with `use`
- **Format**: camelCase
- **Examples**: `useTheme`, `useAuth`, `useWebSocket`

### Utility Functions

- **Format**: camelCase
- **No prefix**: Regular functions don't have special prefixes
- **Examples**: `escapeHtml`, `formatDate`, `parseConfig`

---

## Module-Level State Pattern

### Singleton State

For shared state across components, use module-level refs:

```javascript
// useTheme.js
import { ref, watchEffect } from "vue";

// Module-level state (shared singleton)
const theme = ref(localStorage.getItem("theme") || "auto");

export function useTheme() {
  // Each component gets same shared state
  return { theme };
}
```

### Why This Works

- Module is evaluated once
- All imports reference the same module instance
- State is shared across components
- No need for Vuex/Pinia

**Example**: `ui/app/utils/i18n.js:23-27`

```javascript
const state = {
  lang: currentLang,
  version: 0,
};
```

---

## Common Mistakes

### 1. Creating State Inside Composable

**Bad** (state not shared):

```javascript
export function useCounter() {
  const count = ref(0); // New instance each time!
  return { count };
}

// Component A
const { count: countA } = useCounter(); // countA = 0

// Component B
const { count: countB } = useCounter(); // countB = 0 (separate instance)
```

**Good** (shared state):

```javascript
const count = ref(0); // Module-level singleton

export function useCounter() {
  return { count };
}

// Component A
const { count: countA } = useCounter(); // countA = 0

// Component B
const { count: countB } = useCounter(); // countB = 0 (same instance)
```

### 2. Not Using Refs in Composables

**Bad** (non-reactive):

```javascript
let theme = localStorage.getItem("theme") || "auto";

export function useTheme() {
  return { theme }; // Not reactive!
}
```

**Good** (reactive):

```javascript
const theme = ref(localStorage.getItem("theme") || "auto");

export function useTheme() {
  return { theme }; // Reactive
}
```

### 3. Missing Reactivity Trigger for i18n

**Bad** (doesn't update on language change):

```vue
<script setup>
import I18n from "../utils/i18n.js";

const t = key => I18n.t(key); // No reactivity!
</script>
```

**Good** (updates on language change):

```vue
<script setup>
import { ref } from "vue";
import I18n from "../utils/i18n.js";

const langVersion = ref(I18n.state.version);

const t = key => {
  langVersion.value; // Access to track changes
  return I18n.t(key);
};
</script>
```

---

## Examples

### Theme Composable

**File**: `ui/app/utils/useTheme.js`

**Pattern**: Module-level state with watchEffect for side effects

```javascript
import { ref, watchEffect } from "vue";

const theme = ref(localStorage.getItem("theme") || "auto");
const systemDarkMode = ref(window.matchMedia("(prefers-color-scheme: dark)").matches);

export function useTheme() {
  watchEffect(() => {
    const isDark = theme.value === "dark" || (theme.value === "auto" && systemDarkMode.value);

    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  });

  return {
    theme,
    setTheme: newTheme => {
      theme.value = newTheme;
      localStorage.setItem("theme", newTheme);
    },
  };
}
```

### i18n Utility

**File**: `ui/app/utils/i18n.js`

**Pattern**: Custom i18n with reactive state and localStorage persistence

**Key Features**:

- No vue-i18n dependency
- Browser language detection
- Translation with template variables
- DOM element auto-translation
- Version counter for reactivity
