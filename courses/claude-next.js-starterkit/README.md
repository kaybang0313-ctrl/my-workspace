# Next.js 스타터킷

웹 개발을 빠르게 시작할 수 있는 스타터킷입니다.

## 기술 스택

| 기술 | 버전 | 비고 |
|---|---|---|
| Next.js | 15.5 | App Router, Turbopack |
| React | 19 | |
| TypeScript | 5 | `@/*` import alias |
| Tailwind CSS | 4 | `tailwind.config` 없이 `globals.css`의 CSS-first 설정 |
| shadcn/ui | CLI 4.x | `radix-nova` 스타일 |
| lucide-react | 1.x | 아이콘 (v1부터 브랜드 아이콘 없음) |
| next-themes | 0.4 | 라이트 / 다크 / 시스템 테마 |

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인합니다.

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

## 폴더 구조

```
src/
  app/                 # App Router (layout.tsx, page.tsx, globals.css)
  components/
    ui/                # shadcn/ui 컴포넌트 (CLI가 생성)
    layout/            # Container, SiteHeader, SiteFooter
    providers/         # ThemeProvider
    theme-toggle.tsx   # 테마 전환 버튼
  config/site.ts       # 사이트 이름, 설명, 네비게이션 메뉴
  lib/utils.ts         # cn 유틸리티
components.json        # shadcn/ui 설정
```

## 자주 하는 작업

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add dialog input
```

### 사이트 이름 / 메뉴 수정

`src/config/site.ts`만 수정하면 헤더, 푸터, 메타데이터에 반영됩니다.

### 테마 색상 변경

`src/app/globals.css`의 `:root`(라이트)와 `.dark`(다크) 블록에 있는 CSS 변수를 수정합니다.

## 참고

- `npm audit`에서 취약점 경고가 나올 수 있습니다. `npm audit fix --force`는 Next.js 메이저 버전을 올릴 수 있으므로, 15 버전을 유지하려면 사용하지 않습니다.
