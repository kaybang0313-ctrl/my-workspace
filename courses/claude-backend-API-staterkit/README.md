# Backend API Starter Kit

Express 5 + TypeScript 기반 백엔드 스타터킷입니다.

## 기술 스택

- Node.js 22+, Express 5, TypeScript (strict)
- zod: 환경 변수 및 요청 검증
- pino / pino-http: 구조화 로깅
- helmet, cors: 보안 및 CORS
- vitest + supertest: 테스트
- ESLint + Prettier: 코드 품질

## 시작하기

```bash
npm install
cp .env.example .env
npm run dev
```

## 스크립트

| 명령어                        | 설명                                 |
| ----------------------------- | ------------------------------------ |
| `npm run dev`                 | 개발 서버 (파일 변경 시 자동 재시작) |
| `npm run build` / `npm start` | 빌드 / 프로덕션 실행                 |
| `npm run lint` / `lint:fix`   | 린트 검사 / 자동 수정                |
| `npm run typecheck`           | 타입 검사                            |
| `npm test`                    | 테스트 실행                          |

## 구조

```
src/
  config/        env 검증, logger
  middlewares/   errorHandler, notFound, validate
  routes/        /api/v1 라우터 (health, example)
  utils/         AppError
  app.ts         앱 생성 (테스트에서 재사용)
  server.ts      서버 실행 + graceful shutdown
tests/
```

## 응답 형식

- 성공: `{ "success": true, "data": ... }`
- 실패: `{ "success": false, "error": { "code": "...", "message": "...", "details": ... } }`

새 에러는 `throw AppError.notFound('...')`처럼 던지면 됩니다. Express 5는 async 핸들러의 예외도 자동으로 에러 핸들러에 전달합니다.

## 새 라우트 추가

1. `src/routes/xxx.route.ts` 작성 (`validateRequest`로 입력 검증)
2. `src/routes/index.ts`에 `apiRouter.use('/xxx', xxxRouter)` 등록
