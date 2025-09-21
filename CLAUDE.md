# Sinthome Non-Profit Website - Development Guide

## Project Overview

A modern non-profit website built with Astro 5.7.5, featuring React components, Tailwind CSS, and smooth animations. The site includes multiple pages for organizational information, project showcases, events, and donation capabilities.

## Tech Stack

- **Framework**: Astro 5.7.5 with React integration
- **Styling**: Tailwind CSS 4.1.4 with Typography plugin
- **Language**: TypeScript (strict mode)
- **Animations**: Motion (framer-motion successor)
- **Deployment**: GitHub Pages (static site)
- **Forms**: Google Forms (embedded)
- **Repository**: https://github.com/Yiluo-pHoton/sinthome_website

## Multi-Developer Workflow

### Branch Strategy

We use a feature branch workflow to enable parallel development:

```
main (production - deployed to GitHub Pages)
  └── development (integration)
       ├── feature/navigation-dropdown
       ├── feature/homepage-redesign
       ├── feature/who-we-are-page
       ├── feature/what-we-do-pages
       ├── feature/ai-hackathon-page
       ├── feature/workers-assist-page
       ├── feature/plantcore-ai-page
       ├── feature/srtp-page
       ├── feature/events-page
       ├── feature/contact-page
       ├── feature/donate-page
       └── feature/shared-components
```

### Team Assignments

| Developer | Branches | Responsibilities |
|-----------|----------|------------------|
| **Dev 1** | `feature/navigation-dropdown`, `feature/shared-components` | Navigation with dropdown, reusable components |
| **Dev 2** | `feature/homepage-redesign`, `feature/who-we-are-page` | Homepage with CTAs, Who We Are page |
| **Dev 3** | `feature/what-we-do-pages`, all project pages | What We Do section and individual project pages |
| **Dev 4** | `feature/events-page`, `feature/contact-page`, `feature/donate-page` | Community and engagement pages |

### Git Workflow Commands

```bash
# Start new feature
git checkout development
git pull origin development
git checkout -b feature/[feature-name]

# Work on feature
git add .
git commit -m "feat: [description]"
git push origin feature/[feature-name]

# Create Pull Request to development branch via GitHub

# After PR approval and merge
git checkout development
git pull origin development

# Deploy to production (team lead only)
git checkout main
git merge development
git push origin main
# GitHub Actions will automatically deploy to GitHub Pages
```

### Commit Message Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

## GitHub Pages Deployment Setup

### Configuration Changes Required

1. **Update astro.config.mjs** for static generation:
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Change from 'server' to 'static' for GitHub Pages
  output: 'static',

  // Set your GitHub Pages URL
  site: 'https://yiluo-photon.github.io',
  base: '/sinthome_website',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  // Remove Vercel adapter
  // adapter: vercel() <- Remove this
});
```

2. **Create GitHub Actions Workflow** (.github/workflows/deploy.yml):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Update package.json** - Remove Vercel dependency:
```json
{
  "dependencies": {
    // Remove: "@astrojs/vercel": "^8.1.4",
    // Keep all other dependencies
  }
}
```

### GitHub Repository Settings

1. Go to Settings → Pages
2. Source: Deploy from GitHub Actions
3. The site will be available at: `https://yiluo-photon.github.io/sinthome_website`

### Custom Domain (Optional)

If you have a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Update DNS settings to point to GitHub Pages
3. Update the `site` config in astro.config.mjs

## Google Forms Integration

### Setting Up Google Forms

1. **Create Forms**
   - Contact Form: General inquiries
   - Volunteer Sign-up Form: For event volunteers
   - Event Registration Forms: One per event
   - Donation Interest Form: For donation inquiries
   - Newsletter Sign-up: Email list

2. **Get Embed Code**
   - In Google Forms, click "Send"
   - Click the embed icon (< >)
   - Copy the iframe code
   - Note the form ID from the URL

3. **Create Reusable Component**

```typescript
// src/components/forms/GoogleForm.tsx
interface GoogleFormProps {
  formId: string;
  title: string;
  height?: string;
  className?: string;
}

export default function GoogleForm({
  formId,
  title,
  height = "600px",
  className = ""
}: GoogleFormProps) {
  return (
    <div className={`google-form-container ${className}`}>
      <iframe
        src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
        width="100%"
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={title}
      >
        Loading…
      </iframe>
    </div>
  );
}
```

