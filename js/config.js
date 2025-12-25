// 公共组件配置文件
// 所有公共组件的配置都在这里，修改这里即可更新所有页面

const AppConfig = {
  // 品牌信息
  brand: {
    name: 'Black Image',
    logo: './pic/logo.ico',
    logoPng: './pic/logo.png'
  },

  // 导航链接配置
  navLinks: [
    {
      text: 'Black Screen',
      href: './black-screen.html',
      key: 'black-screen'
    },
    {
      text: 'Fake Screen',
      href: './fake-windows-10-update-screen.html',
      key: 'fake-screen'
    },
    {
      text: 'AI Image',
      href: 'https://kisskh.art/ai-image-generator',
      external: true,
      key: 'ai-image'
    }
  ],

  // 页脚链接配置
  footerLinks: [
    {
      text: 'Privacy Policy',
      href: './privacy-policy.html',
      i18n: 'footer.privacy'
    },
    {
      text: 'User Agreement',
      href: './user-agreement.html',
      i18n: 'footer.terms'
    }
  ],

  // 页脚合作伙伴链接
  footerPartners: [
    {
      type: 'image',
      href: 'https://dang.ai/',
      src: 'https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png',
      alt: 'Dang.ai',
      width: 150,
      height: 54
    },
    {
      type: 'image',
      href: 'https://startupfa.me/s/black-image?utm_source=blackimage.online',
      src: 'https://startupfa.me/badges/featured-badge.webp',
      alt: 'Black Image - Featured on Startup Fame',
      width: 171,
      height: 54
    },
    {
      type: 'image',
      href: 'https://twelve.tools',
      src: 'https://twelve.tools/badge0-light.svg',
      alt: 'Featured on Twelve Tools',
      width: 200,
      height: 54
    },
    {
      type: 'text',
      href: 'https://aistage.net',
      text: 'AIStage',
      title: 'AIStage'
    },
    {
      type: 'text',
      href: 'https://www.seewhatnewai.com',
      text: 'SeeWhat'
    },
    {
      type: 'image',
      href: 'https://aihuntlist.com/tool/black-image-or-screen',
      src: 'https://aihuntlist.com/badge-light.svg',
      alt: 'Featured on aihuntlist.com',
      width: 'auto',
      height: 54
    }
  ],

  // 支持的语言列表（目前只显示英语、西班牙语和德语）
  languages: [
    { value: 'en', flag: '🇺🇸', name: 'English' },
    { value: 'es', flag: '🇪🇸', name: 'Español' },
    { value: 'de', flag: '🇩🇪', name: 'Deutsch' }
  ],

  // 语言切换是否显示（默认显示）
  showLanguageSwitch: true
};

