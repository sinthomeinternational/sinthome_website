/**
 * Google Forms Configuration
 *
 * Store all Google Form IDs and URLs in this central configuration file.
 * To get a form ID:
 * 1. Create your Google Form
 * 2. Click "Send" → "Link" or "Embed"
 * 3. The ID is the string between /d/e/ and /viewform in the URL
 *
 * Example: https://docs.google.com/forms/d/e/[FORM_ID]/viewform
 */

// Validation function to check for placeholder IDs
export function validateFormId(formId: string): boolean {
  const placeholderPatterns = [
    'YOUR_',
    'PLACEHOLDER',
    'EXAMPLE',
    'TEST',
    'DEMO'
  ];

  return !placeholderPatterns.some(pattern =>
    formId.toUpperCase().includes(pattern)
  );
}

// Helper functions that fail hard in production if environment variables are missing
const getFormId = (envKey: string, fallbackForDev?: string) => {
  const value = import.meta.env[envKey];

  if (!value) {
    // In production, throw an error immediately - no silent failures
    if (import.meta.env.PROD) {
      throw new Error(
        `CRITICAL: Missing required environment variable ${envKey}. ` +
        `Production builds cannot proceed without proper form configuration. ` +
        `Please set ${envKey} in your .env file.`
      );
    }

    // In development, use fallback if provided, but show warning
    if (import.meta.env.DEV && fallbackForDev) {
      console.warn(
        `⚠️ Warning: ${envKey} is not set. Using development placeholder. ` +
        `This will fail in production builds.`
      );
      return fallbackForDev;
    }

    // Even in development, fail if no fallback is provided
    throw new Error(`Missing required environment variable: ${envKey}`);
  }

  // Validate that the ID doesn't look like a placeholder
  if (!validateFormId(value)) {
    throw new Error(
      `Invalid form ID for ${envKey}: "${value}" appears to be a placeholder. ` +
      `Please provide a valid Google Form ID.`
    );
  }

  return value;
};

const getFormUrl = (envKey: string, fallbackForDev?: string) => {
  const value = import.meta.env[envKey];

  if (!value) {
    // In production, throw an error immediately - no silent failures
    if (import.meta.env.PROD) {
      throw new Error(
        `CRITICAL: Missing required environment variable ${envKey}. ` +
        `Production builds cannot proceed without proper form configuration. ` +
        `Please set ${envKey} in your .env file.`
      );
    }

    // In development, use fallback if provided, but show warning
    if (import.meta.env.DEV && fallbackForDev) {
      console.warn(
        `⚠️ Warning: ${envKey} is not set. Using development placeholder. ` +
        `This will fail in production builds.`
      );
      return fallbackForDev;
    }

    // Even in development, fail if no fallback is provided
    throw new Error(`Missing required environment variable: ${envKey}`);
  }

  // Validate that the URL doesn't look like a placeholder
  if (value.includes('YOUR_LINK') || value.includes('PLACEHOLDER')) {
    throw new Error(
      `Invalid form URL for ${envKey}: "${value}" appears to be a placeholder. ` +
      `Please provide a valid form URL.`
    );
  }

  return value;
};

export const FORMS = {
  // Main forms
  contact: {
    id: getFormId('PUBLIC_CONTACT_FORM_ID', import.meta.env.DEV ? 'YOUR_CONTACT_FORM_ID' : undefined),
    url: getFormUrl('PUBLIC_CONTACT_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
    title: "Contact Us",
    height: "800px"
  },
  volunteer: {
    id: getFormId('PUBLIC_VOLUNTEER_FORM_ID', import.meta.env.DEV ? 'YOUR_VOLUNTEER_FORM_ID' : undefined),
    url: getFormUrl('PUBLIC_VOLUNTEER_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
    title: "Volunteer Sign-up",
    height: "1000px"
  },
  newsletter: {
    id: getFormId('PUBLIC_NEWSLETTER_FORM_ID', import.meta.env.DEV ? 'YOUR_NEWSLETTER_FORM_ID' : undefined),
    url: getFormUrl('PUBLIC_NEWSLETTER_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
    title: "Newsletter Subscription",
    height: "400px"
  },
  donation: {
    id: getFormId('PUBLIC_DONATION_FORM_ID', import.meta.env.DEV ? 'YOUR_DONATION_FORM_ID' : undefined),
    url: getFormUrl('PUBLIC_DONATION_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
    title: "Donation Interest",
    height: "600px"
  },

  // Project-specific forms
  projects: {
    aiHackathon: {
      id: getFormId('PUBLIC_AI_HACKATHON_FORM_ID', import.meta.env.DEV ? 'YOUR_AI_HACKATHON_FORM_ID' : undefined),
      url: getFormUrl('PUBLIC_AI_HACKATHON_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
      title: "AI Hackathon Registration",
      height: "900px"
    },
    workersAssist: {
      id: getFormId('PUBLIC_WORKERS_ASSIST_FORM_ID', import.meta.env.DEV ? 'YOUR_WORKERS_ASSIST_FORM_ID' : undefined),
      url: getFormUrl('PUBLIC_WORKERS_ASSIST_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
      title: "Workers Assist Program",
      height: "800px"
    },
    plantcoreAI: {
      id: getFormId('PUBLIC_PLANTCORE_FORM_ID', import.meta.env.DEV ? 'YOUR_PLANTCORE_FORM_ID' : undefined),
      url: getFormUrl('PUBLIC_PLANTCORE_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
      title: "Plantcore AI Interest",
      height: "700px"
    },
    srtp: {
      id: getFormId('PUBLIC_SRTP_FORM_ID', import.meta.env.DEV ? 'YOUR_SRTP_FORM_ID' : undefined),
      url: getFormUrl('PUBLIC_SRTP_FORM_URL', import.meta.env.DEV ? 'https://forms.gle/YOUR_LINK' : undefined),
      title: "S.R.T.P. Program Application",
      height: "900px"
    }
  },

  // Event registration forms (add as needed)
  events: {
    // Example:
    // summerGala2025: {
    //   id: "YOUR_EVENT_FORM_ID",
    //   url: "https://forms.gle/YOUR_FORM_LINK",
    //   title: "Summer Gala 2025 Registration",
    //   height: "700px"
    // }
  }
} as const;

// Type exports for TypeScript support
export type FormConfig = typeof FORMS;
export type MainFormKey = keyof typeof FORMS;
export type ProjectFormKey = keyof typeof FORMS.projects;
export type EventFormKey = keyof typeof FORMS.events;

// Development warning for placeholder IDs
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  const checkForms = (forms: any, path: string = '') => {
    Object.entries(forms).forEach(([key, value]: [string, any]) => {
      const currentPath = path ? `${path}.${key}` : key;

      if (value && typeof value === 'object') {
        if (value.id && typeof value.id === 'string') {
          if (!validateFormId(value.id)) {
            console.warn(`⚠️ Placeholder form ID detected at FORMS.${currentPath}.id: "${value.id}"`);
          }
        } else {
          checkForms(value, currentPath);
        }
      }
    });
  };

  checkForms(FORMS);
}