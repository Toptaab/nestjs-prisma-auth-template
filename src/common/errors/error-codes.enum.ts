import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCESS_DENIED = 'ACCESS_DENIED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  // Add more as needed

  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
}

export enum ErrorMessage {
  USER_NOT_FOUND = 'User not found',
  ACCESS_DENIED = 'Access denied',
  INTERNAL_ERROR = 'Internal server error',
  VALIDATION_ERROR = 'Validation error',
  // Add more as needed

  USER_ALREADY_EXISTS = 'User name already exists',
}

export enum ErrorStatus {
  USER_NOT_FOUND = HttpStatus.NOT_FOUND,
  ACCESS_DENIED = HttpStatus.FORBIDDEN,
  INTERNAL_ERROR = HttpStatus.INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR = HttpStatus.UNPROCESSABLE_ENTITY,
  // Add more as needed

  USER_ALREADY_EXISTS = HttpStatus.CONFLICT,
}
