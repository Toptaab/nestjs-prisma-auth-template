import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from './error-codes.enum';

export class AppException extends HttpException {
  constructor(
    public readonly code: ErrorCode,
    message: ErrorMessage,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ code, message }, status);
  }
}
