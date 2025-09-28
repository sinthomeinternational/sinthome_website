/**
 * Chinese translations for the Sinthome website
 */

import type { SiteContent } from '../../types';

export const zhContent: SiteContent = {
  navigation: {
    items: [
      { label: '首页', href: '/' },
      { label: '关于我们', href: '/who-we-are' },
      {
        label: '我们的工作',
        href: '/what-we-do',
        dropdown: [
          { label: 'AI 黑客马拉松', href: '/what-we-do/ai-hackathon' },
          { label: '工人援助', href: '/what-we-do/workers-assist' },
          { label: '工厂 AI 解决方案', href: '/what-we-do/plantcore-ai' },
          { label: 'S.R.T.P.', href: '/what-we-do/srtp' },
        ],
      },
      { label: '活动', href: '/events' },
      { label: '联系我们', href: '/contact' },
      { label: '捐赠', href: '/donate' },
    ],
    logo: {
      text: 'SINTHOME',
      href: '/',
    },
  },
  footer: {
    copyright: '© 2025 Sinthome. 保留所有权利。',
    links: [
      {
        title: '组织',
        items: [
          { label: '关于我们', href: '/who-we-are' },
          { label: '我们的使命', href: '/who-we-are#mission' },
          { label: '团队', href: '/who-we-are#team' },
          { label: '合作伙伴', href: '/who-we-are#partners' },
        ],
      },
      {
        title: '项目',
        items: [
          { label: 'AI 黑客马拉松', href: '/what-we-do/ai-hackathon' },
          { label: '工人援助', href: '/what-we-do/workers-assist' },
          { label: 'S.R.T.P.', href: '/what-we-do/srtp' },
          { label: '所有项目', href: '/what-we-do' },
        ],
      },
      {
        title: '参与',
        items: [
          { label: '志愿者', href: '/volunteer' },
          { label: '捐赠', href: '/donate' },
          { label: '活动', href: '/events' },
          { label: '联系', href: '/contact' },
        ],
      },
    ],
    social: [
      { platform: 'Twitter', url: 'https://twitter.com/sinthome', label: '在Twitter上关注我们' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/sinthome', label: '在LinkedIn上联系' },
      { platform: 'GitHub', url: 'https://github.com/sinthome', label: '在GitHub上查看我们的代码' },
    ],
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
      next: '下一步',
    },
    messages: {
      loading: '加载中...',
      error: '出了点问题，请重试。',
      success: '成功！',
      notFound: '页面未找到',
    },
    labels: {
      email: '电子邮件',
      phone: '电话',
      address: '地址',
      name: '姓名',
      message: '消息',
      subject: '主题',
    },
  },
  pages: {
    home: {
      title: 'Sinthome - 知识、批判、实践',
      description: '通过知识学习、理论批判和社会实践的整合，重建新的生产关系的公益社区',
      hero: {
        title: 'SINTHOME',
        tagline: '知识 — 批判 — 实践',
        practices: [
          '公开讲座',
          '精神分析',
          '工人援助',
          '公益人工智能',
          '工厂AI解决方案',
        ],
        cta: [
          { text: '关于我们', href: '/who-we-are', style: 'primary' },
          { text: '我们的项目', href: '/what-we-do', style: 'secondary' },
          { text: '加入我们', href: '/contact', style: 'outline' },
        ],
      },
    },
    whoWeAre: {
      title: '关于我们',
      description: '了解我们的使命、愿景和团队',
      sections: [
        {
          id: 'mission',
          title: '我们的使命',
          content: '我们致力于通过知识学习、理论批判和社会实践的整合，重建新的生产关系。',
        },
        {
          id: 'vision',
          title: '我们的愿景',
          content: '一个技术与人文价值共同创造公平、可持续社区的世界。',
        },
      ],
    },
    whatWeDo: {
      title: '我们的工作',
      description: '探索我们的项目和倡议',
      sections: [
        {
          id: 'projects',
          title: '我们的项目',
          content: '我们致力于结合技术、教育和社会影响的各种倡议。',
        },
      ],
    },
    upcomingEvents: {
      title: '即将举行的活动',
      description: '欢迎参加我们即将举行的活动和倡议',
      events: {
        srtp: {
          title: 'S.R.T.P. 讲座',
          tags: ['理论与实践', '进行中'],
          location: '美国波士顿',
          schedule: '每周六',
          scheduleFull: '2025年秋季',
          format: '线下',
          type: '讲座与研讨会',
          aboutTitle: '关于此活动',
          description: '[Chinese translation pending]',
        },
        onlineCommunity: {
          title: '线上社区',
          tags: ['教育平台', '时间待定'],
          location: '线上',
          schedule: '待定',
          format: '微信 + 腾讯会议',
          type: '虚拟社区',
          aboutTitle: '关于此活动',
          description: '[Chinese translation pending]',
        },
        nyMedia: {
          title: '纽约媒体与采访',
          tags: ['媒体倡议', '进行中'],
          location: '纽约市',
          schedule: '持续进行，不定期',
          format: '采访与纪录片',
          type: '媒体制作',
          aboutTitle: '关于此活动',
          description: '[Chinese translation pending]',
        },
        hackathon: {
          title: '黑客松',
          tags: ['科技向善', '2025年9月'],
          location: '波士顿待定',
          schedule: '2025年9月（试行）',
          scheduleFull: '待定（公开）',
          format: '线下',
          type: '竞赛与合作',
          aboutTitle: '关于此活动',
          description: '[Chinese translation pending]',
        },
        eslClass: {
          title: '免费英语课',
          tags: ['工人援助', '进行中'],
          location: '波士顿，唐人街',
          schedule: '每周2次线下',
          scheduleFull: '每周2次线上',
          format: '混合式',
          type: '教育与支持',
          aboutTitle: '关于此活动',
          description: '[Chinese translation pending]',
        },
      },
      labels: {
        location: '地点',
        schedule: '时间',
        format: '形式',
        type: '类型',
      },
    },
  },
  projects: [],
  events: [],
};

export default zhContent;