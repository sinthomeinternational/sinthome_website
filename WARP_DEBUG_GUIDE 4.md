# Warp Background Debug Guide

## Problem Analysis

The WarpBackgroundTester component was experiencing several issues:

1. **504 Outdated Optimize Dep** - Vite dependency optimization issue
2. **Failed to fetch dynamically imported module** - Hydration/import problem
3. **White background** - Component loading but shader not rendering
4. **No error handling** - Silent failures

## Solutions Implemented

### 1. Enhanced WarpBackgroundTester Component (`src/components/WarpBackgroundTester.tsx`)

**New Features:**
- ✅ Comprehensive error boundary with fallback UI
- ✅ Loading states and suspense handling
- ✅ Debug mode with real-time status monitoring
- ✅ Render count tracking
- ✅ WebGL compatibility checking
- ✅ Multiple fallback options
- ✅ Container visibility testing
- ✅ Detailed console logging

**Debug Controls:**
- Status indicator (loading/loaded/error/fallback)
- Debug info panel (toggleable)
- Reload Warp button
- Use Fallback button
- Container Test overlay (shows when errors occur)

### 2. Reusable Error Boundary (`src/components/ui/ShaderErrorBoundary.tsx`)

**Features:**
- ✅ Catches shader-specific errors
- ✅ Graceful degradation
- ✅ Custom error callbacks
- ✅ User-friendly error messages
- ✅ Retry functionality

### 3. Render Test Component (`src/components/ui/RenderTest.tsx`)

**Purpose:**
- ✅ Verifies container rendering is working
- ✅ Visual confirmation of component mounting
- ✅ Animated indicators
- ✅ Console logging for debugging

### 4. Vite Configuration Updates (`astro.config.mjs`)

**Optimizations:**
- ✅ Force pre-bundling of `@paper-design/shaders-react`
- ✅ SSR external handling
- ✅ Build target optimization
- ✅ Manual chunk splitting for shader library

### 5. Cache Management Tools

**Scripts:**
- ✅ `clear-vite-cache.sh` - Complete cache reset
- ✅ `pnpm run clean:cache` - Clean Vite/Astro cache
- ✅ `pnpm run dev:fresh` - Clean cache + start dev
- ✅ `pnpm run fix-shader` - Run cache clearing script

## Testing the Fixes

### 1. Visit the Test Page
Navigate to: `http://localhost:4322/sinthome_website/warp-test`

### 2. Debug Interface
- Turn on "Debug On" to see detailed status
- Watch the status indicator (should show "LOADED")
- Check console for detailed logs
- Monitor render count

### 3. Expected Behaviors

**Success Case:**
- Status: LOADED (green)
- Warp animation visible and moving
- No error messages
- Console shows successful mounting

**Error Cases:**
- Status: ERROR (red) - Shows error boundary
- Status: FALLBACK (yellow) - CSS animation fallback
- Container Test appears to verify rendering

### 4. Common Issues & Solutions

**"White background":**
1. Check browser WebGL support
2. Clear browser cache (hard refresh)
3. Try fallback mode
4. Check console for errors

**"504 Outdated Optimize Dep":**
1. Run `pnpm run clean:cache`
2. Restart dev server
3. If persistent: run `./clear-vite-cache.sh`

**"Module fetch failed":**
1. Check network connectivity
2. Clear browser cache
3. Restart dev server
4. Check if shader library is properly installed

## WebGL Requirements

The Warp shader requires:
- WebGL 2.0 support
- Hardware acceleration enabled
- No privacy extensions blocking WebGL
- Modern browser (Chrome 86+, Firefox 78+, Safari 14+)

## File Structure

```
src/
├── components/
│   ├── WarpBackgroundTester.tsx    # Main testing component
│   └── ui/
│       ├── ShaderErrorBoundary.tsx # Error boundary
│       ├── RenderTest.tsx          # Render testing
│       └── WarpBackground.tsx      # Production wrapper
├── pages/
│   └── warp-test.astro            # Test page
└── ...

astro.config.mjs                   # Vite optimizations
clear-vite-cache.sh               # Cache clearing script
```

## Debug Console Output

When working properly, you should see:
```
🎨 WarpBackgroundTester mounted/updated
📊 Current params: { color1: "#000000", ... }
🔧 Warp status: loaded
🔄 Render count: 1
📦 Warp component: function
📦 Warp constructor: function Warp...
🚀 Attempting to render Warp component with props: ...
🔍 RenderTest "Container Test" mounted at ...
💫 RenderTest "Container Test" is alive at ...
```

## Production Usage

For production use, prefer the simpler `WarpBackground.tsx` component:

```tsx
import WarpBackground from './ui/WarpBackground';

<WarpBackground
  color1="#000000"
  color2="#5a0000"
  color3="#ff0000"
  speed={0.9}
  // ... other props
/>
```

## Support

If issues persist:
1. Check WebGL compatibility: https://get.webgl.org/
2. Update graphics drivers
3. Try different browser
4. Check console for specific error messages
5. Use fallback mode as temporary solution