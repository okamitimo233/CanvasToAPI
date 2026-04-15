# Directory Structure

> How backend code is organized in this project.

---

## Overview

The backend follows a **feature-based organization** with clear separation of concerns. Code is organized by functional role (core business logic, routes, utilities) rather than by feature. This keeps related code together and makes the architecture easy to understand.

---

## Directory Layout

```
E:/CanvasToAPI/
├── main.js                    # Entry point - server initialization
├── src/
│   ├── core/                  # Core business logic modules
│   │   ├── ProxyServerSystem.js    # Main orchestrator
│   │   ├── RequestHandler.js       # Request processing
│   │   ├── SessionRegistry.js      # WebSocket connection management
│   │   └── FormatConverter.js      # API format translation
│   ├── auth/                  # Authentication modules
│   │   └── AuthSource.js          # Auth data loading
│   ├── routes/                # Express route handlers
│   │   ├── WebRoutes.js           # Web UI routes
│   │   ├── AuthRoutes.js          # Auth validation routes
│   │   └── StatusRoutes.js        # Status API routes
│   └── utils/                 # Shared utilities
│       ├── LoggingService.js      # Logging utility
│       ├── ConfigLoader.js        # Configuration loader
│       ├── CustomErrors.js        # Custom error classes
│       ├── MessageQueue.js        # Request/response queue
│       └── VersionChecker.js      # Version checking
├── configs/
│   ├── auth/                  # Authentication data (auth-N.json)
│   │   ├── auth-0.json
│   │   ├── auth-1.json
│   │   └── ...
│   └── models.json            # Model configuration
├── scripts/                   # Utility scripts
│   ├── client/                # Client test scripts
│   ├── auth/                  # Auth test scripts
│   └── sync-share-link.js     # Share link sync
└── test/                      # Test files
```

---

## Module Organization

### Core Modules (`src/core/`)

**Purpose**: Main business logic and orchestrators

**Pattern**: Class-based modules with dependency injection

**When to add here**:

- New orchestrator/system classes
- Request/response processing logic
- WebSocket/communication management
- Format conversion between APIs

**Examples**:

- `ProxyServerSystem.js` - Main orchestrator that integrates all modules
- `RequestHandler.js` - Processes API requests with retry logic
- `SessionRegistry.js` - Manages WebSocket connections from browser contexts

### Routes (`src/routes/`)

**Purpose**: HTTP route definitions and request routing

**Pattern**: Express route handlers that delegate to core modules

**When to add here**:

- New API endpoints
- Web UI routes
- Authentication/validation routes

**Examples**:

- `WebRoutes.js` - Coordinates web UI routes, delegates to specialized handlers
- `AuthRoutes.js` - API key authentication endpoints
- `StatusRoutes.js` - Server status and log endpoints

### Utilities (`src/utils/`)

**Purpose**: Shared functionality used across multiple modules

**Pattern**: Utility classes and helper functions

**When to add here**:

- Logging utilities
- Configuration loaders
- Custom error types
- Message queues
- Shared helpers

**Examples**:

- `LoggingService.js` - Custom logging with levels and buffer
- `ConfigLoader.js` - Loads config from env vars and files
- `CustomErrors.js` - `UserAbortedError`, `QueueClosedError`, etc.

---

## Naming Conventions

### Files

- **Class files**: PascalCase matching the class name
  - Example: `ProxyServerSystem.js`, `RequestHandler.js`
- **Utility files**: PascalCase for classes, camelCase for functions
  - Example: `LoggingService.js` (class), `escapeHtml.js` (function)
- **Route files**: PascalCase with descriptive names
  - Example: `WebRoutes.js`, `AuthRoutes.js`

### Directories

- **Feature directories**: lowercase with hyphens
  - Example: `core/`, `auth/`, `routes/`, `utils/`
- **Config directories**: lowercase
  - Example: `configs/`, `scripts/`, `test/`

### Classes

- **PascalCase** for class names
- **camelCase** for methods and properties
- Example: `SessionRegistry` class with `registerSession()` method

---

## Configuration Files

### Location

All configuration files go in `configs/`:

- `configs/models.json` - Model definitions (Gemini models)
- `configs/auth/auth-N.json` - Browser context auth data (Playwright format)

### Loading Pattern

Use `ConfigLoader` utility to load configuration:

```javascript
const ConfigLoader = require("./utils/ConfigLoader");
const config = ConfigLoader.loadConfiguration();
```

---

## Examples

### Well-Organized Modules

1. **`src/core/ProxyServerSystem.js`**: Main orchestrator that demonstrates:
   - Clear dependency injection in constructor
   - Integration of multiple sub-modules
   - Lifecycle management (start/stop methods)
   - Event-driven architecture with EventEmitter

2. **`src/utils/LoggingService.js`**: Utility class that demonstrates:
   - Singleton pattern
   - Clear separation of concerns (formatting, buffering, levels)
   - Environment-aware behavior

3. **`src/routes/StatusRoutes.js`**: Route handler that demonstrates:
   - Express route organization
   - Delegation to core modules
   - Error handling patterns

---

## Anti-Patterns to Avoid

1. **Don't put business logic in routes** - Routes should delegate to core modules
2. **Don't create circular dependencies** - Keep dependency graph clean
3. **Don't scatter configuration** - Use `ConfigLoader` and `configs/` directory
4. **Don't duplicate utilities** - Check `src/utils/` before creating new helpers
