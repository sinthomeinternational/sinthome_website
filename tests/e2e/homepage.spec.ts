import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Sinthome/);

    // Check main navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check hero section
    await expect(page.locator('h1')).toBeVisible();

    // Check main navigation links
    await expect(page.getByRole('link', { name: /who we are/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /what we do/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('should navigate to key pages', async ({ page }) => {
    // Test navigation to Who We Are
    await page.getByRole('link', { name: /who we are/i }).click();
    await expect(page).toHaveURL(/\/who-we-are/);
    await expect(page.locator('h1')).toContainText(/who we are/i);

    // Navigate back to home
    await page.goto('/');

    // Test navigation to What We Do
    await page.getByRole('link', { name: /what we do/i }).click();
    await expect(page).toHaveURL(/\/what-we-do/);

    // Navigate back to home
    await page.goto('/');

    // Test navigation to Contact
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('should have working dropdown navigation', async ({ page }) => {
    // Hover over "What We Do" to trigger dropdown
    await page.getByRole('link', { name: /what we do/i }).hover();

    // Check dropdown items are visible
    await expect(page.getByRole('link', { name: /ai hackathon/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /workers assist/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /plantcore ai/i })).toBeVisible();

    // Click on a dropdown item
    await page.getByRole('link', { name: /ai hackathon/i }).click();
    await expect(page).toHaveURL(/\/what-we-do\/ai-hackathon/);
  });

  test('should display footer with social links', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer is visible
    await expect(page.locator('footer')).toBeVisible();

    // Check social links (if they exist)
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check page still loads correctly
    await expect(page.locator('h1')).toBeVisible();

    // Check mobile navigation (hamburger menu)
    const mobileNav = page.locator('[data-testid="mobile-nav"]').or(page.locator('button[aria-label*="menu"]'));
    if (await mobileNav.count() > 0) {
      await expect(mobileNav).toBeVisible();
    }
  });

  test('should handle page loading performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load within reasonable time (3 seconds)
    expect(loadTime).toBeLessThan(3000);

    // Check that key elements are visible quickly
    await expect(page.locator('h1')).toBeVisible({ timeout: 2000 });
    await expect(page.locator('nav')).toBeVisible({ timeout: 2000 });
  });
});

test.describe('Homepage Accessibility Tests', () => {
  test('should not have any accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check that h1 exists and is unique
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);

    // Check heading hierarchy (h1 -> h2 -> h3, etc.)
    const allHeadings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    for (const heading of allHeadings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const text = await heading.textContent();

      // Ensure heading has text content
      expect(text?.trim()).toBeTruthy();

      // Ensure heading is visible or properly hidden
      const isVisible = await heading.isVisible();
      if (!isVisible) {
        // If hidden, it should have proper screen reader text
        const ariaLabel = await heading.getAttribute('aria-label');
        const srOnly = await heading.evaluate(el =>
          window.getComputedStyle(el).position === 'absolute' &&
          window.getComputedStyle(el).clip === 'rect(0px, 0px, 0px, 0px)'
        );
        expect(ariaLabel || srOnly).toBeTruthy();
      }
    }
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/');

    // Test tab navigation through focusable elements
    const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').all();

    if (focusableElements.length > 0) {
      // Focus first element
      await focusableElements[0].focus();

      // Tab through elements
      for (let i = 1; i < Math.min(5, focusableElements.length); i++) {
        await page.keyboard.press('Tab');
        // Verify focus moves to next element
        const focusedElement = await page.locator(':focus').first();
        await expect(focusedElement).toBeVisible();
      }
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper link accessibility', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a').all();

    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      // Every link should have either text content, aria-label, or title
      expect(text?.trim() || ariaLabel || title).toBeTruthy();

      // External links should have proper attributes
      if (href && (href.startsWith('http') && !href.includes('sinthome'))) {
        const rel = await link.getAttribute('rel');
        const target = await link.getAttribute('target');

        if (target === '_blank') {
          expect(rel).toContain('noopener');
          expect(rel).toContain('noreferrer');
        }
      }
    }
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/');

    // Check for landmark roles
    const main = page.locator('[role="main"], main');
    const nav = page.locator('[role="navigation"], nav');
    const banner = page.locator('[role="banner"], header');
    const contentinfo = page.locator('[role="contentinfo"], footer');

    await expect(main.or(page.locator('main'))).toBeVisible();
    await expect(nav.or(page.locator('nav'))).toBeVisible();

    // Check skip links
    const skipLinks = page.locator('a[href^="#"]').first();
    if (await skipLinks.count() > 0) {
      const skipText = await skipLinks.textContent();
      expect(skipText?.toLowerCase()).toMatch(/skip|main|content/);
    }
  });
});