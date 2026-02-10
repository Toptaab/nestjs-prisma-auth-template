import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Patch,
} from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { UsersModel } from './model/users.model';
import { RequestUserDto } from '../auth/dto/jwt.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadExceptionErrorResponseDto,
  BadGatewayErrorResponseDto,
} from 'src/common/errors/error-response.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiSuccessResponse } from 'src/common/decorators/swagger-ok-response.decorator';


@ApiTags('users')
@Controller('users')
@ApiResponse({ status: 400, type: BadExceptionErrorResponseDto })
@ApiResponse({ status: 500, type: BadGatewayErrorResponseDto })
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Auth()
  @Patch('/')
  @ApiOperation({ summary: 'update user profile' })
  @ApiSuccessResponse(ProfileDto)
  async update(
    @Request() req: { user: RequestUserDto },
    @Body() updateUser: UpdateUsersDto,
  ): Promise<ProfileDto> {
    const user = await this.userService.update(req.user.id, updateUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, googleId, ...response } = user;
    return response;
  }

  @Post('/register')
  @ApiOperation({ summary: 'register' })
  @ApiSuccessResponse(UsersModel)
  async create(@Body() registerUser: RegisterDto): Promise<UsersModel> {
    const newUser = await this.userService.create(registerUser);
    return newUser;
  }

  @Auth()
  @Get('/profile')
  @ApiOperation({ summary: 'get user profile' })
  @ApiSuccessResponse(ProfileDto)
  async getProfile(@Request() req: { user: RequestUserDto }): Promise<ProfileDto> {
    const user = await this.userService.findByEmail(req.user.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, googleId, ...response } = user;
    return response;
  }
}
