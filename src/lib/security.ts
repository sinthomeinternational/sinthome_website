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
}\n\n// Rate limiting for form submissions\nconst submissionTracker = new Map<string, number[]>();\n\nexport function checkFormSubmissionRate(formId: string, maxSubmissions = 3, windowMs = 300000): boolean {\n  if (typeof window === 'undefined') return true;\n\n  const now = Date.now();\n  const submissions = submissionTracker.get(formId) || [];\n  \n  // Remove old submissions outside the time window\n  const recentSubmissions = submissions.filter(time => now - time < windowMs);\n  \n  if (recentSubmissions.length >= maxSubmissions) {\n    console.warn(`Rate limit exceeded for form: ${formId}`);\n    reportSecurityEvent('form_rate_limit', { formId, attempts: recentSubmissions.length });\n    return false;\n  }\n  \n  // Add current submission\n  recentSubmissions.push(now);\n  submissionTracker.set(formId, recentSubmissions);\n  \n  return true;\n}\n\n// Security event reporting\ninterface SecurityEvent {\n  type: string;\n  data: Record<string, any>;\n  timestamp?: number;\n  userAgent?: string;\n  url?: string;\n}\n\nexport function reportSecurityEvent(type: string, data: Record<string, any>): void {\n  const event: SecurityEvent = {\n    type,\n    data,\n    timestamp: Date.now(),\n    userAgent: navigator.userAgent,\n    url: window.location.href\n  };\n\n  // Log locally in development\n  if (import.meta.env.DEV) {\n    console.warn('Security Event:', event);\n    return;\n  }\n\n  // In production, send to monitoring service\n  // This could be Sentry, LogRocket, or custom endpoint\n  try {\n    fetch('/api/security-events', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify(event)\n    }).catch(err => {\n      console.error('Failed to report security event:', err);\n    });\n  } catch (error) {\n    console.error('Security event reporting error:', error);\n  }\n}\n\n// Input sanitization for user-generated content\nexport function sanitizeInput(input: string): string {\n  // Basic XSS prevention\n  return input\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#x27;')\n    .replace(/\\//g, '&#x2F;');\n}\n\n// Validate URLs to prevent open redirects\nexport function isValidRedirectUrl(url: string): boolean {\n  try {\n    const parsedUrl = new URL(url, window.location.origin);\n    \n    // Only allow same-origin or explicitly allowed domains\n    const allowedDomains = [\n      'sinthome.org',\n      'docs.google.com', // For forms\n      'forms.gle' // For form redirects\n    ];\n    \n    if (parsedUrl.origin === window.location.origin) {\n      return true;\n    }\n    \n    return allowedDomains.some(domain => \n      parsedUrl.hostname === domain || \n      parsedUrl.hostname.endsWith('.' + domain)\n    );\n  } catch {\n    return false;\n  }\n}\n\n// Detect suspicious activity patterns\ninterface ActivityPattern {\n  rapidClicks: number;\n  formSubmissions: number;\n  pageViews: number;\n  lastActivity: number;\n}\n\nconst activityTracker: ActivityPattern = {\n  rapidClicks: 0,\n  formSubmissions: 0,\n  pageViews: 0,\n  lastActivity: Date.now()\n};\n\nexport function trackUserActivity(): void {\n  if (typeof window === 'undefined') return;\n\n  const now = Date.now();\n  const timeSinceLastActivity = now - activityTracker.lastActivity;\n  \n  // Reset counters if more than 1 minute since last activity\n  if (timeSinceLastActivity > 60000) {\n    activityTracker.rapidClicks = 0;\n    activityTracker.formSubmissions = 0;\n    activityTracker.pageViews = 0;\n  }\n  \n  activityTracker.lastActivity = now;\n  \n  // Track clicks\n  document.addEventListener('click', () => {\n    activityTracker.rapidClicks++;\n    \n    // Flag suspicious rapid clicking\n    if (activityTracker.rapidClicks > 20) {\n      reportSecurityEvent('suspicious_activity', {\n        type: 'rapid_clicking',\n        count: activityTracker.rapidClicks\n      });\n    }\n  });\n  \n  // Track page visibility changes\n  document.addEventListener('visibilitychange', () => {\n    if (document.visibilityState === 'visible') {\n      activityTracker.pageViews++;\n      \n      // Flag excessive page switching\n      if (activityTracker.pageViews > 50) {\n        reportSecurityEvent('suspicious_activity', {\n          type: 'excessive_page_views',\n          count: activityTracker.pageViews\n        });\n      }\n    }\n  });\n}\n\n// Initialize security monitoring\nexport function initializeSecurity(): void {\n  setupCSPReporting();\n  trackUserActivity();\n  \n  // Log security initialization\n  console.log('Security monitoring initialized');\n}