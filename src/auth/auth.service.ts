import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { LoggerUtil } from 'src/common/utils/logger.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    // Check if the user exists
    const user = await this.usersService.findByEmail(email);
    // Add better error handling
    if (!user) {
      return null;
    }

    if (!user.password || !password) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // If the password matches, return the user without the password
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    // Store the refresh token in the database or cache
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // Update your refreshToken method to verify the provided token
  // instead of using the current user from the request
  async refreshToken(refreshTokenParam: string) {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshTokenParam, {
        secret: this.configService.get<string>('JWT_SECRET')
      });
      
      // Get user from the database using payload information
      const user = await this.usersService.findOne(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      
      const payloadUser = { email: user.email, sub: user.id, roles: user.roles };
      const accessToken = this.jwtService.sign(payloadUser, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      });
      const refreshToken = this.jwtService.sign(payloadUser, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      });
      
      return { 
        access_token: accessToken,
        refresh_token: refreshToken,
       };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}