// 内容管理系统
// 这个文件用于管理所有项目的内容数据

export interface ProjectContent {
  title: string;
  overview: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  vision?: string;
  goals?: Array<{
    title: string;
    description: string;
  }>;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

// Workers Assist 内容
export const workersAssistContent: ProjectContent = {
  title: "Workers Assist",
  overview: "Workers Assist is a nonprofit organization dedicated to fostering a mutual-support community for Asian labor workers in the Boston area. Since its founding in 2023, WA has grown into a vibrant community platform of more than 400 active members.",
  description: "Together, we provide a wide range of supportive services, including free language learning, everyday life skills training, and youth education programs. At WA, we believe in more than just offering help—we choose to live alongside our community. By addressing real problems in daily life and fostering connections of trust and care, we work toward a future where mutual support strengthens every member of our community.",
  features: [
    {
      title: "Free Language Learning",
      description: "English classes and language support to help community members integrate and communicate effectively."
    },
    {
      title: "Life Skills Training", 
      description: "Practical training in everyday life skills to help workers navigate daily challenges and opportunities."
    },
    {
      title: "Youth Education",
      description: "Educational programs and support for young people in the community to ensure their future success."
    },
    {
      title: "Community Support",
      description: "Mutual support network where community members help each other through life's challenges."
    }
  ],
  metrics: [
    { value: "400+", label: "Active Members" },
    { value: "2023", label: "Founded" },
    { value: "Boston", label: "Area Focus" }
  ],
  vision: "In the near future, WA's next step is to grow into a closer-knit mutual support community. We hope to achieve this by working closely with local small vendors, restaurants, service providers, and building stronger connections through collaboration.",
  goals: [
    {
      title: "Collaborate with Local Small Businesses",
      description: "WA invites small businesses in Chinatown to include their services in the community service directory. Workers and community members can access these services while also benefiting from services offered by other participating businesses, creating a mutually supportive community ecosystem."
    },
    {
      title: "Continuously Expand Community Services",
      description: "As more businesses and community members join, the service directory grows to cover a wider range of daily life and work scenarios, providing comprehensive and diverse support and opportunities for all participants."
    },
    {
      title: "Build an Inclusive Mutual Support Platform",
      description: "Regardless of members' circumstances—whether at home, at work, or in daily life—everyone can find services suited to their needs, facilitating resource sharing and mutual support so that every community member can benefit."
    }
  ],
  contact: {
    phone: "+1 857-833-1708"
  },
  faq: [
    {
      question: "Who can join Workers Assist?",
      answer: "WA is open to all Asian labor workers in the Boston area, as well as anyone interested in supporting our community through volunteering or partnership."
    },
    {
      question: "Are the services really free?",
      answer: "Yes! All our core services including language learning, life skills training, and youth education programs are completely free for community members."
    },
    {
      question: "How can businesses get involved?",
      answer: "Local businesses can join our service directory, offer special rates to community members, or provide in-kind support for our programs."
    },
    {
      question: "What volunteer opportunities are available?",
      answer: "We need volunteer teachers for English classes, business development volunteers to help expand our network, and general volunteers for community events and programs."
    }
  ]
};

// Plantcore.AI 内容
export const plantcoreAIContent: ProjectContent = {
  title: "Plantcore.AI",
  overview: "Plantcore.AI is committed to building the world's first Industrial Vertical Large Language Model (LLM) to drive a fundamental transformation in manufacturing. We believe the future of industry is not limited to automated execution but lies in the intelligent and collective structuring of decision-making.",
  description: "Every act of production is shaped by countless judgments and choices—decisions that are the true drivers of industry. Plantcore.AI begins from this reality, aiming to construct a new industrial intelligence system grounded in real-world decision data.",
  features: [
    {
      title: "AI Agents",
      description: "Generate direct value and cover decision points where ERP cannot reach. Deployed directly on factory floors to capture real-time decision data."
    },
    {
      title: "CDO Data Platform",
      description: "Standardizes and systematizes decisions into a governed \"decision ledger.\" Captures Context–Decision–Outcome data for continuous learning and improvement."
    },
    {
      title: "Industrial Vertical LLM",
      description: "Trains on authentic decision data to become the decision operating system for manufacturing. The world's first industrial-specific large language model."
    },
    {
      title: "Real-Time Decision Capture",
      description: "AI Agents deployed on factory floors capture decisions as they happen, creating a continuous stream of valuable data."
    }
  ],
  metrics: [
    { value: "≥10%", label: "Procurement Savings" },
    { value: "~7%", label: "Inventory Shrinkage Reduction" },
    { value: "10,000", label: "Factories by 2030" },
    { value: "150,000", label: "AI Agents by 2030" }
  ],
  vision: "Our vision is to build, within the next five years, a decision-data-driven industrial intelligence network through continuous agent deployment and CDO data collection. By 2030, Plantcore.AI will reach 10,000 factories and 150,000 AI Agents, generating hundreds of millions of validated decision samples.",
  goals: [
    {
      title: "Industrial Intelligence Network",
      description: "Build a decision-data-driven industrial intelligence network through continuous agent deployment and CDO data collection."
    },
    {
      title: "World's First Industrial LLM",
      description: "Train and deploy the world's first Industrial Vertical LLM—an engine of decision-making grounded in authentic factory data."
    },
    {
      title: "Industry 4.0 Operating System",
      description: "Create an LLM that serves as the operating system of Industry 4.0, guiding real-time production choices and reshaping human-machine collaboration."
    }
  ],
  faq: [
    {
      question: "What makes Plantcore.AI different from traditional ERP systems?",
      answer: "While ERP systems record transactions and processes, Plantcore.AI captures the actual decisions made by workers and managers in real-time, creating a decision ledger that enables true intelligent automation."
    },
    {
      question: "How do AI Agents work on the factory floor?",
      answer: "Our AI Agents are deployed directly in manufacturing environments to observe, capture, and analyze decision-making processes, providing immediate value while building the foundation for our Industrial LLM."
    },
    {
      question: "What is the CDO Data Platform?",
      answer: "The Context-Decision-Outcome (CDO) Data Platform standardizes how we capture and store decision data, creating a governed \"decision ledger\" that becomes the training data for our Industrial Vertical LLM."
    },
    {
      question: "What kind of ROI can we expect?",
      answer: "Our AI Agents deliver immediate ROI with ≥10% procurement savings and ~7% inventory shrinkage reduction, while building the foundation for long-term intelligent decision-making capabilities."
    }
  ]
};

// 内容获取函数
export function getProjectContent(project: 'workers-assist' | 'plantcore-ai'): ProjectContent {
  switch (project) {
    case 'workers-assist':
      return workersAssistContent;
    case 'plantcore-ai':
      return plantcoreAIContent;
    default:
      throw new Error(`Unknown project: ${project}`);
  }
}
