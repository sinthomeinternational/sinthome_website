#!/bin/bash

# Clear Vite Cache Script for Shader Issues
# This script completely clears all caches that might interfere with shader loading

echo "🧹 Clearing Vite and development caches..."

# Stop any running dev servers
echo "Stopping any running processes..."
pkill -f "astro dev" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Clear Vite cache
echo "Clearing Vite cache..."
rm -rf node_modules/.vite
rm -rf .astro

# Clear browser-related caches that Vite might use
echo "Clearing additional caches..."
rm -rf node_modules/.cache
rm -rf .cache
rm -rf dist

# Clear npm/pnpm cache for the shader package specifically
echo "Clearing package manager cache..."
if command -v pnpm &> /dev/null; then
    pnpm store prune
    echo "PNPM cache cleared"
elif command -v npm &> /dev/null; then
    npm cache clean --force
    echo "NPM cache cleared"
fi

# Reinstall shader package specifically
echo "Reinstalling shader package..."
if command -v pnpm &> /dev/null; then
    pnpm remove @paper-design/shaders-react
    pnpm add @paper-design/shaders-react
else
    npm uninstall @paper-design/shaders-react
    npm install @paper-design/shaders-react
fi

echo "✅ Cache clearing complete!"
echo ""
echo "Next steps:"
echo "1. Hard refresh your browser (Ctrl+Shift+R)"
echo "2. Run: pnpm run dev"
echo "3. If issues persist, try a different browser"
echo "4. Check WebGL support at: webglreport.com"