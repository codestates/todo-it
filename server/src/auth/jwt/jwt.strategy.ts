import { JwtValidatePayload } from './jwt-validate.payload';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { EnvironmentVariables } from 'src/env';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService<EnvironmentVariables, true>
  ) {
    super({
      jwtFromRequest: (request: Request) => request?.cookies?.['JWT'],
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtValidatePayload {
    return { userId: payload.sub, email: payload.email };
  }
}
