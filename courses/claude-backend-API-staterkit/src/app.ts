import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { apiRouter } from './routes/index.js';
import { handleNotFound } from './middlewares/notFound.js';
import { handleError } from './middlewares/errorHandler.js';

// 테스트에서도 재사용할 수 있도록 앱 생성과 서버 실행을 분리
export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',').map((o) => o.trim()),
    }),
  );
  app.use(express.json());
  if (env.NODE_ENV !== 'test') app.use(pinoHttp({ logger }));

  app.use('/api/v1', apiRouter);

  app.use(handleNotFound);
  app.use(handleError);

  return app;
}
