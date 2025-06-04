import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { loginBodyDto, loginResponseDto } from './dto/login.dto';
import { validateDto } from './dto/validate.dto';
import { Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadExceptionErrorResponseDto,
  BadGatewayErrorResponseDto,
} from 'src/common/errors/error-response.dto';

@ApiTags('auth')
@Controller('auth')
@ApiResponse({ status: 400, type: BadExceptionErrorResponseDto })
@ApiResponse({ status: 500, type: BadGatewayErrorResponseDto })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 200, description: 'login successfully.' })
  @ApiBody({ type: loginBodyDto })
  async login(
    @Request() req: { user: validateDto },
    @Res({ passthrough: true }) response: Response,
  ): Promise<loginResponseDto> {
    const { accessToken } = await this.authService.login(req.user);
    // save to cookie
    response.cookie('access_token', accessToken);
    return {
      message: 'Login successful',
    };
  }

  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'google sign in' })
  @ApiResponse({ status: 200, description: 'sign in successfully.' })
  @Get('/google')
  googleAuth(@Request() req: { user: validateDto }): unknown {
    return;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  @ApiOperation({ summary: 'google sign in call back' })
  @ApiResponse({ status: 200, description: 'sign in successfully.' })
  async googleAuthRedirect(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.googleLogin(req);
    // save to cookie
    response.cookie('access_token', accessToken);
    return {
      message: 'Login successful',
    };
  }
}
