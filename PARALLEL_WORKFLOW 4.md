# Parallel Development Workflow Guide

## Overview
This guide explains how to work on multiple features simultaneously in the same repository using Git worktrees and multiple terminals.

## Setup Instructions

### Method 1: Git Worktrees (Recommended)
Git worktrees allow you to have multiple branches checked out simultaneously in different directories.

#### Initial Setup
```bash
# From your main repository directory
# Create a worktree for a new feature
git worktree add ../sinthome_website-feature2 main

# Create another worktree for a different feature
git worktree add ../sinthome_website-feature3 development
```

#### Directory Structure After Setup
```
website/
├── sinthome_website/           # Main worktree (current branch)
├── sinthome_website-feature2/  # Worktree for feature 2
└── sinthome_website-feature3/  # Worktree for feature 3
```

#### Working with Worktrees
```bash
# List all worktrees
git worktree list

# Remove a worktree when done
git worktree remove ../sinthome_website-feature2

# Or if you deleted the folder manually
git worktree prune
```

### Method 2: Same Directory, Different Branches
If you prefer to work in the same directory, you'll need to manage your changes carefully.

#### Using Git Stash
```bash
# Terminal 1: Save current work
git add .
git stash push -m "WIP: feature A"

# Switch to different branch
git checkout feature-b

# Terminal 2: Work on feature-b
# ...

# Terminal 1: Return to original work
git checkout feature-a
git stash pop
```

## Running Multiple Development Servers

### Default Ports Configuration
- **Terminal 1 (Main)**: `pnpm run dev` (port 4321)
- **Terminal 2 (Alt)**: `pnpm run dev:alt` (port 4322)
- **Custom Port**: `pnpm run dev:port 4323` (specify any port)

### Example Workflow
```bash
# Terminal 1 - Main worktree
cd ~/path/to/sinthome_website
pnpm run dev
# Runs on http://localhost:4321

# Terminal 2 - Feature worktree
cd ~/path/to/sinthome_website-feature2
pnpm run dev:alt
# Runs on http://localhost:4322
```

## Best Practices

### 1. Branch Management
- Create feature branches from main: `git checkout -b nadie/feat-feature-name`
- Keep branches focused on single features
- Regularly sync with main: `git pull origin main`

### 2. Commit Frequently
```bash
# Save work often to avoid conflicts
git add .
git commit -m "feat: implement component X"
```

### 3. Communication
- Communicate which features you're working on
- Avoid working on the same files simultaneously
- Use the project's branch naming convention

### 4. Resource Management
- Each dev server uses memory and CPU
- Close unused servers when not needed
- Monitor system resources if running multiple servers

### 5. Dependency Management
```bash
# If package.json changes in one worktree
# Update other worktrees:
cd ../sinthome_website-feature2
git pull origin main
pnpm install
```

## Common Commands Reference

### Worktree Management
```bash
# Create worktree from specific branch
git worktree add -b new-feature ../project-new-feature origin/main

# List worktrees with details
git worktree list --porcelain

# Clean up stale worktree references
git worktree prune -v
```

### Port Management
```bash
# Check if port is in use
lsof -i :4321

# Kill process on specific port (if needed)
kill -9 $(lsof -t -i:4321)
```

### Switching Between Worktrees
```bash
# Quick switch using cd
cd ../sinthome_website-feature2

# Or use aliases in your shell config
alias ws1='cd ~/path/to/sinthome_website'
alias ws2='cd ~/path/to/sinthome_website-feature2'
```

## Troubleshooting

### Port Already in Use
```bash
# Error: Port 4321 is already in use
# Solution: Use alternative port
pnpm run dev:alt  # Uses port 4322
```

### Worktree Conflicts
```bash
# Error: 'feature-branch' is already checked out
# Solution: Use different branch or remove existing worktree
git worktree remove ../old-worktree
```

### Dependencies Out of Sync
```bash
# Error: Module not found after switching
# Solution: Reinstall dependencies
pnpm install
```

### Git Index Lock
```bash
# Error: Unable to create '.git/index.lock'
# Solution: Remove lock file
rm .git/index.lock
```

## Example Scenario: Working on Two Features

### Feature A: Navigation Update (Terminal 1)
```bash
# Setup
cd ~/Work/sinthome_website
git checkout -b nadie/feat-navigation-update
pnpm run dev  # Port 4321

# Work on navigation
# Edit src/components/TopNavigation.tsx
# Test at http://localhost:4321
```

### Feature B: Footer Redesign (Terminal 2)
```bash
# Setup worktree
git worktree add ../sinthome_website-footer nadie/feat-footer-redesign
cd ../sinthome_website-footer
pnpm install
pnpm run dev:alt  # Port 4322

# Work on footer
# Edit src/components/Footer.astro
# Test at http://localhost:4322
```

### Merging Features
```bash
# Complete Feature A
cd ~/Work/sinthome_website
git add .
git commit -m "feat: update navigation component"
git push origin nadie/feat-navigation-update

# Complete Feature B
cd ../sinthome_website-footer
git add .
git commit -m "feat: redesign footer layout"
git push origin nadie/feat-footer-redesign

# Create PRs for both features
# After merge, clean up worktree
cd ~/Work/sinthome_website
git worktree remove ../sinthome_website-footer
```

## Tips for Efficiency

1. **Use tmux or screen** for persistent terminal sessions
2. **Set up VSCode workspaces** for each worktree
3. **Use git aliases** for common commands
4. **Configure different browser profiles** for testing
5. **Use environment variables** for feature flags

## Safety Checks

Before pushing changes:
1. ✅ Run `pnpm run check` in each worktree
2. ✅ Test both features don't conflict
3. ✅ Ensure no accidental cross-contamination
4. ✅ Verify correct branch for each change

## Conclusion

Parallel development using Git worktrees provides the cleanest separation between features, while the stash method works well for quick switches. Choose the method that best fits your workflow and team coordination needs.

---

Last Updated: December 2024