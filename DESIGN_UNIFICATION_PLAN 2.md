# Design Unification Plan

## Current State Analysis

### Major Inconsistencies Identified:

1. **Color Theme Issues:**
   - Workers Assist uses orange accent (#FF6B35) instead of red
   - Some pages support light/dark mode, others are dark-only
   - Inconsistent use of zinc shades (zinc-900, zinc-800, zinc-950)

2. **Typography Inconsistencies:**
   - Heading sizes vary (text-5xl vs text-6xl vs text-7xl for H1)
   - Font weights vary (font-black vs font-bold vs font-semibold)
   - Inconsistent letter-spacing (tracking-tight vs tracking-wide)

3. **Card Design Variations:**
   - Different background opacities (zinc-900/50 vs zinc-900/30 vs solid)
   - Varying border styles and colors
   - Inconsistent hover effects (scale vs border-color only)
   - Different padding (p-4 vs p-6 vs p-8)

4. **Button Style Inconsistencies:**
   - Different hover effects (scale vs just bg-color)
   - Varying shadow usage (shadow-lg vs no shadow)
   - Inconsistent padding and font weights

5. **Layout Variations:**
   - Different section padding (py-12 vs py-16 vs py-20)
   - Varying max-width containers (max-w-4xl vs max-w-6xl vs max-w-7xl)
   - Inconsistent spacing between elements

6. **Visual Effects:**
   - Some pages have elaborate gradient glows, others are minimal
   - Inconsistent use of animations and transitions

## Unified Design System

### Color Palette
```css
Primary Accent:
  - red-600 (#dc2626) - Primary buttons, CTAs
  - red-500 (#ef4444) - Hover states, accents
  - red-400 (#f87171) - Highlights, links

Background:
  - black (#000000) - Main sections
  - zinc-950 - Alternate sections
  - zinc-900/50 - Cards, overlays
  - zinc-800 - Secondary cards

Borders:
  - zinc-800 - Default borders
  - zinc-700 - Subtle borders
  - red-600/30 - Highlighted borders

Text:
  - white - Primary headings
  - zinc-100 - Secondary headings
  - zinc-300 - Body text
  - zinc-400 - Secondary/muted text
  - zinc-500 - Tertiary text
```

### Typography Scale
```css
H1 (Page Title):
  text-5xl md:text-6xl font-bold text-white

H2 (Section Title):
  text-3xl md:text-4xl font-bold text-white

H3 (Subsection):
  text-xl md:text-2xl font-semibold text-white

H4 (Card Title):
  text-lg font-semibold text-white

Body:
  text-base md:text-lg text-zinc-300 leading-relaxed

Secondary:
  text-sm md:text-base text-zinc-400
```

### Component Styles

#### Cards
```css
Standard Card:
  bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8
  hover:border-red-600/50 transition-all duration-300

Feature Card (with glow):
  Wrapper: relative group
  Glow: absolute -inset-1 bg-gradient-to-r from-red-900/20 via-red-800/10 to-red-900/20 rounded-xl blur opacity-50 group-hover:opacity-100
  Card: relative bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 md:p-8
```

#### Buttons
```css
Primary:
  bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg
  font-semibold transition-all duration-300

Secondary:
  bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg
  border border-zinc-700 font-semibold transition-colors

Outline:
  border-2 border-red-600 text-red-400 px-6 py-3 rounded-lg
  hover:bg-red-600 hover:text-white font-semibold transition-all duration-300

Large CTA:
  bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg
  font-bold transform hover:scale-105 transition-all duration-300
  shadow-lg hover:shadow-red-600/25
```

#### Sections
```css
Standard Section:
  py-16 md:py-20
  Container: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8

Hero Section:
  min-h-[60vh] md:min-h-[70vh]
  Gradient overlay when with background image

Content Spacing:
  space-y-12 (between major elements)
  space-y-6 (between related elements)
  space-y-4 (within groups)
```

## Implementation Priority

### Phase 1: Critical Color Fixes
1. ✅ **Workers Assist**: Change orange (#FF6B35) to red (#dc2626)
2. ✅ Remove light/dark mode from who-we-are and what-we-do/index
3. ✅ Standardize background colors (black, zinc-950, zinc-900/50)

### Phase 2: Component Standardization
4. ✅ Unify all card styles (background, borders, hover effects)
5. ✅ Standardize all button styles
6. ✅ Normalize heading typography

### Phase 3: Layout Consistency
7. ✅ Standardize section padding (py-16 md:py-20)
8. ✅ Unify container widths (max-w-6xl default)
9. ✅ Consistent spacing between elements

### Phase 4: Visual Polish
10. ✅ Standardize gradient effects (use sparingly)
11. ✅ Unify transition/animation timings
12. ✅ Ensure consistent hover states

## Testing Checklist

- [ ] All pages use consistent red accent color
- [ ] Card styles are unified across all pages
- [ ] Button styles are consistent
- [ ] Typography scale is standardized
- [ ] Section spacing is uniform
- [ ] No light/dark mode conflicts
- [ ] Build passes without errors
- [ ] Visual consistency verified on mobile and desktop

## Notes

- Keep elaborate designs for hero sections and key CTAs
- Use gradient glows sparingly for featured content
- Maintain professional aesthetic matching Plantcore AI
- Ensure all hover effects are smooth (duration-300)
- Preserve accessibility (contrast ratios, focus states)
