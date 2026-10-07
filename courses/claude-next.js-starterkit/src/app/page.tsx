import { Blocks, Palette, Sparkles, Zap } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"

// 스타터킷에 포함된 기술 스택 목록
const features = [
  {
    icon: Zap,
    title: "Next.js 15",
    description: "App Router와 Turbopack 기반의 최신 React 프레임워크",
  },
  {
    icon: Blocks,
    title: "TypeScript",
    description: "타입 안전한 개발 환경과 @/* import alias 설정",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4",
    description: "tailwind.config 없이 globals.css만으로 설정하는 CSS-first 방식",
  },
  {
    icon: Sparkles,
    title: "shadcn/ui + lucide-react",
    description: "복사해서 쓰는 UI 컴포넌트와 일관된 아이콘, 다크모드 지원",
  },
]

export default function HomePage() {
  return (
    <Container className="py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <a href="#features">기능 살펴보기</a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://ui.shadcn.com/docs/components"
              target="_blank"
              rel="noreferrer"
            >
              컴포넌트 문서
            </a>
          </Button>
        </div>
      </section>

      <section
        id="features"
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="mb-2 size-6" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </Container>
  )
}
