import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './auth.interfaces'; // Import interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        'YOUR_DEFAULT_SECRET',
      ), // Get secret from config
    });
  }

  // Use JwtPayload type for payload and return type
  validate(payload: JwtPayload): JwtPayload {
    // The payload is already validated by passport-jwt based on the secret
    // We just need to return the payload to attach to request.user
    return {
      sub: payload.sub, // Use sub (user ID)
      username: payload.username,
      role: payload.role,
    };
  }
}