4. **Alternative: Link to Form**

```astro
<!-- src/components/forms/FormButton.astro -->
---
interface Props {
  formUrl: string;
  text: string;
  className?: string;
}

const { formUrl, text, className = "" } = Astro.props;
---

<a
  href={formUrl}
  target="_blank"
  rel="noopener noreferrer"
  class={`inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${className}`}
>
  {text}
  <span class="sr-only">(opens in new tab)</span>
</a>
```

### Forms Configuration

Create a central configuration file for all forms:

```typescript
// src/config/forms.ts
export const FORMS = {
  contact: {
    id: "1FAIpQLSf...", // Your Google Form ID
    url: "https://forms.gle/...", // Short URL
    title: "Contact Us",
    height: "800px"
  },
  volunteer: {
    id: "1FAIpQLSf...",
    url: "https://forms.gle/...",
    title: "Volunteer Sign-up",
    height: "1000px"
  },
  newsletter: {
    id: "1FAIpQLSf...",
    url: "https://forms.gle/...",
    title: "Newsletter Subscription",
    height: "400px"
  },
  donation: {
    id: "1FAIpQLSf...",
    url: "https://forms.gle/...",
    title: "Donation Interest",
    height: "600px"
  },
  // Event-specific forms
  events: {
    aiHackathon: {
      id: "1FAIpQLSf...",
      url: "https://forms.gle/...",
      title: "AI Hackathon Registration",
      height: "900px"
    }
  }
} as const;
```

### Implementation Examples

**Contact Page with Embedded Form:**
```astro
---
// src/pages/contact.astro
import Layout from '../layouts/Layout.astro';
import GoogleForm from '../components/forms/GoogleForm';
import { FORMS } from '../config/forms';
---

<Layout title="Contact Us">
  <main>
    <h1>Contact Us</h1>

    <!-- Embedded Google Form -->
    <GoogleForm
      formId={FORMS.contact.id}
      title={FORMS.contact.title}
      height={FORMS.contact.height}
      client:load
    />

    <!-- Alternative: Link to form -->
    <p>Prefer to open in a new tab?</p>
    <a href={FORMS.contact.url} target="_blank">
      Open Contact Form
    </a>
  </main>
</Layout>
```

**Event Registration with Form Link:**
```astro
---
// src/components/EventCard.astro
import { FORMS } from '../config/forms';

interface Props {
  title: string;
  date: string;
  description: string;
  formKey?: keyof typeof FORMS.events;
}

const { title, date, description, formKey } = Astro.props;
---

<div class="event-card">
  <h3>{title}</h3>
  <p>{date}</p>
  <p>{description}</p>

  {formKey && (
    <a
      href={FORMS.events[formKey].url}
      target="_blank"
      class="register-btn"
    >
      Register Now
    </a>
  )}
</div>
```

### Styling Google Forms

Add custom CSS to better integrate forms:

```css
/* src/styles/forms.css */
.google-form-container {
  max-width: 100%;
  margin: 2rem auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.google-form-container iframe {
  border-radius: 4px;
  background: white;
}

/* Dark mode compatibility */
@media (prefers-color-scheme: dark) {
  .google-form-container {
    filter: brightness(0.9);
  }
}
```

### Form Response Handling

Google Forms automatically:
- Collects responses in Google Sheets
- Sends email notifications (if configured)
- Provides response analytics
- Allows CSV export

To set up notifications:
1. Open your Google Form
2. Go to Responses tab
3. Click three dots menu
4. Select "Get email notifications for new responses"

## Project Structure

