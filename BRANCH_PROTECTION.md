# Branch Protection Rules

Recommended branch protection rules for the CanvasToAPI repository.

## Main Branch Protection

Navigate to: **Settings → Branches → Add rule**

### Required Settings

- **Branch name pattern**: `main`

- ✅ **Require a pull request before merging**
  - Required approving reviews: `1`
  - Dismiss stale pull request approvals when new commits are pushed: `Yes`
  - Require review from Code Owners: `No` (optional)

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging: `Yes`
  - Status checks:
    - `lint` (if CI configured)
    - `test` (if CI configured)

- ✅ **Require conversation resolution before merging**

- ✅ **Do not allow bypassing the above settings**
  - Include administrators: `Yes`

### Optional Settings

- **Restrict pushing**:
  - Restrict who can push to matching branches
  - Add specific users/teams if needed

- **Restrict deletions**:
  - Allow force pushes: `No`
  - Allow deletions: `No`

## Sync Branch Protection

- **Branch name pattern**: `sync/*`

- ✅ **Restrict deletions**
  - Allow force pushes: `No`
  - Allow deletions: `No`

- ❌ **Require a pull request before merging**
  - This branch is for tracking upstream, direct commits expected

## Feature Branch Protection (Optional)

For team collaboration, you can add rules for feature branches:

- **Branch name pattern**: `feature/*`

- ✅ **Require a pull request before merging**
  - Optional for personal forks, recommended for teams

## Enforcement

These rules ensure:

1. ✅ No direct commits to `main`
2. ✅ All changes go through Pull Requests
3. ✅ At least one reviewer approval required
4. ✅ CI checks must pass before merge
5. ✅ Branches stay updated with base branch
6. ✅ No force pushes or deletions on protected branches

## Bypass Permissions

To temporarily bypass protection rules:

1. **Emergency fixes**: Repository admins can use "Admin override"
2. **CI failures**: Use "Merge without waiting for checks" (requires admin)
3. **Personal fork**: Rules only apply if configured on your fork

## Setup Instructions

### On GitHub

1. Go to repository Settings
2. Click "Branches" in left sidebar
3. Click "Add rule"
4. Enter branch pattern: `main`
5. Check all required settings above
6. Click "Create"

### For Your Fork

If working on your personal fork (`okamitimo233/CanvasToAPI`):

1. You can apply less restrictive rules
2. Minimum recommended: Require PR for `main`
3. Status checks optional if no CI configured

### For Upstream

When contributing to upstream (`iBUHub/CanvasToAPI`):

- Respect upstream protection rules
- Wait for review before merge
- Keep your PR branch updated

---

**Last Updated**: 2026-04-15
**Reference**: [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
