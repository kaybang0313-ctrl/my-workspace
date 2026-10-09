import pino from 'pino';
import { env } from './env.js';

// 개발 환경에서는 읽기 쉬운 포맷, 그 외에는 JSON 로그 출력
export const logger = pino({
  level: env.LOG_LEVEL,
  ...(env.NODE_ENV === 'development' && {
    transport: { target: 'pino-pretty', options: { colorize: true } },
  }),
});
