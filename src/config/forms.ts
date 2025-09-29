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

export const FORMS = {
  // Main forms
  contact: {
    id: "YOUR_CONTACT_FORM_ID", // Replace with actual form ID
    url: "https://forms.gle/YOUR_FORM_LINK", // Replace with short URL
    title: "Contact Us",
    height: "800px"
  },
  volunteer: {
    id: "YOUR_VOLUNTEER_FORM_ID",
    url: "https://forms.gle/YOUR_FORM_LINK",
    title: "Volunteer Sign-up",
    height: "1000px"
  },
  newsletter: {
    id: "YOUR_NEWSLETTER_FORM_ID",
    url: "https://forms.gle/YOUR_FORM_LINK",
    title: "Newsletter Subscription",
    height: "400px"
  },
  donation: {
    id: "YOUR_DONATION_FORM_ID",
    url: "https://forms.gle/YOUR_FORM_LINK",
    title: "Donation Interest",
    height: "600px"
  },

  // Project-specific forms
  projects: {
    aiHackathon: {
      id: "YOUR_AI_HACKATHON_FORM_ID",
      url: "https://forms.gle/YOUR_FORM_LINK",
      title: "AI Hackathon Registration",
      height: "900px"
    },
    workersAssist: {
      id: "YOUR_WORKERS_ASSIST_FORM_ID",
      url: "https://forms.gle/YOUR_FORM_LINK",
      title: "Workers Assist Program",
      height: "800px"
    },
    plantcoreAI: {
      id: "YOUR_PLANTCORE_FORM_ID",
      url: "https://forms.gle/YOUR_FORM_LINK",
      title: "Plantcore AI Interest",
      height: "700px"
    },
    srtp: {
      id: "YOUR_S.R.T.P._FORM_ID",
      url: "https://forms.gle/YOUR_FORM_LINK",
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