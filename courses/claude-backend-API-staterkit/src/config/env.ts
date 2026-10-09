import 'dotenv/config';
import { z } from 'zod';

// 환경 변수 스키마 정의 (시작 시 한 번 검증)
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  CORS_ORIGIN: z.string().default('*'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

// 환경 변수를 검증하고, 실패하면 원인을 출력한 뒤 즉시 종료
function parseEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('환경 변수 검증 실패:', z.flattenError(result.error).fieldErrors);
    process.exit(1);
  }
  return result.data;
}

export const env = parseEnv();
