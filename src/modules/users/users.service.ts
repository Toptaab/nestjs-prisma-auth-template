import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersModel } from './model/users.model.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { HashService } from 'src/common/utils/hash.service';
import { UpdateUsersDto } from './dto/update-user.dto';
import { AppException } from 'src/common/errors/app.exception';
import { ErrorCode, ErrorMessage } from 'src/common/errors/error-codes.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) { }
  async create(registerDto: RegisterDto): Promise<UsersModel> {
    const isExistedUser = await this.prisma.user.findFirst({
      where: { email: registerDto.email },
    });
    if (isExistedUser) {
      throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
    }
    return this.prisma.user.create({
      data: {
        ...registerDto,
        createdBy: 1,
        password: registerDto.password
          ? await this.hashService.hash(registerDto.password)
          : null,
      },
    });
  }

  async findByEmail(email: string): Promise<UsersModel> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new AppException(ErrorCode.USER_NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUsersDto): Promise<UsersModel> {
    const isExistedUser = await this.prisma.user.findFirst({
      where: { id: id },
    });
    if (!isExistedUser) {
      throw new AppException(ErrorCode.USER_NOT_FOUND);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
