import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersDto {
  googleId?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

}
