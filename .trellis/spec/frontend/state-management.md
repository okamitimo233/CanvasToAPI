# State Management

> How state is managed in this project.

---

## Overview

This project **does not use Vuex or Pinia**. Instead, it uses **Vue 3 Composition API** with `ref()` and `reactive()` for state management. Global state is implemented via **module-level singletons** in composable files. This approach provides simplicity and avoids the complexity of centralized stores.

---

## State Categories

### Local State

**Scope**: Single component only

**Tools**: `ref()` and `reactive()`

**When to use**:

- Form inputs
- Toggle states (open/closed)
- Component-specific counters
- Temporary UI state

**Example**:

```vue
<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const formData = reactive({
  username: "",
  password: "",
});

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>
```

### Global State

**Scope**: Shared across multiple components

**Tools**: Module-level refs in composable files

**When to use**:

- User authentication status
- Theme preferences
- Language/locale settings
- Application-wide settings

**Example**:

```javascript
// utils/useTheme.js
import { ref } from "vue";

// Module-level singleton (shared across all components)
const theme = ref(localStorage.getItem("theme") || "auto");

export function useTheme() {
  return { theme };
}
```

### Server State

**Scope**: Data fetched from backend API

**Tools**: `ref()` with `fetch()` (no React Query/SWR)

**When to use**:

- API response data
- Server status
- Session information
- Logs from backend

**Example**:

```vue
<script setup>
import { ref, onMounted } from "vue";

const serverStatus = ref(null);
const loading = ref(false);

const fetchStatus = async () => {
  loading.value = true;
  try {
    const response = await fetch("/api/status");
    serverStatus.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch status:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStatus();
});
</script>
```

---

## When to Use Global State

### Criteria for Global State

Promote state to global when:

1. **Multiple components need the same data**
   - Example: Theme setting (used in header, settings page, all components)

2. **State needs to persist across route changes**
   - Example: User authentication token

3. **State changes need to trigger updates in distant components**
   - Example: Language change needs to update all text

### Implementation Pattern

**Module-level singleton with composable**:

```javascript
// utils/useAuth.js
import { ref } from "vue";

const user = ref(null);
const isAuthenticated = ref(false);

export function useAuth() {
  const login = async credentials => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    user.value = await response.json();
    isAuthenticated.value = true;
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
```

---

## State Patterns

### Reactive Object Pattern

Use `reactive()` for grouped state:

```javascript
const state = reactive({
  browserWsPath: "/ws",
  currentLang: "en",
  serviceConnected: false,
  sessions: [],
  logs: [],
});

// Access
state.sessions.push(newSession);
state.serviceConnected = true;
```

**Example**: `ui/app/pages/StatusPage.vue:1281-1303`

### Ref Pattern

Use `ref()` for primitive values or when you need reassignment:

```javascript
const count = ref(0);
const theme = ref("auto");

// Access with .value
count.value++;
theme.value = "dark";
```

### Computed Pattern

Derive state from other state:

```javascript
const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});
```

---

## Server State

### No Caching Library

This project doesn't use React Query, SWR, or similar libraries. Server state is managed manually with `fetch()`.

### Fetching Pattern

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
    const json = await response.json();
    data.value = json;
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
  <div v-else-if="data">
    <!-- Render data -->
  </div>
</template>
```

### WebSocket State

For real-time data, use WebSocket connections:

```javascript
const ws = new WebSocket("ws://localhost:7861/ws");

ws.onmessage = event => {
  const data = JSON.parse(event.data);
  // Update reactive state
  state.sessions = data.sessions;
};

ws.onerror = error => {
  console.error("WebSocket error:", error);
};
```

**Example**: `ui/app/pages/StatusPage.vue` - WebSocket for real-time status updates

---

## Persistence

### LocalStorage

For user preferences that should persist:

```javascript
// Load on module initialization
const theme = ref(localStorage.getItem("theme") || "auto");

// Save on change
watchEffect(() => {
  localStorage.setItem("theme", theme.value);
});
```

**Examples**:

- `ui/app/utils/useTheme.js` - Theme persistence
- `ui/app/utils/i18n.js` - Language preference persistence

### Session Storage

For temporary state that clears on tab close:

```javascript
const tempData = ref(sessionStorage.getItem("temp") || "");
```

---

## Common Mistakes

### 1. Using Vuex/Pinia

**Forbidden**: ❌

```javascript
import { createStore } from "vuex";

const store = createStore({
  state: { count: 0 },
});
```

**Required**: ✅

```javascript
// utils/useCounter.js
import { ref } from "vue";

const count = ref(0);

export function useCounter() {
  return { count };
}
```

### 2. Creating State Inside Composable Function

**Bad** (not shared):

```javascript
export function useAuth() {
  const user = ref(null); // New instance each call!
  return { user };
}
```

**Good** (shared singleton):

```javascript
const user = ref(null); // Module-level singleton

export function useAuth() {
  return { user };
}
```

### 3. Mutating Props

**Forbidden**: ❌

```javascript
const props = defineProps({
  data: { type: Object },
});

props.data.value = "new value"; // Don't mutate!
```

**Required**: ✅

```javascript
const props = defineProps({
  data: { type: Object },
});

const localData = ref(props.data);
localData.value = "new value"; // Mutate local copy

// Or emit event to parent
const emit = defineEmits(["update"]);
emit("update", newValue);
```

### 4. Not Handling Async State

**Bad** (no loading/error state):

```javascript
const data = ref(null);

onMounted(async () => {
  const response = await fetch("/api/data");
  data.value = await response.json();
});
```

**Good** (with loading/error states):

```javascript
const data = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await fetch("/api/data");
    data.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
```

### 5. Missing Reactivity Trigger

**Bad** (doesn't update):

```javascript
import I18n from "../utils/i18n.js";

const t = key => I18n.t(key); // Not reactive!
```

**Good** (reactive):

```javascript
import { ref } from "vue";
import I18n from "../utils/i18n.js";

const langVersion = ref(I18n.state.version);

const t = key => {
  langVersion.value; // Access to trigger reactivity
  return I18n.t(key);
};
```

---

## Examples

### Global State with Composable

**File**: `ui/app/utils/useTheme.js`

**Pattern**: Module-level singleton with watchEffect

```javascript
import { ref, watchEffect } from "vue";

// Global singleton state
const theme = ref(localStorage.getItem("theme") || "auto");

export function useTheme() {
  // Side effect: update DOM when theme changes
  watchEffect(() => {
    const isDark = theme.value === "dark";
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

### Complex Local State

**File**: `ui/app/pages/StatusPage.vue`

**Pattern**: Reactive object for grouped state

```javascript
const state = reactive({
  browserWsPath: "/ws",
  currentLang: I18n.getLang(),
  serviceConnected: false,
  sessions: [],
  logs: [],
  activeTab: "sessions",
});

// Mutations
function updateSessions(newSessions) {
  state.sessions = newSessions;
}

function addLog(log) {
  state.logs.unshift(log);
  if (state.logs.length > 100) {
    state.logs.pop();
  }
}
```
