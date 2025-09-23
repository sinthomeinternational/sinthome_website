export function formatDate(date: Date){
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
}

// 自动处理内部链接的base路径
export function getInternalHref(href: string): string {
    if (href.startsWith('/') && !href.startsWith('http')) {
        return `${import.meta.env.BASE_URL}${href.slice(1)}`;
    }
    return href;
}