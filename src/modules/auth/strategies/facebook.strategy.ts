import { VerifyCallback, Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(config: ConfigService) {
    const jwtSecret = config.get<string>('jwtSecret');
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in configuration');
    }
    super({
      clientID: config.get('facebookId') || '',
      clientSecret: config.get('facebookSecret') || '',
      callbackURL: `${config.get('apiURL')}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'email', 'name'],
    });
  }

  validate(
    accessToken,
    refreshToken,
    profile: {
      id: string;
      emails: { value: string }[];
      name?: { givenName?: string; familyName?: string };
    },
    cb,
  ): any {
    const { id, emails } = profile;
    const { givenName = '', familyName = '' } = profile.name || {};

    const user = {
      facebookId: id,
      name: `${givenName} ${familyName}`,
      firstName: givenName,
      lastName: familyName,
      email: emails[0].value,
      accessToken,
      refreshToken,
    };

    return cb(null, user);
  }
}
