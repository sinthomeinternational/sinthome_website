# Sinthome Non-Profit Website

A modern, responsive website for Sinthome - a public-interest community focused on reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis.

**Live Site**: [https://sinthome-website.vercel.app/](https://sinthome-website.vercel.app/) - Deployed on Vercel with automatic branch previews

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
├── assets/             # Images and static assets
├── components/         # Reusable UI components (organized by feature)
│   ├── forms/         # Form components
│   │   └── GoogleForm.tsx
│   ├── layout/        # Layout components
│   │   ├── Footer.astro
│   │   └── TopNavigation.tsx
│   ├── navigation/    # Navigation-specific components
│   │   └── Dropdown.tsx
│   ├── shared/        # Shared/domain components
│   │   ├── EventCard.astro
│   │   └── ProjectCard.astro
│   └── ui/            # Generic UI elements
│       ├── Button.tsx
│       ├── Card.astro
│       ├── ExternalLink.astro
│       ├── H1.astro
│       ├── LinkButton.astro
│       └── WarpBackground.tsx
├── config/            # Configuration files
│   ├── forms.ts      # Google Forms configuration
│   └── site.ts       # Site-wide configuration
├── content/           # Content collections
├── layouts/           # Page layouts
│   ├── BaseLayout.astro    # Consolidated base layout
│   ├── InfoLayout.astro    # Info pages layout
│   ├── PageLayout.astro    # Standard page layout
│   └── RootLayout.astro    # Root HTML structure
├── lib/               # Utilities and helpers
│   └── assets.ts     # Asset management with base path handling
├── pages/             # Route pages
│   ├── index.astro   # Homepage
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
├── styles/            # Global styles
│   └── global.css    # Tailwind imports
└── types/             # TypeScript type definitions
    └── index.ts      # Shared interfaces and types
```

## 🌐 Deployment

### Vercel Deployment (Primary)

The site is configured for automatic deployment on Vercel:

**Workflow:**
1. Push changes to GitHub
2. Vercel automatically builds and deploys
3. Each branch gets a unique preview URL
4. Main branch deploys to production

**Build Commands:**
```bash
# Local development (static)
pnpm run dev
pnpm run build

# Vercel deployment (SSR)
pnpm run build:vercel
```

### Configuration Files

**Optional Vercel-specific files (not required for basic deployment):**
- `astro.config.vercel.mjs` - SSR configuration with Vercel adapter
- `vercel.json` - Build settings and rewrites

These files are only used when:
- You need SSR features (API routes, dynamic content)
- You want custom build settings
- You're deploying complex routes

### GitHub Pages (Alternative)

For static GitHub Pages deployment:

```bash
# Use default config
pnpm run build
```

The `astro.config.mjs` defaults to static generation suitable for GitHub Pages

## 🔗 Environment-Specific Features

### Vercel Features
- Server-side rendering (SSR)
- Edge functions
- Image optimization
- Web analytics
- Automatic HTTPS
- Branch previews

### Local Development
Use standard Astro commands for local testing:
```bash
pnpm run dev        # Start dev server
pnpm run build      # Build static site
pnpm run preview    # Preview build
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

### Component Library

#### UI Components
- **Button** (`Button.tsx`) - 5 variants (primary, secondary, outline, ghost, danger), 3 sizes
- **LinkButton** (`LinkButton.astro`) - Link styled as button with same variants
- **Card** (`Card.astro`) - 4 variants (default, elevated, gradient, bordered) with hover effects
- **H1** - Styled heading component
- **ExternalLink** - External link with security attributes
- **WarpBackground** - Animated turbulent background

#### Layout Components
- **BaseLayout** - Consolidated layout with 3 variants (default, info, minimal)
- **TopNavigation** - Main navigation with dropdown support
- **Footer** - Site footer with social links

### Design Patterns
- Dark theme with red accents
- Glassmorphism effects on cards
- Smooth hover transitions
- Turbulent background animations
- Component-based architecture with TypeScript

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
- Deployed on [Vercel](https://vercel.com/)

---

**Sinthome** - Knowledge — Critique — Praxis

A public-interest community reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis.