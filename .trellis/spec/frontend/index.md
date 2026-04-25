# Frontend Development Guidelines

> Best practices for frontend development in this project.

---

## Overview

This directory contains guidelines for frontend development. Fill in each file with your project's specific conventions.

---

## Guidelines Index

| Guide                                             | Description                              | Status   |
| ------------------------------------------------- | ---------------------------------------- | -------- |
| [Design System](./design-system.md)               | Colors, typography, icons, CSS variables | ✅ Ready |
| [Responsive Design](./responsive-design.md)       | Breakpoints, mobile navigation patterns  | ✅ Ready |
| [Directory Structure](./directory-structure.md)   | Module organization and file layout      | To fill  |
| [Component Guidelines](./component-guidelines.md) | Component patterns, props, composition   | To fill  |
| [Hook Guidelines](./hook-guidelines.md)           | Custom hooks, data fetching patterns     | To fill  |
| [State Management](./state-management.md)         | Local state, global state, server state  | To fill  |
| [Quality Guidelines](./quality-guidelines.md)     | Code standards, forbidden patterns       | To fill  |
| [Type Safety](./type-safety.md)                   | Type patterns, validation                | To fill  |

---

## How to Fill These Guidelines

For each guideline file:

1. Document your project's **actual conventions** (not ideals)
2. Include **code examples** from your codebase
3. List **forbidden patterns** and why
4. Add **common mistakes** your team has made

The goal is to help AI assistants and new team members understand how YOUR project works.

---

**Language**: All documentation should be written in **English**.

---

## Pre-Development Checklist

Before starting frontend development, read these documents:

### New to the project?

1. ✅ [Design System](./design-system.md) — **MUST READ** before any UI work
   - Colors, typography, icons, CSS variables
   - Design philosophy and best practices

2. ✅ [Responsive Design](./responsive-design.md) — **MUST READ** for layout work
   - Breakpoint strategy (desktop-first)
   - Mobile navigation patterns (drawer menu)
   - Responsive grid layouts

3. ✅ [Directory Structure](./directory-structure.md) — Understand project organization
4. ✅ [Component Guidelines](./component-guidelines.md) — Component patterns and conventions

### Working on existing code?

1. ✅ [Design System](./design-system.md) — Ensure new code follows design system
2. ✅ [Responsive Design](./responsive-design.md) — Test responsive breakpoints
3. ✅ Check relevant guidelines for your task (hooks, state management, etc.)
