// 사이트 전역 설정 (이름, 설명, 네비게이션)
export const siteConfig = {
  name: "Next.js 스타터킷",
  description:
    "Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui로 빠르게 시작하는 웹 개발 스타터킷",
  navItems: [
    { title: "홈", href: "/" },
    { title: "기능", href: "/#features" },
  ],
} as const
