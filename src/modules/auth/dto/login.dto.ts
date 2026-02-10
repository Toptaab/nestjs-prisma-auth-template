import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @ApiProperty({ example: 'admin' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}

export class LoginSuccess {
  accessToken: string
}

export class LoginResponseDto {
  message: string;
  accessToken: string
}
