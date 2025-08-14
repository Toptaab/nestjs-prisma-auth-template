import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersModel } from './model/users.model';
import { JwtDto } from '../auth/dto/jwt.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadExceptionErrorResponseDto,
  BadGatewayErrorResponseDto,
} from 'src/common/errors/error-response.dto';

@ApiTags('users')
@Controller('users')
@ApiResponse({ status: 400, type: BadExceptionErrorResponseDto })
@ApiResponse({ status: 500, type: BadGatewayErrorResponseDto })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  @ApiOperation({ summary: 'update user profile' })
  @ApiResponse({
    status: 200,
    description: 'update user user profile successfully.',
    type: ProfileDto,
  })
  async update(
    @Request() req: { user: JwtDto },
    @Body() updateUser: UpdateUsersDto,
  ): Promise<ProfileDto> {
    const user = await this.userService.update(req.user.userId, updateUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, googleId, ...response } = user;
    return response;
  }

  @Post('/register')
  @ApiOperation({ summary: 'register' })
  @ApiResponse({
    status: 200,
    description: 'register successfully.',
    type: UsersModel,
  })
  async create(@Body() registerUser: RegisterDto): Promise<UsersModel> {
    const newUser = await this.userService.create(registerUser);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'get user profile' })
  @ApiResponse({
    status: 200,
    description: 'get user profile successfully.',
    type: ProfileDto,
  })
  async getProfile(@Request() req: { user: JwtDto }): Promise<ProfileDto> {
    const user = await this.userService.findByEmail(req.user.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, googleId, ...response } = user;
    return response;
  }
}
