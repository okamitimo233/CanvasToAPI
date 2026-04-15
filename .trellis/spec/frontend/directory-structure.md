# Directory Structure

> How frontend code is organized in this project.

---

## Overview

The frontend follows a **clear separation** between source code, build output, static assets, and localization files. It uses Vue.js 3 with Vite as the build tool. The `ui/` directory contains all frontend code, with `app/` as the source root and `dist/` as the build output.

---

## Directory Layout

```
ui/
├── app/                    # Source code (Vite root)
│   ├── index.html          # Entry HTML file
│   ├── index.js            # Vue app entry point
│   ├── App.vue             # Root component
│   ├── components/         # Reusable UI components
│   │   └── EnvVarTooltip.vue
│   ├── pages/              # Page-level components (routes)
│   │   ├── StatusPage.vue
│   │   ├── LoginPage.vue
│   │   └── NotFound.vue
│   ├── router/             # Vue Router configuration
│   │   └── index.js
│   ├── styles/             # Global styles (LESS)
│   │   ├── variables.less
│   │   └── global.less
│   └── utils/              # Utility functions/composables
│       ├── i18n.js
│       ├── useTheme.js
│       └── escapeHtml.js
├── dist/                   # Build output (served by Express)
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── *.svg
├── public/                 # Static assets (copied to dist)
│   └── *.svg
└── locales/                # i18n JSON files
    ├── en.json
    └── zh.json
```

---

## Module Organization

### Components (`ui/app/components/`)

**Purpose**: Reusable UI components used across multiple pages

**Pattern**: Single File Components (SFC) with `<script setup>`

**When to add here**:

- UI elements used in multiple pages (buttons, inputs, tooltips)
- Reusable layout components
- Shared UI widgets

**Examples**:

- `EnvVarTooltip.vue` - Tooltip component for environment variable documentation

### Pages (`ui/app/pages/`)

**Purpose**: Route-level components, each representing a page

**Pattern**: SFCs mapped to routes in `router/index.js`

**When to add here**:

- New pages/routes
- Main views of the application
- Route-specific components

**Examples**:

- `StatusPage.vue` - Main status monitoring page (`/`)
- `LoginPage.vue` - Authentication configuration page (`/login`)
- `NotFound.vue` - 404 error page

### Router (`ui/app/router/`)

**Purpose**: Vue Router configuration

**Pattern**: Centralized route definitions with navigation guards

**When to add here**:

- New routes
- Route guards (authentication, permissions)
- Route-level code splitting

**Examples**:

- `index.js` - Route definitions and auth guard

### Styles (`ui/app/styles/`)

**Purpose**: Global styles, variables, and theming

**Pattern**: LESS preprocessor with CSS custom properties

**When to add here**:

- Global CSS variables
- Theme definitions
- Shared style utilities

**Examples**:

- `variables.less` - CSS custom properties for light/dark themes
- `global.less` - CSS reset and base styles

### Utils (`ui/app/utils/`)

**Purpose**: Utility functions and composables

**Pattern**: JavaScript utilities and Vue composables

**When to add here**:

- Helper functions
- Custom composables (functions starting with `use`)
- Shared utilities

**Examples**:

- `i18n.js` - Internationalization utility
- `useTheme.js` - Theme management composable
- `escapeHtml.js` - XSS-safe HTML escaping

---

## Naming Conventions

### Files

- **Component files**: PascalCase (`.vue`)
  - Example: `EnvVarTooltip.vue`, `StatusPage.vue`, `LoginPage.vue`
- **Utility files**: camelCase for functions, PascalCase for composables
  - Example: `escapeHtml.js` (function), `useTheme.js` (composable)
- **Style files**: lowercase with hyphens
  - Example: `variables.less`, `global.less`

### Directories

- **Feature directories**: lowercase
  - Example: `components/`, `pages/`, `router/`, `styles/`, `utils/`
- **Root directories**: lowercase
  - Example: `app/`, `dist/`, `public/`, `locales/`

### Components

- **PascalCase** for component names
- **kebab-case** for component usage in templates
- Example: `EnvVarTooltip` component used as `<env-var-tooltip>`

---

## Build Output

### dist/ Directory

The `dist/` directory is the Vite build output:

- `index.html` - Entry HTML with injected assets
- `assets/` - Hashed JS and CSS files
- Static files from `public/` are copied here

**Served by**: Express server from root (`server.use(express.static("ui/dist"))`)

---

## Localization Files

### locales/ Directory

JSON files for internationalization:

- `en.json` - English translations
- `zh.json` - Chinese translations

**Used by**: `ui/app/utils/i18n.js`

**Pattern**: Nested JSON structure with dot-notation keys

```json
{
  "status": {
    "title": "Server Status",
    "sessions": "Active Sessions"
  }
}
```

---

## Examples

### Well-Organized Modules

1. **`ui/app/pages/StatusPage.vue`**: Complex page component that demonstrates:
   - Local state with `reactive()`
   - WebSocket communication
   - Element Plus UI components
   - i18n integration
   - Theme support

2. **`ui/app/utils/i18n.js`**: Utility module that demonstrates:
   - Module-level singleton state
   - Browser language detection
   - LocalStorage persistence
   - Reactive translation system

3. **`ui/app/styles/variables.less`**: Style file that demonstrates:
   - CSS custom properties for theming
   - Light and dark mode support
   - LESS variables

---

## Anti-Patterns to Avoid

1. **Don't put page-specific components in `components/`** - Keep them in `pages/` or create a subdirectory
2. **Don't duplicate utility functions** - Check `utils/` before creating new helpers
3. **Don't import from `dist/`** - Always import from `app/` source files
4. **Don't hardcode styles** - Use CSS variables from `variables.less`
5. **Don't create deeply nested component directories** - Keep structure flat and simple
