# Git Workflow Guide

This document defines the Git workflow for CanvasToAPI project, based on GitHub Flow principles.

## Branch Strategy

### Long-lived Branches

| Branch          | Purpose                                       | Protection              |
| --------------- | --------------------------------------------- | ----------------------- |
| `main`          | Primary development branch, always deployable | Required PR for changes |
| `sync/upstream` | Track upstream repository for periodic sync   | No direct commits       |

### Short-lived Branches

Create from `main`, merge back via PR, then delete:

| Pattern      | Example                      | Purpose               |
| ------------ | ---------------------------- | --------------------- |
| `feature/*`  | `feature/add-claude-support` | New features          |
| `fix/*`      | `fix/websocket-reconnect`    | Bug fixes             |
| `refactor/*` | `refactor/session-registry`  | Code refactoring      |
| `docs/*`     | `docs/api-reference`         | Documentation updates |
| `chore/*`    | `chore/update-dependencies`  | Maintenance tasks     |

## Workflow

### 1. Starting New Work

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Or use shorthand
git checkout -b fix/bug-description main
```

### 2. Development

```bash
# Make commits with clear messages
git add <files>
git commit -m "feat: add Claude API support"

# Keep branch updated with main
git fetch origin
git rebase origin/main  # or: git merge origin/main
```

**Commit Message Convention** (Conventional Commits):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### 3. Push Changes

```bash
# Push to your fork
git push origin feature/your-feature-name

# If branch already exists and you rebased
git push origin feature/your-feature-name --force-with-lease
```

### 4. Create Pull Request

1. Go to GitHub: https://github.com/okamitimo233/CanvasToAPI
2. Click "Compare & pull request"
3. Base: `main` ← Compare: `feature/your-feature-name`
4. Fill in PR template:
   - Clear title and description
   - Link related issues
   - Add test results
   - Request reviewers

### 5. After Merge

```bash
# Switch back to main
git checkout main

# Pull merged changes
git pull origin main

# Delete local feature branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name
```

## Syncing with Upstream

CanvasToAPI is a fork of [iBUHub/CanvasToAPI](https://github.com/iBUHub/CanvasToAPI). Sync periodically:

### Quick Sync

```bash
# Fetch upstream changes
git fetch upstream

# Checkout sync branch
git checkout sync/upstream

# Update sync branch
git merge upstream/main

# Switch to main
git checkout main

# Merge updates
git merge sync/upstream

# Push to your fork
git push origin main
```

### Advanced: Rebase Your Commits

If you have local commits on `main`:

```bash
# Fetch and rebase
git fetch upstream
git rebase upstream/main

# Force push (use with caution)
git push origin main --force-with-lease
```

⚠️ **Warning**: Rebase rewrites history. Only use `--force-with-lease` if:

- You're working on a personal fork
- No one else is collaborating on the same branch
- You understand the implications

## Release Process

### Create Release

```bash
# Ensure main is ready
git checkout main
git pull origin main

# Create version tag
git tag -a v0.0.9 -m "Release v0.0.9: Add Claude API support"

# Push tag
git push origin v0.0.9
```

### GitHub Release

1. Go to https://github.com/okamitimo233/CanvasToAPI/releases
2. Click "Draft a new release"
3. Select tag (e.g., `v0.0.9`)
4. Fill in release notes:
   - What's new
   - Breaking changes
   - Upgrade guide
5. Publish release

## Branch Protection Rules

Recommended rules for `main`:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators

Configure at: Settings → Branches → Add rule

## Common Scenarios

### Undo Last Commit (Not Pushed)

```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Already Pushed)

```bash
git revert HEAD
git push origin main
```

### Save Work in Progress

```bash
git stash push -m "WIP: feature description"
git stash pop  # restore later
```

### Fix Commit Message

```bash
# Not pushed yet
git commit --amend -m "New message"

# Already pushed
git commit --amend -m "New message"
git push origin feature/your-branch --force-with-lease
```

## Git Aliases (Optional)

Add to `~/.gitconfig`:

```ini
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --graph --oneline --all --decorate
    sync = "!git fetch upstream && git checkout sync/upstream && git merge upstream/main && git checkout main && git merge sync/upstream"
```

## Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Fork Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)

---

**Last Updated**: 2026-04-15
**Maintainer**: @okamitimo233
