import type { APIRoute } from 'astro';
import { z } from 'zod';
import { sanitizeInput } from '../../lib/security';

// Note: API routes are only available in SSR mode (Vercel config)
// Remove prerender flag for static builds

// Contact form validation schema
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email({ message: 'Invalid email format' }).max(254, 'Email too long'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message too long'),
  // Optional honeypot field for bot detection
  website: z.string().optional()
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawData = await request.json();

    // Validate input data with Zod
    const data = ContactSchema.parse(rawData);

    // Honeypot protection - reject if honeypot field is filled
    if (data.website && data.website.trim()) {
      console.warn('Bot detected via honeypot field');
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid submission' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize input data to prevent XSS
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      message: sanitizeInput(data.message)
    };

    // Handle form submission
    // Options:
    // 1. Send email via Resend/SendGrid
    // 2. Save to database (Vercel KV, PostgreSQL)
    // 3. Forward to webhook/Slack
    // 4. Send to Google Sheets via API

    console.log('Form submission:', sanitizedData);

    // Example: Send to Discord webhook
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `New contact form submission:\n**Name:** ${sanitizedData.name}\n**Email:** ${sanitizedData.email}\n**Message:** ${sanitizedData.message}`
        })
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message
      }));

      console.warn('Validation error:', validationErrors);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          details: validationErrors
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to submit form' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};