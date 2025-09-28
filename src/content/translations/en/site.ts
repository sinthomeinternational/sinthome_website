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
    upcomingEvents: {
      title: 'Upcoming Events',
      description: 'Join us at our upcoming events and initiatives',
      events: {
        srtp: {
          title: 'S.R.T.P. Lectures',
          tags: ['Theory & Practice', 'Ongoing'],
          location: 'Boston, USA',
          schedule: 'Every Saturday',
          scheduleFull: 'Fall 2025',
          format: 'In-person',
          type: 'Lectures & Seminars',
          aboutTitle: 'About This Event',
          description: 'S.R.T.P. (Sinthome Revolutionary Theory Practice) is a department dedicated to closely linking theoretical critique with social praxis. Through weekly lectures and seminars, it encourages practitioners to continually reflect on and interrogate their actions, explore their meaning and potential, and transform practical experience into new theory and revolutionary ideas. S.R.T.P. focuses not only on praxis itself but also on how to create the future and change the world through practice.',
        },
        onlineCommunity: {
          title: 'Online Community',
          tags: ['Education Platform', 'Schedule TBD'],
          location: 'Online',
          schedule: 'TBD',
          format: 'WeChat + Tencent Meeting',
          type: 'Virtual Community',
          aboutTitle: 'About This Event',
          description: 'The online community is Sinthome\'s public education platform. In the summer of 2025, we organized four lecture series—each about eight weeks long—on History, community practice, Political Philosophy, and Lacan\'s Seminar on Love. After the summer, the platform shifted to weekly year-round lectures on Leftist theory, philosophy, sociology, and the broader humanities. It enables participation for those unable to attend offline, systematizes and shares our knowledge, provides a steady space for discussion and learning, and allows those who resonate with these ideas to engage further, receive training, and put theory into practice.',
        },
        nyMedia: {
          title: 'New York Media & Interviews',
          tags: ['Media Initiative', 'Ongoing'],
          location: 'New York City',
          schedule: 'Ongoing, irregularly',
          format: 'Interviews & Documentaries',
          type: 'Media Production',
          aboutTitle: 'About This Event',
          description: 'The media initiative is a key platform for connecting Sinthome with social movements in the U.S. A friend of ours studying journalism in New York, together with his small team, carries out interviews and documentary work. They meet with scholars and activists across the country and focus on grassroots organizations in New York, using interviews, films, and collaborative reporting to highlight the histories and struggles of the Left. At the same time, this project provides Chinese-speaking audiences with a channel to understand and connect with U.S. movements.',
        },
        hackathon: {
          title: 'Hackathon',
          tags: ['Tech for Good', 'Sept 2025'],
          location: 'Boston TBD',
          schedule: 'Sept 2025 (trial)',
          scheduleFull: 'TBD (public)',
          format: 'In-person',
          type: 'Competition & Collaboration',
          aboutTitle: 'About This Event',
          description: 'A hackathon initiative combining artificial intelligence and social issues. By bringing together students, young professionals, and nonprofit workers, the hackathon fosters mutual learning across diverse perspectives and creates a shared space to reimagine how technology can be practiced in the service of public good. This year\'s subthemes highlight diverse challenges, from supporting Asian workers in Boston with language access, to providing peer counseling for youth mental health, to empowering small and medium-sized manufacturers through industry-specific AI agents.',
        },
        eslClass: {
          title: 'Free ESL Class',
          tags: ['Workers Assist', 'Ongoing'],
          location: 'Boston, Chinatown',
          schedule: '2x in-person',
          scheduleFull: '2x online/week',
          format: 'Hybrid',
          type: 'Education & Support',
          aboutTitle: 'About This Event',
          description: 'Workers Assist invites you to our free English class! Together, we\'ll practice daily English, learn useful life skills, and support each other in a friendly, community-based classroom.',
        },
      },
      labels: {
        location: 'Location',
        schedule: 'Schedule',
        format: 'Format',
        type: 'Type',
      },
    },
  },
  projects: [],
  events: [],
};

export default enContent;