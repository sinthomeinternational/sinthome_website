import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the contact API handler
const mockContactHandler = vi.fn();

// Mock Astro API route structure
const createMockRequest = (body: any): Request => {
  return {
    json: vi.fn().mockResolvedValue(body),
    headers: new Headers(),
    method: 'POST',
  } as unknown as Request;
};

const createMockAPIContext = (request: Request) => ({
  request,
  params: {},
  url: new URL('http://localhost/api/contact'),
});

describe('Contact API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment
    vi.stubEnv('DISCORD_WEBHOOK_URL', undefined);
  });

  describe('Input Validation', () => {
    it('should accept valid contact form data', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message.',
      };

      const request = createMockRequest(validData);
      const context = createMockAPIContext(request);

      // Import the actual handler
      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
    });

    it('should reject empty name', async () => {
      const invalidData = {
        name: '',
        email: 'john@example.com',
        message: 'Hello world',
      };

      const request = createMockRequest(invalidData);
      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Validation failed');
      expect(result.details).toContainEqual({
        field: 'name',
        message: 'Name is required',
      });
    });

    it('should reject invalid email format', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'not-an-email',
        message: 'Hello world',
      };

      const request = createMockRequest(invalidData);
      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.details).toContainEqual({
        field: 'email',
        message: 'Invalid email format',
      });
    });

    it('should reject message that is too long', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'x'.repeat(1001), // Exceeds 1000 character limit
      };

      const request = createMockRequest(invalidData);
      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.details).toContainEqual({
        field: 'message',
        message: 'Message too long',
      });
    });

    it('should reject submissions with honeypot field filled', async () => {
      const botData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
        website: 'http://spam.com', // Honeypot field filled
      };

      const request = createMockRequest(botData);
      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid submission');
    });

    it('should accept submissions with empty honeypot field', async () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
        website: '', // Empty honeypot field
      };

      const request = createMockRequest(validData);
      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize XSS attempts in form data', async () => {
      const xssData = {
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: '<img src="x" onerror="alert(1)">',
      };

      const request = createMockRequest(xssData);
      const context = createMockAPIContext(request);

      // Mock console.log to capture sanitized data
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(200);

      // Check that console.log was called with sanitized data
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submission:',
        expect.objectContaining({
          name: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
          message: '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;',
        })
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON', async () => {
      const request = {
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as unknown as Request;

      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(500);
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to submit form');
    });

    it('should provide detailed validation errors', async () => {
      const invalidData = {
        name: '', // Missing
        email: 'invalid-email', // Invalid format
        message: '', // Missing
      };

      const request = createMockRequest(invalidData);
      const context = createMockAPIContext(request);

      const { POST } = await import('../../../src/pages/api/contact');
      const response = await POST(context);

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.details).toHaveLength(3); // Three validation errors
      expect(result.details.map((err: any) => err.field)).toContain('name');
      expect(result.details.map((err: any) => err.field)).toContain('email');
      expect(result.details.map((err: any) => err.field)).toContain('message');
    });
  });
});