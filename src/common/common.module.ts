import { Module } from '@nestjs/common';
import { HashService } from './utils/hash.service';
import { JwtService } from './utils/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [HashService, JwtService],
  exports: [HashService, JwtService],
})
export class CommonModule {}
