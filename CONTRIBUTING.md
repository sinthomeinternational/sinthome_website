# Contributing to Sinthome Website

## Quick Start for New Developers

```bash
# Clone and setup
git clone https://github.com/Yiluo-pHoton/sinthome_website.git
cd sinthome_website

# Install dependencies (requires pnpm)
pnpm install

# Start development
make dev
# OR
pnpm run dev
```

## Development Workflow

### 1. Branch Strategy
- **main**: Production branch (auto-deploys to GitHub Pages)
- **withcontent**: Current development branch with populated content
- **feature/**: Feature branches for new work

### 2. Creating a New Feature

```bash
# Method 1: Using Makefile (recommended)
make feature name=my-feature-name

# Method 2: Manual
git checkout main
git pull origin main
git checkout -b feature/my-feature-name
```

### 3. Development Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start development server |
| `make build` | Build for production |
| `make check` | Run all quality checks |
| `make format` | Format code |
| `make lint` | Check code quality |
| `make clean` | Clean build artifacts |
| `make reset` | Reset project (clean + reinstall) |

### 4. Code Quality Standards

#### Automatic Formatting
- Prettier is configured to format on save
- Run `make format` to format all files
- Configuration in `.prettierrc`

#### Linting
- ESLint configured for TypeScript, React, and Astro
- Run `make lint` to check issues
- Run `make lint-fix` to auto-fix issues

#### Type Checking
- TypeScript strict mode enabled
- Run `make check` for Astro type checking
- Run `make type-check` for TypeScript checking

### 5. Pre-commit Hooks
Automatic checks before each commit:
- Code formatting with Prettier
- Linting with ESLint
- Type checking with TypeScript and Astro
- Build verification

To install hooks:
```bash
pnpm add -D husky
pnpm exec husky install
```

## Project Structure

```
src/
├── assets/           # Images and static resources
├── components/       # Reusable UI components
│   ├── forms/       # Google Forms components
│   ├── navigation/  # Navigation components
│   ├── shared/      # Shared components
│   └── ui/          # UI elements
├── config/          # Configuration files
├── content/         # Content collections (markdown)
├── layouts/         # Page layouts
├── lib/             # Utilities and helpers
├── pages/           # Route pages
└── styles/          # Global styles
```

## Component Guidelines

### File Naming
- **Astro components**: PascalCase.astro (e.g., `Hero.astro`)
- **React components**: PascalCase.tsx (e.g., `Navigation.tsx`)
- **Utilities**: camelCase.ts (e.g., `utils.ts`)

### Component Structure
```astro
---
// Astro frontmatter
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component-class">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<style>
.component-class {
  /* Component-specific styles */
}
</style>
```

### Styling Guidelines
- Use Tailwind CSS for styling
- Dark theme: black/zinc backgrounds, red accents, white text
- Responsive design: mobile-first approach
- Use semantic class names for complex components

## Content Management

### Adding New Projects
1. Create markdown file in `src/content/projects/`
2. Follow schema in `src/content/config.ts`
3. Add images to `src/assets/`
4. Update project cards in relevant pages

### Google Forms Integration
- Configuration in `src/config/forms.ts`
- Use `GoogleForm.tsx` component for embedding
- Test forms in development before deploying

## Deployment

### Automatic Deployment
- Pushes to `main` branch trigger GitHub Actions
- Site deploys to: https://yiluo-photon.github.io/sinthome_website
- Build status visible in Actions tab

### Before Merging to Main
```bash
# Run full quality check
make deploy-check

# This runs:
# - ESLint checks
# - Prettier formatting
# - TypeScript type checking
# - Astro build verification
```

## Troubleshooting

### Common Issues

1. **"Module not found" errors**
   ```bash
   make reset  # Clean and reinstall dependencies
   ```

2. **TypeScript errors**
   ```bash
   make check          # Astro type checking
   make type-check     # TypeScript checking
   ```

3. **Build failures**
   ```bash
   make clean && make build
   ```

4. **Prettier/ESLint conflicts**
   ```bash
   make format && make lint-fix
   ```

### Development Tips
- Use `make dev-debug` for verbose development output
- Check `.vscode/settings.json` for IDE configuration
- Install recommended VS Code extensions
- Clear browser cache if changes don't appear locally

## Getting Help
- Check existing issues on GitHub
- Review this documentation
- Ask questions in team channels
- Create detailed issue reports with reproduction steps

## Performance Guidelines
- Optimize images using Astro's `<Image>` component
- Use `client:load` sparingly for React components
- Prefer `client:visible` for below-fold content
- Test on mobile devices regularly

## Accessibility
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios