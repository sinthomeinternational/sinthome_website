/**
 * Chinese content for the entire site
 * This is a placeholder - content needs to be translated
 */

import type { SiteContent } from '../types';
import { SITE_CONFIG } from '../../config/site';

const content: SiteContent = {
  navigation: {
    items: [
      { label: '首页', href: '/' },
      { label: '关于我们', href: '/who-we-are' },
      {
        label: '我们的工作',
        href: '/what-we-do',
        dropdown: [
          { label: 'AI 黑客松', href: '/what-we-do/ai-hackathon' },
          { label: '工友互助', href: '/what-we-do/workers-assist' },
          { label: 'Plantcore AI', href: '/what-we-do/plantcore-ai' },
          { label: 'S.R.T.P.', href: '/what-we-do/srtp' },
        ]
      },
      { label: '近期活动', href: '/events' },
      { label: '联系我们', href: '/contact' },
      { label: '捐赠', href: '/donate' },
    ],
    logo: {
      text: 'SINTHOME',
      href: '/'
    }
  },

  footer: {
    copyright: '© 2024 SINTHOME. 版权所有。',
    links: [
      {
        title: '组织',
        items: [
          { label: '关于我们', href: '/who-we-are' },
          { label: '我们的工作', href: '/what-we-do' },
          { label: '联系方式', href: '/contact' },
        ]
      },
      {
        title: '参与',
        items: [
          { label: '近期活动', href: '/events' },
          { label: '捐赠支持', href: '/donate' },
          { label: '新闻订阅', href: '/newsletter' },
        ]
      },
      {
        title: '法律',
        items: [
          { label: '隐私政策', href: '/privacy' },
          { label: '服务条款', href: '/terms' },
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
      learnMore: '了解更多',
      readMore: '阅读更多',
      register: '注册',
      donate: '捐赠',
      contact: '联系我们',
      submit: '提交',
      cancel: '取消',
      back: '返回',
      next: '下一步'
    },
    messages: {
      loading: '加载中...',
      error: '发生错误',
      success: '成功！',
      notFound: '页面未找到'
    },
    labels: {
      email: '电子邮件',
      phone: '电话',
      address: '地址',
      name: '姓名',
      message: '消息',
      subject: '主题'
    }
  },

  pages: {
    home: {
      title: 'SINTHOME',
      description: '一个重建新生产关系的公益社区',
      hero: {
        title: 'SINTHOME',
        tagline: '学习 — 批判 — 实践',
        subtitle: '一个通过知识学习、理论批判和社会实践的整合来重建新生产关系的公益社区',
        practices: [
          '公共讲座',
          '精神分析',
          '工人援助',
          '公益人工智能',
          '工厂AI解决方案'
        ],
        cta: [
          { text: '关于我们', href: '/who-we-are', style: 'primary' },
          { text: '我们的项目', href: '/what-we-do', style: 'secondary' },
          { text: '加入我们', href: '/contact', style: 'outline' }
        ]
      }
    },

    whoWeAre: {
      title: '关于我们 - SINTHOME',
      description: '了解我们的使命、价值观和SINTHOME背后的团队',
      sections: [
        {
          id: 'mission',
          title: '我们的使命',
          content: 'SINTHOME致力于通过创新项目、教育和合作伙伴关系，弥合服务不足社区的技术差距。'
        },
        {
          id: 'values',
          title: '我们的价值观',
          items: [
            { title: '创新', description: '利用尖端技术解决现实问题' },
            { title: '社区', description: '建立强大的支持网络，赋予个人力量' },
            { title: '可及性', description: '让每个人都能获得技术和教育' },
            { title: '影响力', description: '在全球社区创造持久的积极变化' }
          ]
        }
      ]
    },

    whatWeDo: {
      title: '我们的工作 - SINTHOME',
      description: '探索我们的项目和倡议',
      sections: [
        {
          id: 'overview',
          title: '我们的项目',
          content: '我们运行多个专注于技术教育、社区支持和创新的项目。'
        }
      ]
    },

    contact: {
      title: '联系我们 - SINTHOME',
      description: '与我们的团队取得联系',
      sections: [
        {
          id: 'form',
          title: '给我们发送消息',
          type: 'form'
        },
        {
          id: 'info',
          title: '联系信息',
          items: [
            { title: '电子邮件', description: SITE_CONFIG.contact.email },
            { title: '电话', description: '+1 (555) 123-4567' },
            { title: '地址', description: '123 Tech Street, San Francisco, CA 94102' }
          ]
        }
      ]
    },

    donate: {
      title: '捐赠 - SINTHOME',
      description: '支持我们通过科技赋能社区的使命',
      sections: [
        {
          id: 'why',
          title: '为什么捐赠？',
          content: '您的贡献帮助我们扩展项目，触及更多社区，创造持久影响。'
        },
        {
          id: 'impact',
          title: '您的影响',
          items: [
            { title: '$25', description: '为一名学生提供教育材料' },
            { title: '$50', description: '赞助一次工作坊' },
            { title: '$100', description: '支持一次社区活动' },
            { title: '$500', description: '资助完整的培训项目' }
          ]
        }
      ]
    },

    events: {
      title: '近期活动 - SINTHOME',
      description: '加入我们的活动和工作坊',
      sections: [
        {
          id: 'upcoming',
          title: '即将举行的活动',
          type: 'grid'
        }
      ]
    }
  },

  projects: [
    {
      id: 'workers-assist',
      title: '工友互助',
      description: '亚裔劳工互助社区',
      category: '社区支持',
      featured: true,
      href: '/what-we-do/workers-assist',
      impact: [
        '400+ 活跃成员',
        '免费语言学习项目',
        '青少年教育支持',
        '生活技能培训'
      ],
      status: 'active',
      content: [
        {
          id: 'overview',
          title: '亚裔劳工互助社区',
          subtitle: '团结 • 赋能 • 集体行动',
          content: '工友互助是一个非营利组织，致力于为波士顿地区的亚裔劳工建立互助社区。自2023年成立以来，WA已成长为拥有400多名活跃成员的充满活力的社区平台。',
          type: 'text'
        }
      ]
    },
    {
      id: 'srtp',
      title: 'S.R.T.P.',
      description: 'Sinthome革命理论实践 - 审问实践，直到它揭示未来',
      category: '研究与理论',
      featured: true,
      href: '/what-we-do/srtp',
      status: 'active',
      content: [
        {
          id: 'overview',
          title: '审问实践，直到它揭示未来',
          content: '从理论批判到社会实践没有明确的路径。生于理论与实践之间的断裂，Sinthome革命理论实践（S.R.T.P.）是这样一个特殊而不可或缺的项目，它为Sinthome的社会实践制定了指导方针。',
          type: 'text'
        }
      ]
    },
    {
      id: 'plantcore-ai',
      title: 'Plantcore.AI',
      description: '构建世界首个工业垂直大型语言模型',
      category: 'AI与技术',
      featured: true,
      href: '/what-we-do/plantcore-ai',
      status: 'active',
      content: [
        {
          id: 'mission',
          title: '使命 — 重塑工业未来',
          content: 'Plantcore.AI致力于构建世界首个工业垂直大型语言模型（LLM），推动制造业的根本性转型。我们相信工业的未来不仅限于自动化执行，而在于决策的智能化和集体化结构。',
          type: 'text'
        }
      ]
    },
    {
      id: 'ai-hackathon',
      title: 'AI 黑客松',
      description: 'AI NGO与黑客松 - 重新想象技术如何服务于公共利益',
      category: '活动与教育',
      featured: true,
      href: '/what-we-do/ai-hackathon',
      status: 'active',
      content: [
        {
          id: 'overview',
          title: 'AI NGO与黑客松',
          content: 'Sinthome黑客松从一个简单的问题开始：当前的AI工具如何才能被定制以应对社会公益实践中的现实挑战？我们相信答案不在于崇高的理想，而在于扎根于波士顿NGO和当地社区的生活经验。',
          type: 'text'
        }
      ]
    }
  ],

  events: [
    // 活动将从实际活动数据中填充
  ]
};

export default content;