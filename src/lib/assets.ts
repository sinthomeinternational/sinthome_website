// 项目图片 - 从assets目录导入，会被Astro处理
import acGeneratorImg from "../assets/ac-generator.jpg";
import fluidPropulsionImg from "../assets/fluid-propulsion.jpg";
import electroMagneticMotorImg from "../assets/electro-magnetic-motor.jpg";

// 获取public目录资源的函数
function getPublicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
}

export const assets = {
  // 基础资源 - public目录中的文件
  favicon: getPublicAsset('/favicon.svg'),
  logo: getPublicAsset('/sinthome.png'),
  socialImage: getPublicAsset('/social-image.jpg'),

  // JavaScript files for security compliance
  themeInit: getPublicAsset('/js/theme-init.js'),
  scrollRestore: getPublicAsset('/js/scroll-restore.js'),
  homepageAnimations: getPublicAsset('/js/homepage-animations.js'),
  themeTest: getPublicAsset('/js/theme-test.js'),

  // 项目图片
  projects: {
    acGenerator: acGeneratorImg,
    fluidPropulsion: fluidPropulsionImg,
    electroMagneticMotor: electroMagneticMotorImg,
  }
} as const;

// 类型安全的资源获取函数
export function getAsset(name: keyof typeof assets): any {
  return assets[name];
}

// 获取基础资源的函数
export function getBasicAsset(name: 'favicon' | 'logo' | 'socialImage'): string {
  return assets[name];
}

// 获取项目图片的函数
export function getProjectAsset(name: keyof typeof assets.projects) {
  return assets.projects[name];
}
