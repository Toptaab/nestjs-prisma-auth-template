import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode, ErrorMessage } from './error-codes.enum';

export class BadExceptionErrorResponseDto {
  @ApiProperty({ example: 'USER_NOT_FOUND', enum: ErrorCode })
  code: ErrorCode;

  @ApiProperty({ example: 'Email already exists', enum: ErrorMessage })
  message: string;

  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: '2025-06-04T08:22:41.849Z' })
  timestamp: string;

  @ApiProperty({ example: '/users' })
  path: string;
}

export class BadGatewayErrorResponseDto {
  @ApiProperty({ example: 'Internal server error' })
  message: string;

  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: '2025-06-04T08:22:41.849Z' })
  timestamp: string;

  @ApiProperty({ example: '/users' })
  path: string;
}
