import { Injectable } from '@nestjs/common';
import { HashService } from 'src/common/utils/hash.service';
import { UsersService } from '../users/users.service';
import { ValidateDto } from './dto/validate.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from 'src/common/utils/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<ValidateDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      user.password &&
      (await this.hashService.compare(pass, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: ValidateDto): Promise<LoginDto> {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async googleLogin(req: {
    user?: {
      email?: string;
      name?: string;
      picture?: string;
      googleId?: string;
    };
  }): Promise<LoginDto> {
    if (!req.user) {
      throw new Error('Google login failed: No user information received');
    }

    const { email, googleId } = req.user;
    let user = await this.usersService.findByEmail(email as string);

    if (!user) {
      user = await this.usersService.create({
        email: email as string,
        googleId: googleId,
      });
    }
    if (user && !user.googleId) {
      user = await this.usersService.update(user.id, {
        ...user,
        googleId: googleId,
      });
    }

    const payload = { email: user.email, id: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
