import { ApiProperty } from '@nestjs/swagger';

export class loginBodyDto {
  @ApiProperty({ example: 'admin' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}

export class loginDto {
  accessToken: string;
}

export class loginResponseDto {
  message: string;
}
