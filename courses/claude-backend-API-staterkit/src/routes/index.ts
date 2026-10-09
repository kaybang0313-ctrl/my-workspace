import { Router } from 'express';
import { healthRouter } from './health.route.js';
import { exampleRouter } from './example.route.js';

// /api/v1 하위 라우터 집합
export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/examples', exampleRouter);
