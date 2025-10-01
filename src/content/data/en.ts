/**
 * English content for the entire site
 */

import type { SiteContent } from '../types';
import { SITE_CONFIG } from '../../config/site';

const content: SiteContent = {
  navigation: {
    items: [
      { label: 'Home', href: '/' },
      {
        label: 'Who We Are',
        href: '/who-we-are',
        dropdown: [
          { label: 'About Us', href: '/who-we-are' },
          { label: 'Public Lectures', href: '/what-we-do/public-lectures' },
        ]
      },
      {
        label: 'What We Do',
        href: '/what-we-do',
        dropdown: [
          { label: 'AI Hackathon', href: '/what-we-do/ai-hackathon' },
          { label: 'Workers Assist', href: '/what-we-do/workers-assist' },
          { label: 'Plantcore AI', href: '/what-we-do/plantcore-ai' },
          { label: 'Public Lectures', href: '/what-we-do/public-lectures' },
        ]
      },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Contact', href: '/contact' },
      { label: 'Donate', href: '/donate' },
    ],
    logo: {
      text: 'SINTHOME',
      href: '/'
    }
  },

  footer: {
    copyright: '© 2024 SINTHOME. All rights reserved.',
    links: [
      {
        title: 'Organization',
        items: [
          { label: 'Who We Are', href: '/who-we-are' },
          { label: 'What We Do', href: '/what-we-do' },
          { label: 'Contact', href: '/contact' },
        ]
      },
      {
        title: 'Get Involved',
        items: [
          { label: 'Upcoming Events', href: '/events' },
          { label: 'Donate', href: '/donate' },
          { label: 'Newsletter', href: '/newsletter' },
        ]
      },
      {
        title: 'Legal',
        items: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ]
      }
    ],
    social: [
      { platform: 'github', url: SITE_CONFIG.urls.github, label: 'GitHub' },
      { platform: 'linkedin', url: SITE_CONFIG.urls.linkedin, label: 'LinkedIn' },
      { platform: 'twitter', url: SITE_CONFIG.urls.twitter, label: 'Twitter' },
      { platform: 'facebook', url: SITE_CONFIG.urls.facebook, label: 'Facebook' },
    ]
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
      themeLight: 'Light',
      themeDark: 'Dark',
      languageChinese: '中文',
      languageEnglish: 'EN'
    },
    messages: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
      notFound: 'Page not found'
    },
    labels: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      name: 'Name',
      message: 'Message',
      subject: 'Subject'
    }
  },

  pages: {
    home: {
      title: 'SINTHOME',
      description: 'A public-interest community reconstructing new relations of production',
      hero: {
        title: 'SINTHOME',
        tagline: 'Knowledge — Critique — Praxis',
        subtitle: 'A public-interest community reconstructing new relations of production through the integration of knowledge learning, theoretical critique, and social praxis',
        practices: [
          'Public Lectures',
          'Psychoanalysis',
          'Workers Assist',
          'AI for Public Good',
          'Factory AI Solution'
        ],
        cta: [
          { text: 'ABOUT US', href: '/who-we-are', style: 'primary' },
          { text: 'OUR PROJECTS', href: '/what-we-do', style: 'secondary' },
          { text: 'JOIN US', href: '/contact', style: 'outline' }
        ]
      }
    },

    whoWeAre: {
      title: 'Who We Are - SINTHOME',
      description: 'Learn about our mission, values, and the team behind SINTHOME',
      sections: [
        {
          id: 'mission',
          title: 'Our Mission',
          content: 'SINTHOME is dedicated to bridging technology gaps in underserved communities through innovative programs, education, and collaborative partnerships.'
        },
        {
          id: 'values',
          title: 'Our Values',
          items: [
            { title: 'Innovation', description: 'Leveraging cutting-edge technology to solve real-world problems' },
            { title: 'Community', description: 'Building strong, supportive networks that empower individuals' },
            { title: 'Accessibility', description: 'Making technology and education available to everyone' },
            { title: 'Impact', description: 'Creating lasting, positive change in communities worldwide' }
          ]
        }
      ]
    },

    whatWeDo: {
      title: 'What We Do - SINTHOME',
      description: 'Explore our programs and initiatives',
      sections: [
        {
          id: 'overview',
          title: 'Our Programs',
          content: 'We run multiple programs focused on technology education, community support, and innovation.'
        }
      ]
    },

    contact: {
      title: 'Contact Us - SINTHOME',
      description: 'Get in touch with our team',
      sections: [
        {
          id: 'form',
          title: 'Send us a message',
          type: 'form'
        },
        {
          id: 'info',
          title: 'Contact Information',
          items: [
            { title: 'Email', description: SITE_CONFIG.contact.email },
            { title: 'Phone', description: '+1 (555) 123-4567' },
            { title: 'Address', description: '123 Tech Street, San Francisco, CA 94102' }
          ]
        }
      ]
    },

    donate: {
      title: 'Donate - SINTHOME',
      description: 'Support our mission to empower communities through technology',
      sections: [
        {
          id: 'why',
          title: 'Why Donate?',
          content: 'Your contribution helps us expand our programs, reach more communities, and create lasting impact.'
        },
        {
          id: 'impact',
          title: 'Your Impact',
          items: [
            { title: '$25', description: 'Provides educational materials for one student' },
            { title: '$50', description: 'Sponsors a workshop session' },
            { title: '$100', description: 'Supports a community event' },
            { title: '$500', description: 'Funds a full training program' }
          ]
        }
      ]
    },

    events: {
      title: 'Upcoming Events - SINTHOME',
      description: 'Join us at our upcoming events and workshops',
      sections: [
        {
          id: 'upcoming',
          title: 'Upcoming Events',
          type: 'grid'
        }
      ]
    }
  },

  projects: [
    {
      id: 'workers-assist',
      title: 'Workers Assist',
      description: 'Mutual Support Community for Asian Labor Workers',
      category: 'Community Support',
      featured: true,
      href: '/what-we-do/workers-assist',
      impact: [
        '400+ active members',
        'Free language learning programs',
        'Youth education support',
        'Life skills training'
      ],
      status: 'active',
      content: [
        {
          id: 'overview',
          title: 'Mutual Support Community for Asian Labor Workers',
          subtitle: 'SOLIDARITY • EMPOWERMENT • COLLECTIVE ACTION',
          content: 'Workers Assist is a nonprofit organization dedicated to fostering a mutual-support community for Asian labor workers in the Boston area. Since its founding in 2023, WA has grown into a vibrant community platform of more than 400 active members.',
          type: 'text'
        },
        {
          id: 'services',
          title: 'WHAT WE DO',
          items: [
            {
              title: 'Free Language Learning',
              description: 'Community conversation corners, hospital/school scenario phrase cards, job interview practice, and translation support.'
            },
            {
              title: 'Youth Education Programs',
              description: 'Homework support, interest groups, city exploration; safe and fun learning environments for young people.'
            },
            {
              title: 'Everyday Life Skills Training',
              description: 'Community shop partnerships, medical process guides, housing and commute experience sharing—real problems solved on-site.'
            }
          ],
          type: 'grid'
        },
        {
          id: 'vision',
          title: 'OUR VISION',
          content: 'In the near future, WA\'s next step is to grow into a closer-knit mutual support community. We hope to achieve this by working closely with local small vendors, restaurants, service providers, and building stronger connections through collaboration.',
          type: 'text'
        },
        {
          id: 'join',
          title: 'JOIN US',
          content: 'We are currently recruiting: Volunteer Teachers, Business Development Volunteers, and Community Partners. To join English class and youth program participation as a student, please contact: +1 857-833-1708',
          type: 'cta'
        },
        {
          id: 'faq',
          title: 'FREQUENTLY ASKED QUESTIONS',
          items: [
            {
              title: 'Who can join Workers Assist?',
              description: 'WA is open to all Asian labor workers in the Boston area, and we welcome anyone interested in supporting our community through volunteer service or collaboration.'
            },
            {
              title: 'Are services really free?',
              description: 'Yes! All our core services, including language learning, life skills training, and youth education programs, are completely free for community members.'
            },
            {
              title: 'How can businesses participate?',
              description: 'Local businesses can join our service directory, offer special discounts to community members, or provide in-kind support for our programs.'
            },
            {
              title: 'What volunteer opportunities are available?',
              description: 'We need volunteer teachers for English classes, business development volunteers to help expand our network, and general volunteers for community events and programs.'
            }
          ],
          type: 'faq'
        }
      ]
    },
    {
      id: 'srtp',
      title: 'Public Lectures',
      description: 'Sinthome Revolutionary Theory Practice - Interrogating praxis, until it unveils the future',
      category: 'Research & Theory',
      featured: true,
      href: '/what-we-do/public-lectures',
      status: 'active',
      content: [
        {
          id: 'overview',
          title: 'Interrogating praxis, until it unveils the future.',
          content: 'There is no clear path that leads theoretical critique to social praxis. Born from this rupture between theory and praxis, Sinthome Revolutionary Theory Practice (S.R.T.P.) is such a special yet indispensable program that formulates the guidelines for Sinthome\'s social praxis.',
          type: 'text'
        },
        {
          id: 'approach',
          content: 'By hosting weekly lectures and seminars, S.R.T.P. harbors a self-reflexive intellectual community that facilitates the necessary circulation between theoretical critique and social praxis. Departing from knowledge learning and theoretical critique, we interrogate every possible dimension of our own praxis: What is the meaning of our praxis? How can it be theorized? How can it lead to new revolutionary thinking?',
          type: 'text'
        },
        {
          id: 'philosophy',
          content: 'Marx once said, "Philosophers have only interpreted the world in various ways; the point, however, is to change it." Yet, who is changing the world? Which world needs to be changed? On this point, Marx remained silent. It is precisely this silence that constitutes our origin (ἀρχή) of departure.',
          type: 'text'
        },
        {
          id: 'mission',
          content: 'The task of S.R.T.P. is established within this call. We are not here to interpret the world in order to understand it, nor do we interpret first and only "then (dann)" go on to change it. Marx\'s "aber" precedes all interpretation, precedes all theory. Changing the world is the sole a priori, the absolute principle.',
          type: 'text'
        },
        {
          id: 'conclusion',
          content: 'S.R.T.P. is both a machine of reflection and an apparatus of interrogation: Its very existence is a reminder—The world must be changed, and all theory and praxis must assume this mission.',
          type: 'text'
        }
      ]
    },
    {
      id: 'plantcore-ai',
      title: 'Plantcore.AI',
      description: 'Building the world\'s first Industrial Vertical Large Language Model',
      category: 'AI & Technology',
      featured: true,
      href: '/what-we-do/plantcore-ai',
      status: 'active',
      content: [
        {
          id: 'mission',
          title: 'Mission — Reshaping the Future of Industry',
          content: 'Plantcore.AI is committed to building the world\'s first Industrial Vertical Large Language Model (LLM) to drive a fundamental transformation in manufacturing. We believe the future of industry is not limited to automated execution but lies in the intelligent and collective structuring of decision-making.',
          type: 'text'
        },
        {
          id: 'method',
          title: 'Method — Starting from Decisions',
          content: 'Current ERP systems record transactions and processes but fail to capture the on-the-ground choices made by workers and managers in real time. Plantcore.AI addresses this gap by deploying AI Agents directly on the factory floor to capture Context–Decision–Outcome (CDO) data.',
          type: 'text'
        },
        {
          id: 'architecture',
          title: 'Three-Layer Architecture',
          items: [
            {
              title: 'AI Agents',
              description: 'Generate direct value and cover decision points where ERP cannot reach.'
            },
            {
              title: 'CDO Data Platform',
              description: 'Standardizes and systematizes decisions into a governed "decision ledger."'
            },
            {
              title: 'Industrial Vertical LLM',
              description: 'Trains on authentic decision data to become the decision operating system for manufacturing.'
            }
          ],
          type: 'list'
        },
        {
          id: 'vision',
          title: 'Our Vision',
          content: 'By 2030, Plantcore.AI will reach 10,000 factories and 150,000 AI Agents, generating hundreds of millions of validated decision samples. On this foundation, we will train and deploy the world\'s first Industrial Vertical LLM.',
          type: 'text'
        },
        {
          id: 'philosophy',
          title: 'Our Philosophy',
          content: 'At Plantcore.AI, we believe the true industrial revolution is not the replacement of workers by machines, but the creation of an intelligent decision network—powered by an Industrial LLM—that redefines the relationship between humans and production.',
          type: 'text'
        }
      ]
    },
    {
      id: 'ai-hackathon',
      title: 'AI Hackathon',
      description: 'AI NGO & Hackathon - Reimagining how technology can be practiced in the service of public good',
      category: 'Events & Education',
      featured: true,
      href: '/what-we-do/ai-hackathon',
      status: 'active',
      content: [
        {
          id: 'overview',
          title: 'AI NGO & Hackathon',
          content: 'Sinthome Hackathon starts with a simple question: how can current AI tools be tailored to address real-world challenges in the practice of social good? We believe the answer does not lie in lofty ideals, but in grounding our work in the lived experiences of Boston\'s NGOs and local communities.',
          type: 'text'
        },
        {
          id: 'objectives',
          title: 'Objectives',
          items: [
            {
              title: 'Giving voice to nonprofits and vulnerable groups',
              description: 'Helping practitioners and beneficiaries clearly articulate their needs, and turning these needs into actionable solutions through AI tools.'
            },
            {
              title: 'Cultivating social awareness among technologists',
              description: 'Building bridges between students, young professionals, and nonprofit workers, enabling mutual learning in hackathons on how AI can be transformed into social impact.'
            },
            {
              title: 'Driving solutions to concrete social issues',
              description: 'Developing practical and sustainable approaches to challenges such as language barriers, employment skills, youth mental health, and maternal and infant health.'
            },
            {
              title: 'Integrating the humanities with technology',
              description: 'Encouraging participants to explore the humanistic value of AI through real-world social issues, fostering dialogue between technology and the humanities.'
            }
          ],
          type: 'grid'
        }
      ]
    }
  ],

  events: [
    // Events will be populated from actual event data
  ]
};

export default content;