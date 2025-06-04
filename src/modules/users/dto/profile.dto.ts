import { OmitType } from '@nestjs/mapped-types';
import { UsersModel } from '../model/users.model';
import { ApiProperty } from '@nestjs/swagger';

export class profileDto extends OmitType(UsersModel, [
  'password',
  'googleId',
] as const) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdBy: number;
}
