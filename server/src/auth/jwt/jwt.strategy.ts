import { JwtValidatePayload } from './jwt-validate.payload';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { EnvironmentVariables } from 'src/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService<EnvironmentVariables, true>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtValidatePayload {
    return { userId: payload.sub, email: payload.email };
  }
}
