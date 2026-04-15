# Quality Guidelines

> Code quality standards for backend development.

---

## Overview

This project enforces code quality through **ESLint + Prettier + Husky + lint-staged**. All code must pass linting and formatting checks before commit. Pre-commit hooks automatically fix linting and formatting issues.

---

## Linting Tools

### ESLint

**Configuration**: `.eslintrc.js`

**Base configurations**:

- `eslint:recommended` - JavaScript best practices
- `plugin:prettier/recommended` - Prettier integration
- `plugin:jsonc/recommended-with-json` - JSON linting
- `plugin:vue/vue3-recommended` - Vue.js best practices (for frontend)

**Key rules** (`.eslintrc.js:174-249`):

```javascript
rules: {
    // Variables
    "no-var": "error",                    // Use let/const
    "prefer-const": "error",              // Prefer const for immutable bindings
    "no-unused-vars": "warn",             // Warn on unused variables

    // Arrow functions
    "arrow-body-style": ["error", "as-needed"],  // Concise arrow bodies
    "prefer-arrow-callback": "error",    // Use arrow callbacks

    // Object shorthand
    "object-shorthand": ["error", "always"],

    // String quotes
    quotes: ["error", "double", { avoidEscape: true }],  // Backend uses double quotes

    // Sorted keys
    "sort-keys-fix/sort-keys-fix": "error",  // Sort object keys alphabetically

    // Prettier
    "prettier/prettier": "error"
}
```

### Prettier

**Configuration**: `.prettierrc.js`

```javascript
module.exports = {
  printWidth: 120, // Line width
  tabWidth: 4, // 4-space indentation
  useTabs: false, // Use spaces, not tabs
  semi: true, // Require semicolons
  singleQuote: false, // Backend uses double quotes
  trailingComma: "es5", // ES5 trailing commas
  bracketSpacing: true,
  arrowParens: "always",
};
```

### Stylelint (CSS/Less)

**Configuration**: `.stylelintrc.js`

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
5. If fixes are applied, files are re-staged

---

## Forbidden Patterns

### 1. `var` Declaration

**Forbidden**: ❌

```javascript
var counter = 0;
```

**Required**: ✅

```javascript
let counter = 0;
const MAX_RETRIES = 3;
```

### 2. Non-arrow Callbacks

**Forbidden**: ❌

```javascript
setTimeout(function () {
  console.log("done");
}, 1000);
```

**Required**: ✅

```javascript
setTimeout(() => {
  console.log("done");
}, 1000);
```

### 3. Unsorted Object Keys

**Forbidden**: ❌

```javascript
const config = {
  port: 7861,
  host: "0.0.0.0",
  apiKeys: [],
};
```

**Required**: ✅ (alphabetical order)

```javascript
const config = {
  apiKeys: [],
  host: "0.0.0.0",
  port: 7861,
};
```

### 4. Console Logging

**Forbidden**: ❌

```javascript
console.log("Server started");
console.error("Error:", error);
```

**Required**: ✅

```javascript
this.logger.info("Server started");
this.logger.error("Error:", error.message);
```

### 5. Synchronous File Operations in Hot Paths

**Forbidden in request handlers**: ❌

```javascript
const data = fs.readFileSync(filePath);
```

**Required**: ✅

```javascript
const data = await fs.promises.readFile(filePath);
```

**Exception**: Config loading at startup is acceptable.

---

## Required Patterns

### 1. `const` for Immutable Bindings

```javascript
// Good
const PORT = 7861;
const logger = new LoggingService("MyService");

// Only use let for reassignment
let retryCount = 0;
retryCount++;
```

### 2. Object Shorthand

```javascript
// Bad
const config = {
  port: port,
  host: host,
};

// Good
const config = {
  port,
  host,
};
```

### 3. Async/Await over Raw Promises

**Bad**:

```javascript
someAsyncOperation()
  .then(result => {
    return anotherOperation(result);
  })
  .catch(error => {
    console.error(error);
  });
```

**Good**:

```javascript
try {
  const result = await someAsyncOperation();
  const final = await anotherOperation(result);
} catch (error) {
  this.logger.error("Operation failed:", error.message);
}
```

### 4. Error Handling in Async Functions

Always use try-catch in async functions:

```javascript
async function processData() {
  try {
    const data = await fetchData();
    return process(data);
  } catch (error) {
    this.logger.error("Failed to process data:", error.message);
    throw error; // Re-throw or return error response
  }
}
```

### 5. Class-Based Module Exports

```javascript
// src/utils/MyUtility.js
class MyUtility {
  constructor(config) {
    this.config = config;
  }

  doSomething() {
    // ...
  }
}

module.exports = MyUtility;
```

---

## Testing Requirements

### Current State

**No automated tests** in the project. Testing is done manually.

### Manual Testing Checklist

Before committing, verify:

- [ ] Lint passes: `npm run lint`
- [ ] Format check passes: `npm run format:check`
- [ ] Manual feature testing works
- [ ] No console errors in browser
- [ ] Server starts without errors

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
   # Test the feature manually
   ```

3. **Check for forbidden patterns**:
   - [ ] No `var` declarations
   - [ ] No `console.log` in production code
   - [ ] No unsorted object keys
   - [ ] No sync file operations in hot paths

4. **Check logging**:
   - [ ] Using `this.logger` instead of `console`
   - [ ] Appropriate log levels (INFO, WARN, ERROR, DEBUG)
   - [ ] No sensitive data in logs

5. **Check error handling**:
   - [ ] All async functions have try-catch
   - [ ] Errors are logged with context
   - [ ] User-facing errors have clear messages

### Reviewer Should Check

1. **Architecture**:
   - [ ] Code is in the right directory (core, routes, utils)
   - [ ] No business logic in route handlers
   - [ ] Dependencies are properly injected

2. **Error handling**:
   - [ ] All errors are caught and logged
   - [ ] Error responses follow standard format
   - [ ] No swallowed errors

3. **Logging**:
   - [ ] Appropriate log levels used
   - [ ] No sensitive data logged
   - [ ] Sufficient context in log messages

4. **Performance**:
   - [ ] No synchronous operations in hot paths
   - [ ] No memory leaks (event listeners cleaned up)
   - [ ] No unnecessary object allocations

5. **Security**:
   - [ ] API keys are validated
   - [ ] No sensitive data in responses
   - [ ] Input validation where needed

---

## Quality Commands

### Linting

```bash
# Lint all files
npm run lint

# Lint only JavaScript
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

### Pre-commit

Pre-commit hooks run automatically, but you can test manually:

```bash
# Run lint-staged manually
npx lint-staged
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

### 2. Ignoring Lint Errors

**Problem**: Code with lint errors committed

**Solution**: Fix all lint errors before committing. If a rule needs adjustment, discuss with the team.

### 3. Console.log in Production Code

**Problem**: Console output in production

**Solution**: Use `this.logger` for all logging:

```javascript
this.logger.info("Operation completed");
this.logger.error("Operation failed:", error.message);
```

### 4. Missing Error Context

**Problem**: Generic error messages without context

**Solution**: Include operation details in error logs:

```javascript
this.logger.error(`Failed to load auth data for session ${sessionId}:`, error.message);
```

### 5. Swallowing Errors

**Problem**: Catch block only logs error, doesn't handle it

**Solution**: Either re-throw, return error response, or handle appropriately:

```javascript
try {
  await someOperation();
} catch (error) {
  this.logger.error("Operation failed:", error.message);
  // Either re-throw, return error response, or handle
  throw error; // or res.status(500).json({ error: ... });
}
```
