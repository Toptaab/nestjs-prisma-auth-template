import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage, ErrorStatus } from './error-codes.enum';

export class AppException extends HttpException {
  constructor(public readonly code: ErrorCode) {
    const message =
      code in ErrorMessage ? ErrorMessage[code] : 'An error occurred';
    const statusCode =
      code in ErrorStatus
        ? ErrorStatus[code]
        : HttpStatus.INTERNAL_SERVER_ERROR;
    super({ code, message, statusCode }, statusCode);
  }
}
