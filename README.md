# Sinthome Non-Profit Website

A modern, responsive website for Sinthome - a public-interest community focused on reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis.

**Live Site**: [https://yiluo-photon.github.io/sinthome_website/](https://yiluo-photon.github.io/sinthome_website/)

## 🎯 Mission

Knowledge — Critique — Praxis

We are committed to leveraging technology and innovation to create positive social impact through various programs including AI hackathons, worker assistance, sustainable technology initiatives, and educational programs.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.7.5 - Static site generation
- **UI Framework**: [React](https://react.dev/) 19.1.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.1.4
- **Animations**: [Motion](https://motion.dev/) 12.9.2 (Framer Motion successor)
- **Language**: TypeScript 5.9.2
- **Package Manager**: pnpm 9.14.4

## 📦 Installation

### Prerequisites
- Node.js 20.x or higher
- pnpm (will auto-install if not present)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Yiluo-pHoton/sinthome_website.git
cd sinthome_website
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm run dev
```

The site will be available at `http://localhost:4321/sinthome_website/`

## 🛠️ Development

### Available Commands

| Command | Action |
|---------|--------|
| `pnpm run dev` | Start development server at localhost:4321 |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build locally |
| `pnpm run check` | Run TypeScript type checking |
| `pnpm run lint` | Run ESLint |
| `pnpm run format` | Format code with Prettier |

### Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # Reusable UI components
│   ├── forms/       # Google Forms components
│   ├── shared/      # Shared components (ProjectCard, etc.)
│   └── ui/          # UI elements
├── config/          # Configuration files
│   └── forms.ts     # Google Forms configuration
├── content/         # Content collections
├── layouts/         # Page layouts
├── lib/             # Utilities and helpers
│   └── assets.ts    # Asset management with base path handling
├── pages/           # Route pages
│   ├── index.astro  # Homepage
│   ├── who-we-are.astro
│   ├── what-we-do/
│   │   ├── index.astro
│   │   ├── ai-hackathon/
│   │   ├── workers-assist.astro
│   │   ├── plantcore-ai.astro
│   │   └── srtp.astro
│   ├── events.astro
│   ├── contact.astro
│   └── donate.astro
└── styles/          # Global styles
    └── global.css   # Tailwind imports
```

## 🌐 Deployment Configuration

The site supports flexible deployment to either GitHub Pages or a custom domain with a single environment variable change.

### GitHub Pages Deployment (Default)

No configuration needed - the site defaults to GitHub Pages deployment:

```bash
# Builds with base path: /sinthome_website/
pnpm run build
```

### Custom Domain Deployment

To deploy to a custom domain (e.g., sinthome.org):

1. Create a `.env` file:
```bash
DEPLOYMENT_TARGET=custom
CUSTOM_DOMAIN=https://sinthome.org
```

2. Build the site:
```bash
pnpm run build
```

### How It Works

The deployment configuration in `astro.config.mjs`:

```javascript
const DEPLOYMENT_CONFIG = {
  github: {
    site: 'https://yiluo-photon.github.io',
    base: '/sinthome_website/',  // Subpath for GitHub Pages
  },
  custom: {
    site: process.env?.CUSTOM_DOMAIN || 'https://example.com',
    base: '/',  // Root path for custom domain
  }
};
```

## 🔗 Base Path Handling

All navigation links automatically respect the deployment configuration through `import.meta.env.BASE_URL`:

### Implementation Pattern

```typescript
// In Astro components
const finalHref = href.startsWith('/')
  ? `${import.meta.env.BASE_URL}${href.slice(1)}`
  : href;
```

### Files with Base Path Handling

- `src/components/shared/ProjectCard.astro` - Project card links
- `src/pages/what-we-do/index.astro` - Navigation links
- `src/components/TopNavigation.tsx` - Dropdown menu navigation

### Automatic Path Resolution

- **GitHub Pages**: `BASE_URL = "/sinthome_website/"`
  - Links become: `/sinthome_website/what-we-do/ai-hackathon/`
- **Custom Domain**: `BASE_URL = "/"`
  - Links become: `/what-we-do/ai-hackathon/`

## 🚢 Deployment

### GitHub Pages (Automatic)

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

GitHub Actions workflow handles:
1. Building the static site
2. Deploying to GitHub Pages
3. Available at: https://yiluo-photon.github.io/sinthome_website/

### Manual Deployment

For other hosting providers:

```bash
# Build the site
pnpm run build

# The dist/ folder contains the static site
# Upload contents to your hosting provider
```

## 🎨 Design System

### Color Palette
- **Primary**: Red (`#dc2626`, `#ef4444`)
- **Background**: Dark (`#000000`, `#0a0a0a`)
- **Surface**: Zinc-900/950 with transparency
- **Text**: White primary, Zinc-300/400 secondary

### Typography
- **Headings**: League Spartan (bold, geometric)
- **Body**: System font stack

### Components
- Dark theme with red accents
- Glassmorphism effects on cards
- Smooth hover transitions
- Turbulent background animations

## 📝 Content Management

### Google Forms Integration

Contact and registration forms are handled through Google Forms. Configuration in `src/config/forms.ts`:

```typescript
export const FORMS = {
  contact: {
    id: "FORM_ID_HERE",
    url: "https://forms.gle/...",
    title: "Contact Us"
  },
  // ... other forms
};
```

### Adding New Pages

1. Create new `.astro` file in `src/pages/`
2. Use existing layouts (`PageLayout` or `InfoLayout`)
3. Follow the component patterns from existing pages

## 👥 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Create feature branch from `main`
2. Make changes and test locally
3. Ensure build passes: `pnpm run build`
4. Submit pull request to `main`
5. Automated deployment after merge

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Yiluo-pHoton/sinthome_website/issues)
- **Email**: contact@sinthome.org
- **Documentation**: See [CLAUDE.md](CLAUDE.md) for detailed development guide

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Motion](https://motion.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)

---

**Sinthome** - Knowledge — Critique — Praxis

A public-interest community reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis.