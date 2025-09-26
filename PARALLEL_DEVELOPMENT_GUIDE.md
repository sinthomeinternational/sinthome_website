# Parallel Development Best Practices

## Problem: Branch Content Contamination

When working on multiple features simultaneously, changes from one feature branch can accidentally end up in another. This guide provides strategies to prevent this.

## Solution 1: Git Worktrees (Recommended)

Git worktrees allow you to have multiple branches checked out simultaneously in different directories.

### Setup
```bash
# From your main repo directory
cd sinthome_website

# Create a worktree for each feature
git worktree add ../sinthome-srtp nadie/feat-srtp-content-refinement
git worktree add ../sinthome-warp nadie/feat-warp-background-tester

# Now you have:
# sinthome_website/        (main branch)
# sinthome-srtp/           (SRTP feature)
# sinthome-warp/           (Warp feature)
```

### Benefits
- Each feature has its own directory
- No accidental branch switching
- Can run multiple dev servers on different ports
- Clear separation of work

### Working with Worktrees
```bash
# Terminal 1: SRTP feature
cd ../sinthome-srtp
pnpm run dev  # Runs on port 4321

# Terminal 2: Warp feature
cd ../sinthome-warp
pnpm run dev  # Runs on port 4322

# Terminal 3: Main branch
cd ../sinthome_website
pnpm run dev  # Runs on port 4323
```

### Cleanup
```bash
# Remove a worktree when done
git worktree remove ../sinthome-srtp
git worktree list  # See all worktrees
```

## Solution 2: Stash-Based Workflow

If you must work in a single directory, use git stash strategically.

### Before Switching Branches
```bash
# Save current work
git add .
git stash push -m "WIP: SRTP content changes"

# Switch branch
git checkout nadie/feat-warp-background-tester

# Work on new feature...

# Before switching back
git add .
git stash push -m "WIP: Warp animation tweaks"

# Return to original branch
git checkout nadie/feat-srtp-content-refinement
git stash pop  # or git stash apply
```

## Solution 3: Branch Protection Rules

### 1. Always Start from Main
```bash
# Create new features from main, not from other features
git checkout main
git pull origin main
git checkout -b nadie/feat-new-feature
```

### 2. Regular Rebasing
```bash
# Keep your branch updated with main
git checkout main
git pull origin main
git checkout nadie/feat-srtp-content-refinement
git rebase main
```

### 3. Use Feature Flags
For truly parallel development, consider feature flags:

```typescript
// config/features.ts
export const FEATURES = {
  SRTP_ENHANCED: process.env.ENABLE_SRTP_ENHANCED === 'true',
  WARP_ANIMATION: process.env.ENABLE_WARP_ANIMATION === 'true',
};

// In component
import { FEATURES } from '@/config/features';

{FEATURES.SRTP_ENHANCED ? <EnhancedSRTP /> : <BasicSRTP />}
```

## Solution 4: Terminal/IDE Organization

### VSCode Workspaces
Create a `.code-workspace` file for each feature:

```json
// srtp.code-workspace
{
  "folders": [
    {
      "name": "SRTP Feature",
      "path": "../sinthome-srtp"
    }
  ],
  "settings": {
    "workbench.colorTheme": "GitHub Dark"  // Different theme as visual cue
  }
}
```

### Terminal Naming
```bash
# Name your terminal sessions
# In iTerm2: Cmd+Shift+I → Set Name
# In Terminal: Shell → Edit Title

# Terminal 1: "SRTP Development"
# Terminal 2: "Warp Animation"
# Terminal 3: "Main Branch"
```

## Prevention Checklist

Before starting work:
- [ ] Check current branch: `git branch --show-current`
- [ ] Verify clean working directory: `git status`
- [ ] Pull latest changes: `git pull origin [branch-name]`
- [ ] Confirm correct dev server port in browser

Before committing:
- [ ] Review changes: `git diff`
- [ ] Check you're on correct branch: `git branch --show-current`
- [ ] Ensure changes match branch purpose
- [ ] Run `git status` to see modified files

## Quick Commands Reference

```bash
# Check current branch
git branch --show-current

# See all local branches
git branch

# See what files were changed
git status

# See actual changes
git diff

# See commits on current branch
git log --oneline -10

# Compare with another branch
git diff nadie/feat-warp-background-tester

# Cherry-pick a commit from wrong branch
git cherry-pick <commit-hash>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Move uncommitted changes to correct branch
git stash
git checkout correct-branch
git stash pop
```

## Recovery: When Things Go Wrong

### Accidentally Committed to Wrong Branch
```bash
# Option 1: Move the commit
git log --oneline  # Find the commit hash
git checkout correct-branch
git cherry-pick <commit-hash>
git checkout wrong-branch
git reset --hard HEAD~1  # Remove from wrong branch

# Option 2: Create new branch from current state
git checkout -b nadie/feat-correct-feature
# Now the changes are on the new branch
```

### Mixed Changes from Multiple Features
```bash
# Use interactive staging
git add -p  # Pick specific chunks
# or
git add file1.tsx file2.astro  # Add specific files

# Commit feature 1 changes
git commit -m "feat: Feature 1 changes"

# Stash remaining changes for feature 2
git stash push -m "Feature 2 changes"

# Switch to feature 2 branch and apply
git checkout feature-2-branch
git stash pop
```

## Recommended Workflow for Sinthome Project

1. **Use Git Worktrees** for major features
2. **Name terminal sessions** clearly
3. **Use different VSCode windows** with color coding
4. **Commit frequently** with clear messages
5. **Check branch before starting** any work
6. **Use branch naming convention**: `nadie/feat-description`

## Team Communication

When working in parallel:
1. Announce in team chat: "Working on SRTP content in branch X"
2. Create draft PRs early for visibility
3. Update PR descriptions with current status
4. Tag teammates if branches might conflict

---

*Last Updated: September 2025*
*Remember: An ounce of prevention is worth a pound of cure!*