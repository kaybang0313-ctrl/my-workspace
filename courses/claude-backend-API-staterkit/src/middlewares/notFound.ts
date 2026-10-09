import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

// 매칭되는 라우트가 없을 때 404 에러를 에러 핸들러로 전달
export function handleNotFound(req: Request, _res: Response, next: NextFunction) {
  next(AppError.notFound(`${req.method} ${req.originalUrl} 경로를 찾을 수 없습니다.`));
}
