import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        ...(typeof response === 'object' ? response : { message: response }),
      });
    } else {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let body: any = {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      };
      const err = exception as any;
      // Try to pick a meaningful status if present
      if (typeof err?.status === 'number') status = err.status;
      else if (typeof err?.statusCode === 'number') status = err.statusCode;

      // Prefer the error's own message, fallback to a safe default
      body.message =
        typeof err?.message === 'string' ? err.message : body.message;
      // If the error has a code (e.g., Prisma/AWS/Axios), include it
      if (typeof err?.code === 'string') body.code = err.code;

      // If it came from Axios, surface the server response when safe
      if (err?.response?.data && typeof err.response.data === 'object') {
        body = err.response.data;
        status = err.response.status ?? status;
      }
      res.status(status).json({
        ...body,
        statusCode: status,
        path: req.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
