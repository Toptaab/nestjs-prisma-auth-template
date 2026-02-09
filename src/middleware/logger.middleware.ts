import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl, headers, body } = req;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = headers['user-agent'];

    // 👇 เตรียมดัก response body
    const oldSend = res.send;
    let responseBody: any;

    res.send = function (data: any) {
      responseBody = data;
      return oldSend.call(this, data);
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      const parsed = tryParse(responseBody);
      const log = {
        timestamp: new Date().toISOString(),
        method,
        path: originalUrl,
        ip,
        userAgent,
        statusCode: res.statusCode,
        durationMs: `${(duration / 1000).toFixed(2)} Second`,
        requestBody: maskSensitive(body),
        responseBody: {
          ...parsed,
          data: Array.isArray(parsed?.data)
            ? parsed.data.slice(0, 2)
            : parsed.data,
        },
      };

      console.log(JSON.stringify(log, null, 2));
    });

    next();
  }
}

// Mask sensitive fields like password
function maskSensitive(body: any) {
  if (!body || typeof body !== 'object') return body;
  const clone = { ...body };
  if (clone.password) clone.password = '****';
  return clone;
}

// Try parsing response buffer or JSON
function tryParse(body: any) {
  try {
    if (typeof body === 'string') return JSON.parse(body);
    return body;
  } catch {
    return body;
  }
}
