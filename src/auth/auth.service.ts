import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`======= Validate user attempt for email: ${email}`);
    this.logger.log(`Step 1: Password provided: ${password}`);
    // Check if the user exists
    const user = await this.usersService.findByEmail(email);
    // Add better error handling
    if (!user) {
      return null;
    }

    Logger.log(`User: ${JSON.stringify(user)}`, 'AuthService');
    Logger.log(`Step 2: Password: ${password}`, 'AuthService');

    if (!user.password || !password) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    Logger.log('isMatch', isMatch, 'AuthService');

    // If the password matches, return the user without the password
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    this.logger.log(`======= Processing login for user: ${user.email}`);
    
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      const newPayload = { email: user.email, sub: user.id, roles: user.roles };
      const accessToken = this.jwtService.sign(newPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}