# Logging Guidelines

> How logging is done in this project.

---

## Overview

This project uses a **custom LoggingService class** with leveled logging and an in-memory circular buffer. The logging system is designed for simplicity and easy debugging, with support for different log levels controlled by environment variables.

**File**: `src/utils/LoggingService.js`

---

## Log Levels

### Hierarchy

`DEBUG` < `INFO` < `WARN` < `ERROR`

### When to Use Each Level

| Level   | When to Use                                    | Examples                                                                 |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| `DEBUG` | Detailed operation flow, development debugging | WebSocket message details, request/response bodies, internal state       |
| `INFO`  | Normal operations, successful events           | Server startup, configuration loaded, session events, request completion |
| `WARN`  | Non-critical issues, invalid configuration     | Invalid API key, rate limiting, fallback to defaults, threshold exceeded |
| `ERROR` | Server errors, failed operations               | WebSocket disconnection, authentication failure, unhandled exceptions    |

### Environment Control

Set `LOG_LEVEL` environment variable:

```bash
# .env or environment
LOG_LEVEL=INFO   # Default - INFO, WARN, ERROR
LOG_LEVEL=DEBUG  # All levels including DEBUG
LOG_LEVEL=WARN   # Only WARN and ERROR
LOG_LEVEL=ERROR  # Only ERROR
```

---

## Log Format

### Structure

```
[LEVEL] YYYY-MM-DD HH:mm:ss.SSS [Timezone] [ServiceName] - message
```

### Examples

```
[INFO] 2026-04-15 14:30:45.123 [UTC] [ProxyServerSystem] - Server started on port 7861
[WARN] 2026-04-15 14:31:02.456 [UTC] [ConfigLoader] - LOG_LEVEL not set, using default: INFO
[ERROR] 2026-04-15 14:32:15.789 [UTC] [SessionRegistry] - WebSocket connection failed: Connection reset
[DEBUG] 2026-04-15 14:33:00.111 [UTC] [RequestHandler] - Processing request: {"model": "gemini-pro"}
```

### Implementation

**File**: `src/utils/LoggingService.js:96-107`

```javascript
_formatMessage(level, ...args) {
    const timestamp = new Date().toISOString().replace("T", " ").replace("Z", "");
    const message = args.join(" ");

    const logEntry = {
        level: level,
        timestamp: timestamp,
        service: this.serviceName,
        message: message
    };

    // Add to buffer
    this.logBuffer.push(logEntry);
    if (this.logBuffer.length > this.maxBufferSize) {
        this.logBuffer.shift();
    }

    return `[${level}] ${timestamp} [UTC] [${this.serviceName}] - ${message}`;
}
```

---

## In-Memory Buffer

### Purpose

Store recent logs in memory for debugging and API access.

### Configuration

```javascript
// src/utils/LoggingService.js:13-16
static LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

maxBufferSize = 1000;  // Maximum 1000 log entries
```

### Access via API

**Endpoint**: `GET /api/status`

**File**: `src/routes/StatusRoutes.js:216-229`

```javascript
router.get("/status", (req, res) => {
  const logger = req.app.locals.logger;
  const logs = logger.getLogs(); // Returns log buffer

  res.json({
    status: "ok",
    logs: logs,
  });
});
```

---

## What to Log

### Server Lifecycle

```javascript
// Server startup
this.logger.info("Server started on port", config.httpPort);
this.logger.info("Loaded", modelList.length, "models from config");
this.logger.info("Loaded", authData.length, "auth accounts");

// Server shutdown
this.logger.info("Server shutting down...");
```

### Configuration

```javascript
// Configuration loaded
this.logger.info("Configuration loaded:", JSON.stringify(config));

// Invalid configuration
this.logger.warn("Invalid LOG_LEVEL, using default:", defaultLevel);
```

### WebSocket Connections

```javascript
// Connection established
this.logger.info("WebSocket connected:", connectionId);

// Connection closed
this.logger.info("WebSocket disconnected:", connectionId);

// Connection error
this.logger.error("WebSocket error:", error.message);
```

### Request Processing

```javascript
// Request received
this.logger.debug("Processing request:", request.method, request.path);

// Request completed
this.logger.info("Request completed:", statusCode, "in", duration, "ms");

// Request failed
this.logger.error("Request failed:", error.message);
```

