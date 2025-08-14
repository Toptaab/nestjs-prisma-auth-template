import { OmitType } from '@nestjs/mapped-types';
import { UsersModel } from 'src/modules/users/model/users.model';

export class ValidateDto extends OmitType(UsersModel, ['password'] as const) {}
