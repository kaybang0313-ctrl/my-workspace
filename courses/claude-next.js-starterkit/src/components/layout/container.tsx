import * as React from "react"

import { cn } from "@/lib/utils"

// 페이지 콘텐츠 최대 너비를 맞춰주는 공통 래퍼
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4", className)}
      {...props}
    />
  )
}
