/**
 * English translations for the Sinthome website
 */

import type { SiteContent } from '../../types';

export const enContent: SiteContent = {
  navigation: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Who We Are', href: '/who-we-are' },
      {
        label: 'What We Do',
        href: '/what-we-do',
        dropdown: [
          { label: 'AI Hackathon', href: '/what-we-do/ai-hackathon' },
          { label: 'Workers Assist', href: '/what-we-do/workers-assist' },
          { label: 'Plantcore AI', href: '/what-we-do/plantcore-ai' },
          { label: 'S.R.T.P.', href: '/what-we-do/srtp' },
        ],
      },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Contact', href: '/contact' },
      { label: 'Donate', href: '/donate' },
    ],
    logo: {
      text: 'SINTHOME',
      href: '/',
    },
  },
  footer: {
    copyright: '© 2025 Sinthome. All rights reserved.',
    links: [
      {
        title: 'Organization',
        items: [
          { label: 'About Us', href: '/who-we-are' },
          { label: 'Our Mission', href: '/who-we-are#mission' },
          { label: 'Team', href: '/who-we-are#team' },
          { label: 'Partners', href: '/who-we-are#partners' },
        ],
      },
      {
        title: 'Programs',
        items: [
          { label: 'AI Hackathon', href: '/what-we-do/ai-hackathon' },
          { label: 'Workers Assist', href: '/what-we-do/workers-assist' },
          { label: 'S.R.T.P.', href: '/what-we-do/srtp' },
          { label: 'All Projects', href: '/what-we-do' },
        ],
      },
      {
        title: 'Get Involved',
        items: [
          { label: 'Volunteer', href: '/volunteer' },
          { label: 'Donate', href: '/donate' },
          { label: 'Events', href: '/events' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    social: [
      { platform: 'Twitter', url: 'https://twitter.com/sinthome', label: 'Follow us on Twitter' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/sinthome', label: 'Connect on LinkedIn' },
      { platform: 'GitHub', url: 'https://github.com/sinthome', label: 'View our code on GitHub' },
    ],
  },
  common: {
    buttons: {
      learnMore: 'Learn More',
      readMore: 'Read More',
      register: 'Register',
      donate: 'Donate',
      contact: 'Contact Us',
      submit: 'Submit',
      cancel: 'Cancel',
      back: 'Back',
      next: 'Next',
    },
    messages: {
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      success: 'Success!',
      notFound: 'Page not found',
    },
    labels: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      name: 'Name',
      message: 'Message',
      subject: 'Subject',
    },
  },
  pages: {
    home: {
      title: 'Sinthome - Knowledge, Critique, Praxis',
      description: 'A public-interest community reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis',
      hero: {
        title: 'SINTHOME',
        tagline: 'Knowledge — Critique — Praxis',
        practices: [
          'Public Lectures',
          'Psychoanalysis',
          'Workers Assist',
          'AI for Public Good',
          'Factory AI Solution',
        ],
        cta: [
          { text: 'ABOUT US', href: '/who-we-are', style: 'primary' },
          { text: 'OUR PROJECTS', href: '/what-we-do', style: 'secondary' },
          { text: 'JOIN US', href: '/contact', style: 'outline' },
        ],
      },
    },
    whoWeAre: {
      title: 'Who We Are',
      description: 'Learn about our mission, vision, and the team behind Sinthome',
      sections: [
        {
          id: 'mission',
          title: 'Our Mission',
          content: 'We are dedicated to reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis.',
        },
        {
          id: 'vision',
          title: 'Our Vision',
          content: 'A world where technology and human values work together to create equitable and sustainable communities.',
        },
      ],
    },
    whatWeDo: {
      title: 'What We Do',
      description: 'Explore our projects and initiatives',
      sections: [
        {
          id: 'projects',
          title: 'Our Projects',
          content: 'We work on various initiatives that combine technology, education, and social impact.',
        },
      ],
    },
  },
  projects: [],
  events: [],
};