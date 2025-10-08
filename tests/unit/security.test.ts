import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sanitizeInput, isValidRedirectUrl, checkFormSubmissionRate } from '../../src/lib/security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should sanitize HTML tags', () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('should sanitize quotes and special characters', () => {
      const input = `Hello "world" & 'universe' / path`;
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('Hello &quot;world&quot; & &#x27;universe&#x27; &#x2F; path');
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should handle normal text without changes', () => {
      const normalText = 'Hello World 123';
      expect(sanitizeInput(normalText)).toBe(normalText);
    });
  });

  describe('isValidRedirectUrl', () => {
    beforeEach(() => {
      // Mock window.location for tests
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://sinthome.org',
        },
        writable: true,
      });
    });

    it('should allow same-origin URLs', () => {
      expect(isValidRedirectUrl('https://sinthome.org/page')).toBe(true);
      expect(isValidRedirectUrl('/relative/path')).toBe(true);
    });

    it('should allow explicitly allowed domains', () => {
      expect(isValidRedirectUrl('https://docs.google.com/forms/123')).toBe(true);
      expect(isValidRedirectUrl('https://forms.gle/abc123')).toBe(true);
    });

    it('should reject unauthorized external domains', () => {
      expect(isValidRedirectUrl('https://evil.com/phishing')).toBe(false);
      expect(isValidRedirectUrl('https://malicious.site')).toBe(false);
    });

    it('should handle malformed URLs', () => {
      expect(isValidRedirectUrl('javascript:alert(1)')).toBe(false);
      expect(isValidRedirectUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    });

    it('should allow subdomains of allowed domains', () => {
      expect(isValidRedirectUrl('https://forms.docs.google.com')).toBe(true);
    });
  });

  describe('checkFormSubmissionRate', () => {
    beforeEach(() => {
      // Clear rate limiting tracker between tests
      vi.clearAllMocks();
    });

    it('should allow first submission', () => {
      const isAllowed = checkFormSubmissionRate('contact-form');
      expect(isAllowed).toBe(true);
    });

    it('should rate limit after max submissions', () => {
      const formId = 'test-form';
      const maxSubmissions = 2;
      const windowMs = 1000;

      // First two submissions should be allowed
      expect(checkFormSubmissionRate(formId, maxSubmissions, windowMs)).toBe(true);
      expect(checkFormSubmissionRate(formId, maxSubmissions, windowMs)).toBe(true);

      // Third submission should be blocked
      expect(checkFormSubmissionRate(formId, maxSubmissions, windowMs)).toBe(false);
    });

    it('should reset rate limit after time window', async () => {
      const formId = 'time-test-form';
      const maxSubmissions = 1;
      const windowMs = 10; // Very short window for testing

      // First submission allowed
      expect(checkFormSubmissionRate(formId, maxSubmissions, windowMs)).toBe(true);

      // Second submission blocked
      expect(checkFormSubmissionRate(formId, maxSubmissions, windowMs)).toBe(false);

      // Wait for time window to pass
      await new Promise(resolve => setTimeout(resolve, 20));

      // Should be allowed again after window expires
      expect(checkFormSubmissionRate(formId, maxSubmissions, windowMs)).toBe(true);
    });

    it('should handle different form IDs independently', () => {
      const maxSubmissions = 1;

      expect(checkFormSubmissionRate('form-1', maxSubmissions)).toBe(true);
      expect(checkFormSubmissionRate('form-2', maxSubmissions)).toBe(true);

      // Both should be at their limit now
      expect(checkFormSubmissionRate('form-1', maxSubmissions)).toBe(false);
      expect(checkFormSubmissionRate('form-2', maxSubmissions)).toBe(false);
    });
  });
});