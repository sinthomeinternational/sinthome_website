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

// Use environment variables with fallback to placeholders
const getFormId = (envKey: string, fallback: string = 'YOUR_FORM_ID') => {
  return import.meta.env[envKey] || fallback;
};

const getFormUrl = (envKey: string, fallback: string = 'https://forms.gle/YOUR_LINK') => {
  return import.meta.env[envKey] || fallback;
};

export const FORMS = {
  // Main forms
  contact: {
    id: getFormId('PUBLIC_CONTACT_FORM_ID', 'YOUR_CONTACT_FORM_ID'),
    url: getFormUrl('PUBLIC_CONTACT_FORM_URL'),
    title: "Contact Us",
    height: "800px"
  },
  volunteer: {
    id: getFormId('PUBLIC_VOLUNTEER_FORM_ID', 'YOUR_VOLUNTEER_FORM_ID'),
    url: getFormUrl('PUBLIC_VOLUNTEER_FORM_URL'),
    title: "Volunteer Sign-up",
    height: "1000px"
  },
  newsletter: {
    id: getFormId('PUBLIC_NEWSLETTER_FORM_ID', 'YOUR_NEWSLETTER_FORM_ID'),
    url: getFormUrl('PUBLIC_NEWSLETTER_FORM_URL'),
    title: "Newsletter Subscription",
    height: "400px"
  },
  donation: {
    id: getFormId('PUBLIC_DONATION_FORM_ID', 'YOUR_DONATION_FORM_ID'),
    url: getFormUrl('PUBLIC_DONATION_FORM_URL'),
    title: "Donation Interest",
    height: "600px"
  },

  // Project-specific forms
  projects: {
    aiHackathon: {
      id: getFormId('PUBLIC_AI_HACKATHON_FORM_ID', 'YOUR_AI_HACKATHON_FORM_ID'),
      url: getFormUrl('PUBLIC_AI_HACKATHON_FORM_URL'),
      title: "AI Hackathon Registration",
      height: "900px"
    },
    workersAssist: {
      id: getFormId('PUBLIC_WORKERS_ASSIST_FORM_ID', 'YOUR_WORKERS_ASSIST_FORM_ID'),
      url: getFormUrl('PUBLIC_WORKERS_ASSIST_FORM_URL'),
      title: "Workers Assist Program",
      height: "800px"
    },
    plantcoreAI: {
      id: getFormId('PUBLIC_PLANTCORE_FORM_ID', 'YOUR_PLANTCORE_FORM_ID'),
      url: getFormUrl('PUBLIC_PLANTCORE_FORM_URL'),
      title: "Plantcore AI Interest",
      height: "700px"
    },
    srtp: {
      id: getFormId('PUBLIC_SRTP_FORM_ID', 'YOUR_SRTP_FORM_ID'),
      url: getFormUrl('PUBLIC_SRTP_FORM_URL'),
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