```
src/
├── actions/          # Server actions (limited for static site)
├── assets/           # Images and static resources
├── components/       # Reusable UI components
│   ├── navigation/   # Navigation components
│   ├── forms/        # Google Forms components
│   ├── shared/       # Shared components
│   └── ui/          # UI elements
├── config/          # Configuration files
│   └── forms.ts     # Google Forms configuration
├── content/          # Content collections
│   ├── config.ts    # Collection schemas
│   ├── projects/    # Project markdown files
│   └── events/      # Event markdown files
├── layouts/          # Page layouts
├── lib/              # Utilities and helpers
├── pages/            # Route pages
│   ├── index.astro  # Homepage
│   ├── who-we-are.astro
│   ├── what-we-do/
│   │   ├── index.astro
│   │   ├── ai-hackathon.astro
│   │   ├── workers-assist.astro
│   │   ├── plantcore-ai.astro
│   │   └── srtp.astro
│   ├── events.astro
│   ├── contact.astro
│   └── donate.astro
└── styles/           # Global styles
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static site)
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Linting
npm run lint

# Format code
npm run format

# Run all checks before commit
npm run pre-commit
```

## Navigation Structure

```
Home
Who We Are
What We Do ▼
  - AI Hackathon
  - Workers Assist
  - Plantcore AI
  - SRTP
Upcoming Events
Contact
Donate
```

## Component Development

### Priority Components (Dev 1)

1. **Dropdown.tsx** - Navigation dropdown menu
2. **GoogleForm.tsx** - Google Forms wrapper
3. **ProjectCard.astro** - Project showcase cards
4. **EventCard.astro** - Event listing cards
5. **Hero.astro** - Page hero sections
6. **CTAButton.astro** - Call-to-action buttons

### Component Guidelines

- Use TypeScript for all React components
- Follow existing naming conventions
- Implement responsive design (mobile-first)
- Ensure accessibility (ARIA labels, keyboard navigation)
- Use Motion library for animations

## Page Templates

### Homepage Requirements
- Hero section with animated background
- Three main CTAs: "Who We Are", "What We Do", "Join Us"
- Brief organization introduction
- Newsletter sign-up (Google Form)

### Who We Are Page
- Organization mission and vision
- Team members or board
- History and achievements
- Values and approach

### What We Do Pages
- Overview page with all projects
- Individual project pages with:
  - Project description
  - Impact metrics
  - How to get involved
  - Volunteer sign-up form (Google Form)

### Events Page
- Upcoming events list
- Event calendar view
- Registration links (Google Forms)
- Past events archive

### Contact Page
- Embedded Google Form for inquiries
- Organization address
- Social media links
- Office hours
- Alternative contact methods

### Donate Page
- Donation interest form (Google Form)
- Links to external payment processors
- Impact of donations
- Tax information
- Recurring donation options

## Content Management

### Content Collections Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
    image: z.string(),
    impact: z.array(z.string()).optional(),
    startDate: z.date(),
    volunteerFormId: z.string().optional(), // Google Form ID
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    location: z.string(),
    description: z.string(),
    registrationFormId: z.string().optional(), // Google Form ID
    capacity: z.number().optional(),
  }),
});

export const collections = { projects, events };
```

## Styling Guidelines

### Color Palette
- Primary: Red variants (#dc2626, #7f1d1d)
- Background: Dark (#0a0a0a)
- Text: Zinc scale (100-900)
- Accent: White for CTAs

### Tailwind Classes Convention
- Use semantic class names
- Group related utilities
- Responsive modifiers: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode (if implemented): `dark:`

### Animation Guidelines
- Use Motion library for complex animations
- CSS transitions for simple hover effects
- Respect prefers-reduced-motion
- Keep animations smooth (60fps)

## Testing Requirements

### Before Creating PR
1. ✅ Run `npm run build` - must pass
2. ✅ Run `npm run check` - no TypeScript errors
3. ✅ Run `npm run lint` - no linting errors
4. ✅ Test on mobile and desktop
5. ✅ Check accessibility (keyboard navigation, screen reader)
6. ✅ Verify no console errors
7. ✅ Test with base path `/sinthome_website` locally
8. ✅ Verify Google Forms load correctly

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] Components are reusable where appropriate
- [ ] No hardcoded values (use props/config)
- [ ] Responsive design implemented
- [ ] Accessibility standards met
- [ ] Performance optimized (lazy loading, etc.)
- [ ] Links work with base path
- [ ] Forms are properly configured

## Integration Points

### Dependencies Between Features

1. **Navigation** (Dev 1) - **BLOCKING**
   - Required by all pages
   - Must be completed first

2. **Shared Components** (Dev 1) - **HIGH PRIORITY**
   - Used across multiple pages
   - Should be available early
   - Includes Google Forms component

3. **What We Do Overview** (Dev 3)
   - Must be done before individual project pages
   - Defines routing structure

4. **Forms Configuration** (Dev 4)
   - Set up Google Forms
   - Create forms.ts config
   - Test form embedding

### Communication Channels

- **Daily Standup**: 10am via Discord/Slack
- **PR Reviews**: Within 24 hours
- **Blocking Issues**: Tag @team-lead immediately
- **General Questions**: #dev-discussion channel

## Deployment Process

### Automatic Deployment (GitHub Actions)
```bash
# Pushing to main branch triggers deployment
git checkout main
git merge development
git push origin main
# GitHub Actions automatically builds and deploys
```

### Manual Deployment (if needed)
```bash
# Build locally
npm run build