### Session Management

```javascript
// Session created
this.logger.info("Session created:", sessionId);

// Session switched
this.logger.info("Switched to session:", sessionId);

// Session disabled (too many errors)
this.logger.warn("Session disabled due to errors:", sessionId);
```

---

## What NOT to Log

### Sensitive Data

- ❌ API keys (log only first/last 4 characters)
- ❌ User passwords
- ❌ Authentication tokens
- ❌ Personal identifiable information (PII)
- ❌ Full request/response bodies with sensitive data

### Examples

**Bad**:

```javascript
this.logger.info("User logged in:", email, "password:", password);
this.logger.debug("API key:", apiKey);
```

**Good**:

```javascript
this.logger.info("User logged in:", email);
this.logger.debug("API key:", apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4));
```

### High-Frequency Events

- ❌ Every WebSocket message (use DEBUG level for detailed logs)
- ❌ Every ping/pong heartbeat
- ❌ Every log buffer rotation

---

## Logging Patterns

### Class-Based Logging

Each class creates its own logger with service name:

```javascript
// src/core/ProxyServerSystem.js
const LoggingService = require("../utils/LoggingService");

class ProxyServerSystem {
  constructor() {
    this.logger = new LoggingService("ProxyServerSystem");
  }
}
```

### Conditional Logging

Use log level checks for expensive operations:

```javascript
if (this.logger.isDebugEnabled()) {
  this.logger.debug("Detailed state:", JSON.stringify(largeObject));
}
```

### Error Logging

Always log errors with context:

```javascript
try {
  await someOperation();
} catch (error) {
  this.logger.error("Operation failed:", error.message);
  this.logger.debug("Stack trace:", error.stack);
}
```

---

## Examples from Codebase

### 1. Server Startup

**File**: `src/core/ProxyServerSystem.js:66-82`

```javascript
async start() {
    this.logger.info("Starting server...");

    const config = this.configLoader.loadConfiguration();
    this.logger.info("Configuration loaded");
    this.logger.debug("Config:", JSON.stringify(config));

    const authData = await this.authSource.loadAuthData();
    this.logger.info(`Loaded ${authData.length} auth accounts`);

    // ... more startup logic
}
```

### 2. Request Handler

**File**: `src/core/RequestHandler.js:41-65`

```javascript
async handleRequest(req, res) {
    const startTime = Date.now();

    try {
        this.logger.debug("Processing request:", req.method, req.path);

        // ... process request

        const duration = Date.now() - startTime;
        this.logger.info(`Request completed in ${duration}ms`);
    } catch (error) {
        this.logger.error("Request failed:", error.message);
        // ... handle error
    }
}
```

### 3. WebSocket Connection

**File**: `src/core/SessionRegistry.js:34-52`

```javascript
registerConnection(connectionId, ws) {
    this.logger.info("Registering WebSocket connection:", connectionId);

    ws.on("message", (data) => {
        this.logger.debug("Received message from", connectionId);
        // ... handle message
    });

    ws.on("close", () => {
        this.logger.info("WebSocket closed:", connectionId);
        // ... cleanup
    });

    ws.on("error", (error) => {
        this.logger.error("WebSocket error:", error.message);
    });
}
```

---

## Common Mistakes

### 1. Using console.log

**Bad**:

```javascript
console.log("Server started");
console.error("Error:", error);
```

**Good**:

```javascript
this.logger.info("Server started");
this.logger.error("Error:", error.message);
```

### 2. Logging Sensitive Data

**Bad**:

```javascript
this.logger.info("User auth:", authToken);
this.logger.debug("API key:", apiKey);
```

**Good**:

```javascript
this.logger.info("User authenticated");
this.logger.debug("API key: ***" + apiKey.slice(-4));
```

### 3. Missing Context

**Bad**:

```javascript
this.logger.error("Error:", error);
```

**Good**:

```javascript
this.logger.error(`Failed to load auth data for ${sessionId}:`, error.message);
```

### 4. Wrong Log Level

**Bad**:

```javascript
this.logger.error("Server started on port 7861"); // Should be INFO
this.logger.info("WebSocket connection failed"); // Should be ERROR
```

**Good**:

```javascript
this.logger.info("Server started on port 7861");
this.logger.error("WebSocket connection failed");
```
