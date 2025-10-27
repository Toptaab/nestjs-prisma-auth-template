import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UsersModel implements User {
  @ApiProperty({
    type: Number,
    description: 'UNIQUE ID of user',
    required: false,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'UNIQUE ID of google',
    required: false,
  })
  googleId: string | null;

  @ApiProperty({
    type: String,
    description: 'UNIQUE ID of facebook',
    required: false,
  })
  facebookId: string | null;

  @ApiProperty({ type: String, description: 'email', required: true })
  email: string;

  @ApiProperty({ type: String, description: 'password', required: true })
  password: string | null;

  @ApiProperty({ type: Boolean, description: 'user status', required: true })
  isActive: boolean;

  @ApiProperty({ type: Date, description: 'Created date', required: false })
  createdAt: Date;

  @ApiProperty({
    type: Number,
    description: 'Created by user ID',
    required: false,
  })
  createdBy: number;
}
