import { Router } from 'express';

export const healthRouter = Router();

// 서버 상태 확인
healthRouter.get('/', (_req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() },
  });
});
