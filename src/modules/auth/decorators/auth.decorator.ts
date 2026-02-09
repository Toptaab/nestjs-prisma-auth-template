import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';

export const IS_AUTH_KEY = 'isAuth';
export const Auth = () =>
  applyDecorators(
    ApiCookieAuth('Auth'),
    SetMetadata(IS_AUTH_KEY, true),
    UseGuards(JwtAuthGuard),
  );
