import { VerifyCallback, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    const jwtSecret = config.get<string>('jwtSecret');
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in configuration');
    }
    super({
      clientID: config.get('googleId') || '',
      clientSecret: config.get('googleSecret') || '',
      callbackURL: `${config.get('apiURL')}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string;
      emails: { value: string }[];
      photos: { value: string }[];
      name?: { givenName?: string; familyName?: string };
    },
    done: VerifyCallback,
  ): any {
    const { id, emails, photos } = profile;
    const { givenName = '', familyName = '' } = profile.name || {};

    const user = {
      googleId: id,
      email: emails[0].value,
      name: `${givenName} ${familyName}`,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
