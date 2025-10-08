import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Contact Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/contact/i);
    await expect(page.locator('h1')).toContainText(/contact/i);

    // Check if Google Form is embedded or if there's a link to it
    const googleForm = page.locator('iframe[src*="docs.google.com"]');
    const contactLink = page.locator('a[href*="forms.gle"], a[href*="docs.google.com"]');

    // Either embedded form or link should be present
    const hasForm = await googleForm.count() > 0;
    const hasLink = await contactLink.count() > 0;

    expect(hasForm || hasLink).toBeTruthy();
  });

  test('should have accessible contact information', async ({ page }) => {
    // Check for contact information
    const emailLink = page.locator('a[href^="mailto:"]');
    if (await emailLink.count() > 0) {
      await expect(emailLink).toBeVisible();
    }

    // Check for social media links
    const socialLinks = page.locator('a[href*="twitter"], a[href*="facebook"], a[href*="linkedin"], a[href*="instagram"]');
    if (await socialLinks.count() > 0) {
      for (let i = 0; i < await socialLinks.count(); i++) {
        const link = socialLinks.nth(i);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
      }
    }
  });

  test('should handle Google Form interaction', async ({ page }) => {
    const googleForm = page.locator('iframe[src*="docs.google.com"]');

    if (await googleForm.count() > 0) {
      // Form is embedded
      await expect(googleForm).toBeVisible();

      // Check iframe has proper accessibility attributes
      const title = await googleForm.getAttribute('title');
      expect(title).toBeTruthy();

      // Check iframe is properly sized
      const boundingBox = await googleForm.boundingBox();
      expect(boundingBox?.height).toBeGreaterThan(400);
    } else {
      // Form is linked
      const contactLink = page.locator('a[href*="forms.gle"], a[href*="docs.google.com"]');
      if (await contactLink.count() > 0) {
        await expect(contactLink).toBeVisible();

        const href = await contactLink.getAttribute('href');
        expect(href).toMatch(/forms\.gle|docs\.google\.com/);

        // Link should open in new tab
        await expect(contactLink).toHaveAttribute('target', '_blank');
        await expect(contactLink).toHaveAttribute('rel', /noopener/);
      }
    }
  });

  test('should have proper page structure', async ({ page }) => {
    // Check main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toHaveCount(1);

    // Check for contact options or form
    const contactSection = page.locator('section, main, div').filter({ hasText: /contact|form|get in touch/i });
    await expect(contactSection.first()).toBeVisible();

    // Check for alternative contact methods
    const altContactMethods = page.locator('text=/email|phone|address|office hours/i');
    if (await altContactMethods.count() > 0) {
      await expect(altContactMethods.first()).toBeVisible();
    }
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator('h1')).toBeVisible();

    // Check if form/content is still accessible
    const googleForm = page.locator('iframe[src*="docs.google.com"]');
    const contactLink = page.locator('a[href*="forms.gle"], a[href*="docs.google.com"]');

    if (await googleForm.count() > 0) {
      await expect(googleForm).toBeVisible();
      // Form should be responsive
      const boundingBox = await googleForm.boundingBox();
      expect(boundingBox?.width).toBeLessThanOrEqual(375);
    }

    if (await contactLink.count() > 0) {
      await expect(contactLink).toBeVisible();
    }
  });

  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/contact');
    const loadTime = Date.now() - startTime;

    // Page should load within reasonable time
    expect(loadTime).toBeLessThan(3000);

    // Key elements should be visible quickly
    await expect(page.locator('h1')).toBeVisible({ timeout: 2000 });
  });
});

test.describe('Contact Form Accessibility Tests', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/contact');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/contact');

    // Check h1 exists and is unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check heading has meaningful text
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text?.trim()).toBeTruthy();
    expect(h1Text?.toLowerCase()).toMatch(/contact/);
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/contact');

    // Test tab navigation
    const focusableElements = await page.locator('a, button, iframe, [tabindex]:not([tabindex="-1"])').all();

    if (focusableElements.length > 0) {
      await focusableElements[0].focus();

      for (let i = 1; i < Math.min(3, focusableElements.length); i++) {
        await page.keyboard.press('Tab');
        const focusedElement = await page.locator(':focus').first();
        await expect(focusedElement).toBeVisible();
      }
    }
  });

  test('should have proper iframe accessibility', async ({ page }) => {
    await page.goto('/contact');

    const iframes = page.locator('iframe');
    const iframeCount = await iframes.count();

    for (let i = 0; i < iframeCount; i++) {
      const iframe = iframes.nth(i);

      // Iframe should have title
      const title = await iframe.getAttribute('title');
      expect(title).toBeTruthy();

      // Iframe should not have negative tabindex
      const tabindex = await iframe.getAttribute('tabindex');
      if (tabindex) {
        expect(parseInt(tabindex)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should have accessible links', async ({ page }) => {
    await page.goto('/contact');

    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');

      if (href) {
        // Link should have accessible name
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        const title = await link.getAttribute('title');

        expect(text?.trim() || ariaLabel || title).toBeTruthy();

        // External links should have proper security attributes
        if (href.startsWith('http') && !href.includes('sinthome')) {
          const target = await link.getAttribute('target');
          if (target === '_blank') {
            const rel = await link.getAttribute('rel');
            expect(rel).toContain('noopener');
          }
        }
      }
    }
  });

  test('should provide alternative contact methods', async ({ page }) => {
    await page.goto('/contact');

    // Look for email addresses
    const emailLinks = page.locator('a[href^="mailto:"]');
    if (await emailLinks.count() > 0) {
      for (let i = 0; i < await emailLinks.count(); i++) {
        const emailLink = emailLinks.nth(i);
        const href = await emailLink.getAttribute('href');
        expect(href).toMatch(/^mailto:.+@.+\..+/);
      }
    }

    // Check for contact information text
    const contactInfo = page.locator('text=/contact@|info@|hello@|support@/i');
    if (await contactInfo.count() > 0) {
      await expect(contactInfo.first()).toBeVisible();
    }

    // Look for office hours or other contact details
    const additionalInfo = page.locator('text=/hours|office|phone|address/i');
    if (await additionalInfo.count() > 0) {
      await expect(additionalInfo.first()).toBeVisible();
    }
  });
});