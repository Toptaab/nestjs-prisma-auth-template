import { Injectable } from '@nestjs/common';
import { JwtService as jwt } from '@nestjs/jwt';
import { JwtPayload } from '../types/jwt.type';

@Injectable()
export class JwtService {
  constructor(private readonly jwt: jwt) {}

  async signAsync(payload: JwtPayload): Promise<string> {
    return await this.jwt.signAsync(payload);
  }

  async decode(accessToken: string): Promise<string> {
    return await this.jwt.decode(accessToken);
  }

  async verifyAsync(accessToken: string): Promise<JwtPayload> {
    return await this.jwt.verifyAsync(accessToken);
  }
}
