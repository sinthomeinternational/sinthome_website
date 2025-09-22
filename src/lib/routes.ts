// 统一管理所有路由
export const routes = {
  home: "/",
  blog: "/blog", 
  contact: "/contact",
  projects: "/projects",
  donate: "/donate",
  events: "/events",
  whoWeAre: "/who-we-are",
  
  // What we do 子路由
  whatWeDo: {
    index: "/what-we-do",
    aiHackathon: "/what-we-do/ai-hackathon",
    workersAssist: "/what-we-do/workers-assist",
    plantcoreAi: "/what-we-do/plantcore-ai",
    srtp: "/what-we-do/srtp",
  }
} as const;

// 类型安全的路由获取函数
export function getRoute(path: string): string {
  // 这里可以添加路由验证逻辑
  return path;
}

// 获取嵌套路由的辅助函数
export function getNestedRoute(category: keyof typeof routes.whatWeDo): string {
  return routes.whatWeDo[category];
}
