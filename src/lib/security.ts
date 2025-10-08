/**
 * Security utilities and monitoring for the Sinthome website
 * Implements client-side security hardening and monitoring
 */

// Content Security Policy violation handler
export function setupCSPReporting(): void {
  if (typeof window === 'undefined') return;

  document.addEventListener('securitypolicyviolation', (event) => {
    console.error('CSP Violation:', {
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      originalPolicy: event.originalPolicy,
      documentURI: event.documentURI,
      referrer: event.referrer,
      statusCode: event.statusCode,
      effectiveDirective: event.effectiveDirective
    });

    // In production, report to monitoring service
    if (import.meta.env.PROD) {
      reportSecurityEvent('csp_violation', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        documentURI: event.documentURI
      });
    }
  });
}

// Rate limiting for form submissions
const submissionTracker = new Map<string, number[]>();

export function checkFormSubmissionRate(formId: string, maxSubmissions = 3, windowMs = 300000): boolean {
  if (typeof window === 'undefined') return true;

  const now = Date.now();
  const submissions = submissionTracker.get(formId) || [];

  // Remove old submissions outside the time window
  const recentSubmissions = submissions.filter(time => now - time < windowMs);

  if (recentSubmissions.length >= maxSubmissions) {
    console.warn(`Rate limit exceeded for form: ${formId}`);
    reportSecurityEvent('form_rate_limit', { formId, attempts: recentSubmissions.length });
    return false;
  }

  // Add current submission
  recentSubmissions.push(now);
  submissionTracker.set(formId, recentSubmissions);

  return true;
}

// Security event reporting
interface SecurityEvent {
  type: string;
  data: Record<string, any>;
  timestamp?: number;
  userAgent?: string;
  url?: string;
}

export function reportSecurityEvent(type: string, data: Record<string, any>): void {
  const event: SecurityEvent = {
    type,
    data,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // Log locally in development
  if (import.meta.env.DEV) {
    console.warn('Security Event:', event);
    return;
  }

  // In production, send to monitoring service
  // This could be Sentry, LogRocket, or custom endpoint
  try {
    fetch('/api/security-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    }).catch(err => {
      console.error('Failed to report security event:', err);
    });
  } catch (error) {
    console.error('Security event reporting error:', error);
  }
}

// Input sanitization for user-generated content
export function sanitizeInput(input: string): string {
  // Basic XSS prevention
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate URLs to prevent open redirects
export function isValidRedirectUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url, window.location.origin);

    // Only allow same-origin or explicitly allowed domains
    const allowedDomains = [
      'sinthome.org',
      'docs.google.com', // For forms
      'forms.gle' // For form redirects
    ];

    if (parsedUrl.origin === window.location.origin) {
      return true;
    }

    return allowedDomains.some(domain =>
      parsedUrl.hostname === domain ||
      parsedUrl.hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

// Detect suspicious activity patterns
interface ActivityPattern {
  rapidClicks: number;
  formSubmissions: number;
  pageViews: number;
  lastActivity: number;
}

const activityTracker: ActivityPattern = {
  rapidClicks: 0,
  formSubmissions: 0,
  pageViews: 0,
  lastActivity: Date.now()
};

export function trackUserActivity(): void {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const timeSinceLastActivity = now - activityTracker.lastActivity;

  // Reset counters if more than 1 minute since last activity
  if (timeSinceLastActivity > 60000) {
    activityTracker.rapidClicks = 0;
    activityTracker.formSubmissions = 0;
    activityTracker.pageViews = 0;
  }

  activityTracker.lastActivity = now;

  // Track clicks
  document.addEventListener('click', () => {
    activityTracker.rapidClicks++;

    // Flag suspicious rapid clicking
    if (activityTracker.rapidClicks > 20) {
      reportSecurityEvent('suspicious_activity', {
        type: 'rapid_clicking',
        count: activityTracker.rapidClicks
      });
    }
  });

  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      activityTracker.pageViews++;

      // Flag excessive page switching
      if (activityTracker.pageViews > 50) {
        reportSecurityEvent('suspicious_activity', {
          type: 'excessive_page_views',
          count: activityTracker.pageViews
        });
      }
    }
  });
}

// Initialize security monitoring
export function initializeSecurity(): void {
  setupCSPReporting();
  trackUserActivity();

  // Log security initialization
  console.log('Security monitoring initialized');
}