import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middlewares/validate.js';
import { AppError } from '../utils/AppError.js';

export const exampleRouter = Router();

const createExampleSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.').max(100),
});

// 요청 검증 예시: body를 zod로 검증한 뒤 생성 결과를 반환
exampleRouter.post('/', validateRequest({ body: createExampleSchema }), (req, res) => {
  res.status(201).json({ success: true, data: { id: Date.now().toString(), ...req.body } });
});

// 에러 핸들링 예시: AppError를 던지면 통일된 형식으로 응답됨
exampleRouter.get('/:id', (req) => {
  throw AppError.notFound(`id=${req.params.id} 항목이 존재하지 않습니다.`);
});
