import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

interface RequestSchemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

// zod 스키마로 요청의 body/query/params를 검증 (실패 시 ZodError가 에러 핸들러로 전달됨)
export function validateRequest(schemas: RequestSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (schemas.body) req.body = schemas.body.parse(req.body);
    // Express 5에서 req.query는 getter이므로 검증만 수행
    if (schemas.query) schemas.query.parse(req.query);
    if (schemas.params) schemas.params.parse(req.params);
    next();
  };
}
