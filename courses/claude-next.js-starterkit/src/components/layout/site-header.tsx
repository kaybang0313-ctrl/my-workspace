import Link from "next/link"
import { Menu } from "lucide-react"

import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"

// 상단 고정 헤더 (데스크톱: 가로 메뉴 / 모바일: Sheet 메뉴)
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {siteConfig.navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className="text-sm">
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
