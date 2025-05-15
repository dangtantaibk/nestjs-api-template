import { Controller, Post, Body, UseGuards, Get, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoggerUtil } from '../common/utils/logger.util';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  private readonly logger = new Logger(AuthController.name);
  private readonly startTime = Date.now();

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    LoggerUtil.log(this.logger, 'Login attempt', { email: loginDto.email }, this.startTime);
    const { email, password } = loginDto;
    
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.login(user);
    LoggerUtil.log(this.logger, 'Login successful', { email: loginDto.email }, this.startTime);
    return token;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    schema: {
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    LoggerUtil.log(this.logger, 'Refresh token attempt', {}, this.startTime);
    try {
      const response = await this.authService.refreshToken(refreshTokenDto.refresh_token);
      LoggerUtil.log(this.logger, 'Token refresh successful', {}, this.startTime);
      return response;
    } catch (error) {
      LoggerUtil.log(this.logger, 'Token refresh failed', { error: error.message }, this.startTime);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}