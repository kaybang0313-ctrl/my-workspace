// 의도된 오류를 표현하는 커스텀 에러 (HTTP 상태 코드와 에러 코드 포함)
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static badRequest(message = '잘못된 요청입니다.', details?: unknown) {
    return new AppError(400, 'BAD_REQUEST', message, details);
  }

  static unauthorized(message = '인증이 필요합니다.') {
    return new AppError(401, 'UNAUTHORIZED', message);
  }

  static forbidden(message = '권한이 없습니다.') {
    return new AppError(403, 'FORBIDDEN', message);
  }

  static notFound(message = '리소스를 찾을 수 없습니다.') {
    return new AppError(404, 'NOT_FOUND', message);
  }
}
