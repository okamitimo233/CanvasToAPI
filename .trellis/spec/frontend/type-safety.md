# Type Safety

> Type safety patterns in this project.

---

## Overview

This project **does not use TypeScript**. The frontend is written in plain JavaScript with **runtime prop validation** for Vue components and **JSDoc comments** for documentation. This is a deliberate architectural choice for simplicity and rapid development.

---

## Type System

### No TypeScript

**Decision**: The project uses plain JavaScript, not TypeScript

**Rationale**:

- Faster development without compilation step
- Simpler build process
- Lower barrier to entry for contributors
- Runtime flexibility

**Implications**:

- No compile-time type checking
- All type validation happens at runtime
- Errors are caught during testing/execution, not compilation

---

## Prop Validation

### Vue Runtime Prop Validation

All component props use object syntax with `type` and `required`:

```vue
<script setup>
const props = defineProps({
  // Required prop with type
  docSection: {
    required: true,
    type: String,
  },
  envVar: {
    required: true,
    type: String,
  },
  // Optional prop (rare)
  optionalValue: {
    type: Number,
    default: 0,
  },
});
</script>
```

### Supported Types

Vue runtime prop validation supports:

| Type       | Usage              |
| ---------- | ------------------ |
| `String`   | Text values        |
| `Number`   | Numeric values     |
| `Boolean`  | True/false         |
| `Array`    | Lists              |
| `Object`   | Complex objects    |
| `Function` | Callbacks          |
| `Symbol`   | Unique identifiers |

### Multiple Types

Use array for multiple types:

```javascript
const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
});
```

### Custom Validator

Use `validator` function for complex validation:

```javascript
const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: value => {
      return ["loading", "success", "error"].includes(value);
    },
  },
});
```

---

## JSDoc Documentation

### File Headers

All files include JSDoc-style headers:

```javascript
/**
 * @file escapeHtml.js
 * @brief XSS-safe HTML escaping utility
 * @author Team
 */
```

### Function Documentation

Use JSDoc for function signatures:

```javascript
/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} html - The HTML string to escape
 * @returns {string} The escaped HTML string
 */
function escapeHtml(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

**Example**: `ui/app/utils/escapeHtml.js:1-23`

### Type Annotations

JSDoc can describe types:

```javascript
/**
 * @typedef {Object} Session
 * @property {string} id - Session identifier
 * @property {string} email - User email
 * @property {boolean} active - Is session active
 */

/**
 * Fetches all active sessions
 * @returns {Promise<Session[]>} Array of sessions
 */
async function fetchSessions() {
  // ...
}
```

---

## Type Organization

### Local Types

Define types in the file where they're used:

```javascript
// No separate types file - define inline
const state = reactive({
  /** @type {string} */
  browserWsPath: "/ws",
  /** @type {boolean} */
  serviceConnected: false,
  /** @type {Array} */
  sessions: [],
});
```

### Shared Types

For types used across multiple files, document in JSDoc:

```javascript
// utils/types.js (if needed)
/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {Object} data
 * @property {string} [error]
 */
```

---

## Validation

### Runtime Validation Only

All validation happens at runtime:

- **Props**: Vue validates when component is used
- **API responses**: Validate in fetch handlers
- **User input**: Validate in form handlers

### API Response Validation

Check API responses manually:

```javascript
const fetchConfig = async () => {
  const response = await fetch("/api/config");
  const data = await response.json();

  // Runtime validation
  if (typeof data.port !== "number") {
    throw new Error("Invalid config: port must be number");
  }
  if (!Array.isArray(data.apiKeys)) {
    throw new Error("Invalid config: apiKeys must be array");
  }

  return data;
};
```

### Form Input Validation

Validate user input in handlers:

```javascript
const formData = reactive({
  username: "",
  password: "",
});

const submitForm = () => {
  // Validation
  if (!formData.username || formData.username.length < 3) {
    ElMessage.error("Username must be at least 3 characters");
    return;
  }
  if (!formData.password || formData.password.length < 8) {
    ElMessage.error("Password must be at least 8 characters");
    return;
  }

  // Submit
  submitToServer(formData);
};
```

---

## Common Patterns

### Null Checks

Use optional chaining and nullish coalescing:

```javascript
// Optional chaining
const userName = response?.user?.name;

// Nullish coalescing
const port = config.port ?? 7861;

// Explicit check
if (data && data.sessions) {
  // ...
}
```

### Array Type Safety

Check array types before operations:

```javascript
// Check if array
if (Array.isArray(sessions)) {
  sessions.forEach(session => {
    // ...
  });
}

// Filter with type check
const validSessions = sessions.filter(s => s && s.id && s.email);
```

### Object Type Safety

Use `typeof` and `in` operator:

```javascript
// Check type
if (typeof config === "object" && config !== null) {
  // ...
}

// Check property existence
if ("port" in config) {
  console.log(config.port);
}
```

---

## Forbidden Patterns

### 1. TypeScript Syntax

**Forbidden**: ❌

```vue
<script setup lang="ts">
interface Props {
  title: string;
}
const props = defineProps<Props>();
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

### 2. Unvalidated Props

**Forbidden**: ❌

```vue
<script setup>
const props = defineProps(["title", "count"]); // No validation!
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
  count: {
    type: Number,
    default: 0,
  },
});
</script>
```

### 3. Implicit Any

**Forbidden**: ❌

```javascript
function process(data) {
  // No type info
  return data.value;
}
```

**Required**: ✅

```javascript
/**
 * Process configuration data
 * @param {Object} data - Configuration object
 * @param {*} data.value - The value to process
 * @returns {*} The processed value
 */
function process(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data: must be object");
  }
  return data.value;
}
```

---

## Examples

### Component Props

**File**: `ui/app/components/EnvVarTooltip.vue:36-50`

```vue
<script setup>
const props = defineProps({
  docSection: {
    required: true,
    type: String,
  },
  envVar: {
    required: true,
    type: String,
  },
});
</script>
```

### Utility Function

**File**: `ui/app/utils/escapeHtml.js:1-23`

```javascript
/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} html - The HTML string to escape
 * @returns {string} The escaped HTML string
 */
function escapeHtml(html) {
  if (typeof html !== "string") {
    return "";
  }
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

### State Type Annotations

**File**: `ui/app/pages/StatusPage.vue:1281-1303`

```javascript
const state = reactive({
  /** @type {string} */
  browserWsPath: "/ws",
  /** @type {string} */
  currentLang: I18n.getLang(),
  /** @type {boolean} */
  serviceConnected: false,
  /** @type {Array<Object>} */
  sessions: [],
  /** @type {Array<Object>} */
  logs: [],
});
```
