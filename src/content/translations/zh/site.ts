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
      themeLight: '浅色',
      themeDark: '深色',
      languageChinese: '中文',
      languageEnglish: 'EN',
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
      title: 'Sinthome（圣状）历史与发展',
      subtitle: '集知识学习、理论批判、与社会实践为一体，圣状是一个探索新的生产关系的实验性公共平台。',
      description: '了解我们的使命、愿景和团队',
      sections: [
        {
          id: 'history',
          title: '历史与发展',
          content: [
            '圣状（Sinthome）于 2023 年 2 月 2 日在波士顿建立，最初是一个由本地学生发起的小型读书会。以欧陆哲学、左翼理论以及精神分析为思想根基，成员们在共同学习和深入批判的过程中，逐渐形成了一套理解社会现象和社会关系的共同视角。理论的学习和批判为成员们提供了分析社会结构、生产关系与意识形态的工具，也促使我们在思考如何将批判精神转化为具体社会实践。',
            '随着活动的深入，读书会最终演变为 S.R.T.P.（Sinthome Revolutionary Theoretical Practice）—一个集读书会、讲座、电影放映等多种交流形式的知识社区。S.R.T.P. 的核心使命，正是打通理论与实践的循环：鼓励成员将自身的知识与批判转化为社会实践，同时将具体的实践经验反哺理论建设。',
          ],
        },
        {
          id: 'platform',
          title: '孵化器平台',
          content: [
            '在 S.R.T.P. 的基础上，圣状的视野与架构不断扩展，逐渐发展成为一个孵化器式的公益平台。它旨在鼓励成员将批判性理论应用于更广泛的社会领域，探索新型生产方式与社会关系的可能。各个孵化项目都是这一探索精神的具体体现：',
          ],
        },
        {
          id: 'projects',
          title: '项目介绍',
          items: [
            {
              name: 'Workers Assist (WA)',
              description: '在波士顿唐人街成立的一家非盈利机构。主要关注社区建设与劳动者生产生活环境，是对人口再生产、社会关系再生产的实践尝试；我们通过社会互助、教育和社区活动重新组织美国基层社会治理结构。',
            },
            {
              name: 'Idée Fixe',
              description: '位于波士顿的一家香水品牌公司。在国内制造业转型的大背景下，与香水工厂合作，帮助它们从贴牌代工转向发展自主中国品牌、提升国际竞争力；同时，Idée Fixe 在波士顿的店面为圣状成员提供工作岗位，促进社区成员的良性就业，实现生产实践于社会实践的有机结合。',
            },
            {
              name: 'PlantCore AI',
              description: '一家致力于在中国推广工业决策AI助理的科创公司，其研发团队来自美国。聚焦人工智能工业应用，探索新质生产力与生产关系的结合，尝试通过新型生产组织模式和技术中介去优化工业生产流程。',
            },
            {
              name: 'AI Hackathon',
              description: '由圣状主办的年度黑客松活动，主题为人工智能如何更好地促进社会公益。基于我们运营唐人街非盈利机构（Workers Assist）的亲身经验，此活动邀请人工智能从业者和大学生一同解决公益活动中遇到的技术难题，创造一个互相学习的空间，共同开发实用的解决方案。',
            },
          ],
        },
        {
          id: 'philosophy',
          title: '理念与愿景',
          content: [
            '这些项目虽然探索不同的实践领域，却都源自 S.R.T.P. 的批判精神和知识实践方法。它们并非彼此独立，而是一同构成了圣状知识—批判—实践的有机整体。通过结合理论批判和社会实践，圣状致力于重建知识分子与工人阶级之间实践的链接，并在劳动、生产、人口再生产、社会关系和知识生产等多维度，搭建实验性的实践网络。',
            '每一个项目都是理论到实践的具体实验，其成果也反向滋养着理论。正是这种互动，使整个组织形成一个不断自我生成和自我更新的循环生态。',
            '从最初的读书会起步，圣状的发展体现了从知识出发，通过理论学习和批判孕育出多条实践路径的过程。S.R.T.P. 为成员提供理论训练和批判框架，圣状的孵化器功能则支持大家在社会层面中进行多维实验。如今，圣状不仅是一个知识学习与理论批判的中心，也已成为探索新生产关系、重构社会实践的实验性公共平台。',
          ],
        },
      ],
      callToAction: {
        title: '加入我们的使命',
        description: '成为改变的一部分。有多种方式可以参与和支持我们的事业。',
        buttons: {
          donate: '捐赠',
          getInvolved: '参与',
        },
      },
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