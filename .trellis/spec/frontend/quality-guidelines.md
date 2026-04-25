# Quality Guidelines

> Code quality standards for frontend development.

---

## Overview

This project enforces code quality through **ESLint + Prettier + Stylelint + Husky + lint-staged**. All code must pass linting and formatting checks before commit. Pre-commit hooks automatically fix issues. The frontend uses Vue.js 3 with Composition API and follows strict component patterns.

---

## Linting Tools

### ESLint

**Configuration**: `.eslintrc.js`

**Base configurations**:

- `eslint:recommended` - JavaScript best practices
- `plugin:vue/vue3-recommended` - Vue 3 best practices
- `plugin:prettier/recommended` - Prettier integration
- `plugin:jsonc/recommended-with-json` - JSON linting

**Key Vue rules** (`.eslintrc.js:28-61`):

```javascript
overrides: [
  {
    files: ["ui/**/*.vue", "ui/**/*.js"],
    extends: ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
    rules: {
      "vue/multi-word-component-names": "off", // Allow single-word page names
      "vue/require-default-prop": "off", // No default props required
      "vue/no-v-html": "warn", // Warn on v-html (XSS risk)
      "sort-keys-fix/sort-keys-fix": "error", // Sort object keys
      "prettier/prettier": "error",
    },
  },
];
```

### Prettier

**Configuration**: `.prettierrc.js`

**Frontend settings**:

```javascript
module.exports = {
  printWidth: 120,
  tabWidth: 4,
  useTabs: false,
  semi: true,
  singleQuote: true, // Frontend uses single quotes
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
};
```

**Note**: Frontend uses **single quotes**, backend uses double quotes.

### Stylelint

**Configuration**: `.stylelintrc.js`

**CSS/Less rules**:

```javascript
rules: {
    "declaration-block-no-duplicate-properties": true,
    "no-descending-specificity": true,
    "order/properties-alphabetical-order": true  // Alphabetical CSS properties
}
```

---

## Pre-commit Hooks

### Husky + lint-staged

**Configuration**: `package.json:64-86`

```json
"lint-staged": {
    "*.{js,vue}": [
        "eslint --fix",
        "prettier --write"
    ],
    "*.{css,less}": [
        "stylelint --fix",
        "prettier --write"
    ],
    "*.json": [
        "prettier --write"
    ]
}
```

**What happens on commit**:

1. Staged files are checked
2. ESLint fixes JavaScript/Vue issues
3. Prettier formats code
4. Stylelint fixes CSS/Less issues
5. Files are re-staged if fixes were applied

---

## Forbidden Patterns

### 1. Options API

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

### 2. TypeScript

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
  <div style="color: red;">Content</div>
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
  langVersion.value;
  return I18n.t(key);
};
</script>
```

### 5. Console Logging

**Forbidden**: ❌

```javascript
console.log("Component mounted");
console.error("Error:", error);
```

**Required**: ✅ (if logging is needed)

```javascript
// Use Element Plus message for user-facing errors
import { ElMessage } from "element-plus";

ElMessage.error("Operation failed");

// For debugging, remove before commit
console.debug("Debug info"); // Remove in production
```

### 6. Vuex/Pinia

**Forbidden**: ❌

```javascript
import { createStore } from "vuex";

const store = createStore({
  state: { count: 0 },
});
```

**Required**: ✅ (use composables)

```javascript
// utils/useCounter.js
import { ref } from "vue";

const count = ref(0);

export function useCounter() {
  return { count };
}
```

---

## Required Patterns

### 1. Composition API with `<script setup>`

```vue
<script setup>
import { ref, computed, onMounted } from "vue";

// Props
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});

// Reactive state
const localState = ref(null);

// Computed
const doubled = computed(() => localState.value * 2);

// Lifecycle
onMounted(() => {
  // Initialization
});
</script>
```

### 2. File Header Comments

All files must include header:

```vue
<!--
@file ComponentName.vue
@brief Brief description
@author Team
-->
```

### 3. Scoped Styles

Use scoped styles with LESS:

```vue
<style lang="less" scoped>
@import "../styles/variables.less";

.component {
  color: var(--color-primary);
}
</style>
```

### 4. i18n Integration

All user-facing text must use i18n:

```vue
<script setup>
import { ref } from "vue";
import I18n from "../utils/i18n.js";

const langVersion = ref(I18n.state.version);
const t = key => {
  langVersion.value;
  return I18n.t(key);
};
</script>

<template>
  <h1>{{ t("page.title") }}</h1>
