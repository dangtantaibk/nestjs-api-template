import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    let roles = payload.roles;
    
    // If roles are not in the payload, fetch from database
    if (!roles) {
      try {
        const user = await this.userService.findOne(payload.sub);
        roles = user.roles;
      } catch (error) {
        console.error('Error fetching user roles:', error.message);
        roles = []; // Default to empty array if fetching fails
      }
    }
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
} 