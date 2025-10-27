import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsOptional()
  googleId?: string;
  
  @IsOptional()
  facebookId?: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password?: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  email: string;
}
