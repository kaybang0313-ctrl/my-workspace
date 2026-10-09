import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

const server = createApp().listen(env.PORT, () => {
  logger.info(`서버 실행 중: http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

// 종료 신호 수신 시 진행 중인 요청을 마무리한 뒤 종료
function shutdown(signal: string) {
  logger.info(`${signal} 수신, 서버를 종료합니다.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
