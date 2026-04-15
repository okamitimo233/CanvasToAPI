# Error Handling

> How errors are handled in this project.

---

## Overview

The backend uses **custom error classes** with specific error types and helper functions for error detection. Errors are caught, logged, and returned to clients with structured JSON responses.

---

## Error Types

### Custom Error Classes (`src/utils/CustomErrors.js`)

| Error Class         | Purpose               | Properties                 |
| ------------------- | --------------------- | -------------------------- |
| `UserAbortedError`  | User-aborted requests | `isUserAborted: true`      |
| `QueueClosedError`  | Message queue closed  | `message: "Queue closed"`  |
| `QueueTimeoutError` | Message queue timeout | `message: "Queue timeout"` |

### Error Detection Helpers

```javascript
// src/utils/CustomErrors.js
function isUserAbortedError(error) {
  return error && error.isUserAborted === true;
}

function _isConnectionResetError(error) {
  return error.code === "ECONNRESET" || error.code === "ENOENT";
}

function _isQueueTimeoutError(error) {
  return error instanceof QueueTimeoutError;
}
```

---

## Error Handling Patterns

### Try-Catch with Logging

```javascript
// src/core/ProxyServerSystem.js:87-92
try {
  const authResult = await authSource.loadAuthData();
  // ... process result
} catch (error) {
  this.logger.error("Failed to load auth data:", error.message);
  res.status(500).json({
    error: {
      message: "Authentication error",
      code: 500,
      type: "auth_error",
    },
  });
}
```

### Error Status Code Mapping

```javascript
// src/core/RequestHandler.js:122-137
_getErrorStatusCode(error) {
    if (isUserAbortedError(error)) {
        return 499; // Client Closed Request
    }
    if (_isConnectionResetError(error)) {
        return 503; // Service Unavailable
    }
    if (_isQueueTimeoutError(error)) {
        return 504; // Gateway Timeout
    }
    return 500; // Internal Server Error
}
```

### Error Propagation with EventEmitter

```javascript
// src/core/SessionRegistry.js
class SessionRegistry extends EventEmitter {
    // Errors are emitted as events for async handling
    this.emit("error", error);
}
```

---

## API Error Responses

### Standard Error Format

All API errors return structured JSON:

```javascript
{
    "error": {
        "message": "Error description",
        "code": 503,
        "type": "api_error"
    }
}
```

### Examples by Error Type

**Authentication Error** (500):

```javascript
// src/core/ProxyServerSystem.js:90-92
res.status(500).json({
  error: {
    message: "Authentication error",
    code: 500,
    type: "auth_error",
  },
});
```

**Model Not Found** (404):

```javascript
// src/core/RequestHandler.js
res.status(404).json({
  error: {
    message: `Model ${model} not found`,
    code: 404,
    type: "invalid_request_error",
  },
});
```

**User Aborted** (499):

```javascript
// Non-standard but useful for tracking client cancellations
res.status(499).json({
  error: {
    message: "Client closed request",
    code: 499,
    type: "client_error",
  },
});
```

---

## Error Logging

### Pattern

All errors should be logged with context:

```javascript
this.logger.error("Operation failed:", error.message);
this.logger.debug("Full error details:", error); // Only if LOG_LEVEL=DEBUG
```

### Log Levels for Errors

| Level   | When to Use                                  | Example                               |
| ------- | -------------------------------------------- | ------------------------------------- |
| `ERROR` | Server errors, failed operations             | WebSocket disconnection, auth failure |
| `WARN`  | Invalid configuration, rate limiting         | Invalid API key, threshold exceeded   |
| `DEBUG` | Detailed error context (disabled by default) | Full stack traces, error objects      |

---

## Common Mistakes

### 1. Swallowing Errors

**Bad**:

```javascript
try {
  await someOperation();
} catch (error) {
  console.error(error); // Just log, don't propagate
}
```

**Good**:

```javascript
try {
  await someOperation();
} catch (error) {
  this.logger.error("Operation failed:", error.message);
  throw error; // Re-throw or handle properly
}
```

### 2. Generic Catch Blocks

**Bad**:

```javascript
catch (error) {
    res.status(500).json({ error: "Something went wrong" });
}
```

**Good**:

```javascript
catch (error) {
    if (isUserAbortedError(error)) {
        res.status(499).json({ error: { message: "Client closed", code: 499 }});
    } else {
        this.logger.error("Operation failed:", error);
        res.status(500).json({ error: { message: error.message, code: 500 }});
    }
}
```

### 3. Missing Error Context

**Bad**:

```javascript
this.logger.error("Error:", error);
```

**Good**:

```javascript
this.logger.error(`Failed to load auth data for session ${sessionId}:`, error.message);
```

---

## Examples from Codebase

### 1. Request Handler Error Handling

**File**: `src/core/RequestHandler.js`

**Pattern**: Multiple error type checks with status code mapping

```javascript
const statusCode = this._getErrorStatusCode(error);
res.status(statusCode).json({
  error: {
    message: error.message,
    code: statusCode,
    type: "api_error",
  },
});
```

### 2. Auth Loading Error

**File**: `src/core/ProxyServerSystem.js:87-92`

**Pattern**: Try-catch with logging and structured response

```javascript
try {
  const authResult = await authSource.loadAuthData();
  // ... process
} catch (error) {
  this.logger.error("Failed to load auth data:", error.message);
  res.status(500).json({
    error: {
      message: "Authentication error",
      code: 500,
      type: "auth_error",
    },
  });
}
```

### 3. WebSocket Connection Error

**File**: `src/core/SessionRegistry.js`

**Pattern**: EventEmitter for async error propagation

```javascript
// Errors are emitted for external handling
ws.on("error", error => {
  this.emit("error", error);
});
```
