import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

// 하단 푸터 (lucide v1에는 브랜드 아이콘이 없어 텍스트만 사용)
export function SiteFooter() {
  return (
    <footer className="border-t py-6">
      <Container className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
        Tailwind CSS, shadcn/ui.
      </Container>
    </footer>
  )
}