</template>
```

**Why the `langVersion` trick is necessary**:

The `I18n.t()` function is not reactive by itself. To trigger re-render when language changes:

1. Create a reactive ref that tracks I18n's internal version counter
2. Access `langVersion.value` inside the `t()` function to establish a reactive dependency
3. When language changes, I18n increments `state.version`, which updates `langVersion`
4. Vue detects the change and re-renders components using `t()`

**Pattern breakdown**:

```javascript
// Step 1: Create reactive ref tracking I18n version
const langVersion = ref(I18n.state.version);

// Step 2: Access version in t() to create reactivity
const t = key => {
  langVersion.value; // This read establishes reactive dependency
  return I18n.t(key);
};

// Step 3: Listen for language changes (in onMounted)
I18n.onChange(() => {
  langVersion.value = I18n.state.version; // Update triggers re-render
});
```

**Common mistake**: Forgetting to access `langVersion.value`

```javascript
// Bad: No reactivity (doesn't update on language change)
const t = key => I18n.t(key);

// Good: Reactive (updates when language changes)
const t = key => {
  langVersion.value; // Access to trigger reactivity
  return I18n.t(key);
};
```

### 5. CSS Variables for Theming

Use CSS custom properties, not hardcoded values:

```less
// Good
.component {
  color: var(--color-primary);
  background: var(--bg-body);
}

// Bad
.component {
  color: #007bff;
  background: #f0f2f5;
}
```

---

## Testing Requirements

### Current State

**No automated tests**. Testing is manual.

### Manual Testing Checklist

Before committing, verify:

- [ ] Lint passes: `npm run lint`
- [ ] Format check passes: `npm run format:check`
- [ ] Manual feature testing works
- [ ] No console errors in browser
- [ ] UI renders correctly in light/dark mode
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] All text is internationalized (no hardcoded strings)

---

## Code Review Checklist

### Before Requesting Review

1. **Lint and format**:

   ```bash
   npm run lint:fix
   npm run format
   ```

2. **Test locally**:

   ```bash
   npm run dev
   # Test all features manually
   ```

3. **Check for forbidden patterns**:
   - [ ] No Options API usage
   - [ ] No TypeScript syntax
   - [ ] No inline styles
   - [ ] No hardcoded strings (use i18n)
   - [ ] No console.log in production code
   - [ ] No Vuex/Pinia

4. **Check styling**:
   - [ ] Using CSS variables from `variables.less`
   - [ ] Scoped styles
   - [ ] Alphabetical CSS properties

5. **Check i18n**:
   - [ ] All text uses `t()` function
   - [ ] Translation keys exist in `locales/en.json` and `locales/zh.json`

### Reviewer Should Check

1. **Component structure**:
   - [ ] Uses `<script setup>`
   - [ ] Props have validation
   - [ ] File header comment present

2. **Styling**:
   - [ ] Uses CSS variables
   - [ ] Scoped styles
   - [ ] Supports light/dark mode

3. **i18n**:
   - [ ] All text is internationalized
   - [ ] Translation keys are descriptive

4. **Accessibility**:
   - [ ] Semantic HTML used
   - [ ] ARIA labels where needed
   - [ ] Keyboard navigation works

5. **Performance**:
   - [ ] No unnecessary re-renders
   - [ ] Large lists use virtualization (if applicable)
   - [ ] Images are optimized

---

## Quality Commands

### Linting

```bash
# Lint all files
npm run lint

# Lint only JavaScript/Vue
npm run lint:js

# Lint only CSS/Less
npm run lint:css

# Auto-fix linting issues
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

### Build

```bash
# Build UI for production
npm run build:ui

# Preview built UI
npm run preview:ui
```

---

## Common Mistakes

### 1. Forgetting to Run Lint

**Problem**: Commit rejected by pre-commit hook

**Solution**: Run lint before committing:

```bash
npm run lint:fix
npm run format
```

### 2. Missing i18n

**Problem**: Hardcoded strings not translatable

**Solution**: Always use i18n:

```vue
<template>
  <h1>{{ t("page.title") }}</h1>
</template>
```

### 3. Wrong Quote Style

**Problem**: ESLint/Prettier conflicts on quotes

**Solution**: Frontend uses single quotes, backend uses double:

```javascript
// Frontend (ui/)
const str = "Hello world";

// Backend (src/)
const str = "Hello world";
```

### 4. Missing CSS Variables

**Problem**: Hardcoded colors/styles not theme-aware

**Solution**: Use CSS variables from `variables.less`:

```less
@import "../styles/variables.less";

.component {
  color: var(--color-primary); // Theme-aware
}
```

### 5. Unsorted Object Keys

**Problem**: ESLint error on unsorted keys

**Solution**: Object keys must be alphabetical:

```javascript
// Bad
const obj = {
  port: 7861,
  host: "0.0.0.0",
};

// Good
const obj = {
  host: "0.0.0.0",
  port: 7861,
};
```
