import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage, ErrorStatus } from './error-codes.enum';

export class AppException extends HttpException {
  constructor(
    public readonly code: ErrorCode,
    public readonly option?: { message?: string },
  ) {
    const message = option?.message
      ? option?.message
      : code in ErrorMessage
        ? ErrorMessage[code]
        : code;
    const statusCode =
      code in ErrorStatus
        ? ErrorStatus[code]
        : HttpStatus.INTERNAL_SERVER_ERROR;
    super({ code, message, statusCode }, statusCode);
  }
}
