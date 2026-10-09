import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('에러 핸들링', () => {
  it('없는 경로는 404 NOT_FOUND를 반환한다', async () => {
    const res = await request(app).get('/api/v1/nothing');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ success: false, error: { code: 'NOT_FOUND' } });
  });

  it('AppError는 지정한 상태 코드로 응답한다', async () => {
    const res = await request(app).get('/api/v1/examples/1');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('검증 실패 시 400 VALIDATION_ERROR를 반환한다', async () => {
    const res = await request(app).post('/api/v1/examples').send({ title: '' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('올바른 body는 201을 반환한다', async () => {
    const res = await request(app).post('/api/v1/examples').send({ title: '테스트' });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('테스트');
  });

  it('잘못된 JSON은 400 INVALID_JSON을 반환한다', async () => {
    const res = await request(app)
      .post('/api/v1/examples')
      .set('Content-Type', 'application/json')
      .send('{ invalid');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_JSON');
  });
});