# The dist/ folder contains the static site
# Can be uploaded to any static host
```

### Deployment Verification
1. Check GitHub Actions tab for build status
2. Wait 2-5 minutes for deployment
3. Visit: https://yiluo-photon.github.io/sinthome_website
4. Clear cache if changes don't appear
5. Test all Google Forms

## Performance Guidelines

### Optimization Checklist
- [ ] Images optimized (WebP format, lazy loading)
- [ ] JavaScript bundles minimized
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] Components lazy loaded where appropriate
- [ ] Google Forms loaded asynchronously

### Astro-Specific Optimizations
```astro
<!-- Only hydrate interactive components -->
<Navigation client:load />

<!-- Hydrate when visible for below-fold content -->
<GoogleForm client:visible />

<!-- Static components need no hydration -->
<Footer />
```

## Troubleshooting

### Common Issues

1. **Merge Conflicts**
   ```bash
   git checkout development
   git pull origin development
   git checkout feature/[branch]
   git rebase development
   # Resolve conflicts
   git add .
   git rebase --continue
   ```

2. **TypeScript Errors**
   ```bash
   npm run check
   # Fix errors in IDE
   npm run check
   ```

3. **Build Failures**
   ```bash
   # Clean install
   rm -rf node_modules
   npm install
   npm run build
   ```

4. **GitHub Pages Not Updating**
   - Check Actions tab for build errors
   - Clear browser cache
   - Check repository Settings → Pages
   - Ensure GitHub Pages is enabled

5. **Google Forms Not Loading**
   - Check form ID is correct
   - Ensure form is set to public
   - Test form URL directly
   - Check for Content Security Policy issues

6. **Links Not Working**
   - Check base path in astro.config.mjs
   - Use relative paths or Astro's `import.meta.env.BASE_URL`

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro GitHub Pages Guide](https://docs.astro.build/en/guides/deploy/github/)
- [Google Forms Help](https://support.google.com/docs/answer/6281888)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Motion Documentation](https://motion.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Project Repository: https://github.com/Yiluo-pHoton/sinthome_website

## Quick Start for New Developers

```bash
# Clone repository
git clone https://github.com/Yiluo-pHoton/sinthome_website.git
cd sinthome_website

# Install dependencies
npm install

# Checkout development branch
git checkout development
git pull origin development

# Create your feature branch
git checkout -b feature/[your-feature]

# Start development
npm run dev

# Open http://localhost:4321
```

## Environment Variables

For local development, create a `.env.local` file:
```bash
# Public variables (accessible in browser)
PUBLIC_SITE_URL=https://yiluo-photon.github.io/sinthome_website
PUBLIC_CONTACT_EMAIL=contact@sinthome.org

# Google Forms IDs (example)
PUBLIC_CONTACT_FORM_ID=1FAIpQLSf...
PUBLIC_VOLUNTEER_FORM_ID=1FAIpQLSf...
PUBLIC_NEWSLETTER_FORM_ID=1FAIpQLSf...
```

## Contact

- **Project Lead**: [Contact via GitHub]
- **Technical Issues**: Create issue on GitHub
- **Urgent**: Message in #urgent channel
- **Google Forms Admin**: [Designated team member]

---

Last Updated: September 21, 2025
Deployment: GitHub Pages (Static Site)
Forms: Google Forms (Embedded/Linked)