# Tooltip System Documentation

## Overview

This tooltip system provides accessible, responsive tooltips for philosophical and theoretical terms throughout the website. It consists of two main components:

1. **`Tooltip.tsx`** - Base tooltip component with hover/focus functionality
2. **`DefinitionTooltip.tsx`** - Specialized component for predefined philosophical terms

## Features

- **Accessible**: Supports keyboard navigation and screen readers
- **Responsive**: Automatically adjusts position to stay within viewport
- **Themed**: Matches the dark theme aesthetic with red accents
- **Smooth Animations**: Fade in/out transitions with customizable delay
- **Mobile Friendly**: Works on touch devices

## Usage

### Basic Tooltip

```tsx
import Tooltip from './Tooltip';

<Tooltip content="This is a tooltip explanation">
  <span>Hover over this text</span>
</Tooltip>
```

### Definition Tooltip (Recommended)

```tsx
import DefinitionTooltip from './DefinitionTooltip';

// For predefined terms
<DefinitionTooltip term="praxis" client:load />

// With custom content
<DefinitionTooltip term="dialectical materialism" client:load>
  <em>dialectical materialism</em>
</DefinitionTooltip>
```

### In Astro Components

```astro
---
import DefinitionTooltip from "../../components/ui/DefinitionTooltip.tsx";
---

<p>
  This is about <DefinitionTooltip term="praxis" client:load /> in revolutionary theory.
</p>
```

## Predefined Terms

Currently available terms in `DefinitionTooltip`:

- `praxis` - Revolutionary practice vs theory
- `aber` - Marx's pivotal "but"
- `arche` - Greek for beginning/origin (ἀρχή)
- `dann` - German "then"
- `zu-kunft` - German "coming toward"
- `a-venir` - French "to come"
- `srtp` - Sinthome Revolutionary Theoretical Practice
- `dialectical materialism` - Marx's method
- `theoretical critique` - Critical analysis method
- `sinthome` - Lacan's concept
- `verändern` - German "to change"
- `interpretiert` - German "interpreted"
- `revolutionary thinking` - Transformative thought mode

## Adding New Terms

To add a new philosophical term:

1. Open `src/components/ui/DefinitionTooltip.tsx`
2. Add to the `definitions` object:

```typescript
'new-term': {
  term: 'Display Name',
  definition: 'Clear, concise explanation of the term.',
  context: 'Optional: etymology or source context'
}
```

3. Update the display logic if the term needs special formatting

## Styling

Tooltips use the site's design system:

- **Background**: Dark gradient with backdrop blur
- **Border**: Subtle zinc borders with red accent shadow
- **Text**: Zinc color scale with red accents for term names
- **Typography**: Responsive text sizing
- **Animation**: 200ms fade transitions

## Accessibility

- **ARIA**: Proper `role="tooltip"` and `aria-describedby`
- **Keyboard**: Tab to focus, hover to show
- **Screen Readers**: Content is announced when focused
- **High Contrast**: Maintains visibility in all modes

## Performance

- **Lazy Loading**: Use `client:load` directive in Astro
- **Lightweight**: Base component ~2.5KB gzipped
- **Efficient**: Only renders when visible
- **No External Dependencies**: Pure React implementation

## Browser Support

- Modern browsers (Chrome 60+, Firefox 55+, Safari 12+)
- Mobile Safari and Chrome
- Graceful degradation for older browsers

## Best Practices

1. **Use sparingly** - Only for truly complex terms
2. **Keep definitions concise** - 1-2 sentences maximum
3. **Provide context** - Etymology or source when helpful
4. **Test on mobile** - Ensure tooltips work on touch devices
5. **Maintain consistency** - Use predefined terms when available

## Troubleshooting

**Tooltip not showing:**
- Check if `client:load` directive is added in Astro
- Verify term exists in definitions object
- Check browser console for errors

**Position issues:**
- Tooltip automatically adjusts to viewport bounds
- Override position prop if needed: `position="bottom"`

**Styling problems:**
- Tooltips inherit from global CSS
- Check for conflicting z-index values
- Ensure parent containers don't have overflow:hidden