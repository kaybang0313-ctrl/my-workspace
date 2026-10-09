import type { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/AppError.js';

interface ParseError extends Error {
  type?: string;
}

// 모든 에러를 { success: false, error: { code, message, details? } } 형식으로 변환
export function handleError(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details },
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '요청 데이터가 올바르지 않습니다.',
        details: z.flattenError(err),
      },
    });
    return;
  }

  // express.json() 본문 파싱 실패
  if ((err as ParseError)?.type === 'entity.parse.failed') {
    res.status(400).json({
      success: false,
      error: { code: 'INVALID_JSON', message: 'JSON 형식이 올바르지 않습니다.' },
    });
    return;
  }

  // 예상하지 못한 오류: 로그를 남기고 운영 환경에서는 상세 내용을 숨김
  logger.error({ err }, '처리되지 않은 오류');
  const message =
    env.NODE_ENV === 'production'
      ? '서버 내부 오류가 발생했습니다.'
      : ((err as Error)?.message ?? '서버 내부 오류가 발생했습니다.');
  res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message } });
}
