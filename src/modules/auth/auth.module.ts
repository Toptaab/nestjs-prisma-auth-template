import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CommonModule } from 'src/common/common.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersModule } from '../users/users.module';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [UsersModule, CommonModule, PassportModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
