import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'; // ✅ Correct form

@Injectable()
export class HashService {
  constructor(private readonly config: ConfigService) {}

  async hash(password: string): Promise<string> {
    const hashed: string = await bcrypt.hash(
      password,
      this.config.get('hashSalt') || 10,
    );
    return hashed;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const result: boolean = await bcrypt.compare(password, hash);
    return result;
  }
}
