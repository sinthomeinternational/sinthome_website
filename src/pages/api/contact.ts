import type { APIRoute } from 'astro';

export const prerender = false; // Enable SSR for this route

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Handle form submission
    // Options:
    // 1. Send email via Resend/SendGrid
    // 2. Save to database (Vercel KV, PostgreSQL)
    // 3. Forward to webhook/Slack
    // 4. Send to Google Sheets via API

    console.log('Form submission:', data);

    // Example: Send to Discord webhook
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `New contact form submission:\n**Name:** ${data.name}\n**Email:** ${data.email}\n**Message:** ${data.message}`
        })
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to submit form' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};