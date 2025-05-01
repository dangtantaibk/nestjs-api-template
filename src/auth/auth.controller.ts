import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ValidatedUser, JwtPayload } from './auth.interfaces';
import { CreateUserDto } from '../users/users.dto';
import { UsersService } from '../users/users.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuth } from './jwt-auth.decorator';

// Define login DTO for Swagger documentation
class LoginDto {
  username: string;
  password: string;
}

// Define a type for the request object with the user property
interface RequestWithUser extends Request {
  user: ValidatedUser | JwtPayload;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiBody({
    type: LoginDto,
    description: 'User credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT access token',
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user as ValidatedUser);
  }

  @JwtAuth()
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user object',
    schema: {
      properties: {
        sub: { type: 'number', example: 1 },
        username: { type: 'string', example: 'admin' },
        role: { type: 'string', example: 'admin' },
      },
    },
  })
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        username: { type: 'string', example: 'newuser' },
        role: { type: 'string', example: 'user' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Exclude password hash from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user;
    return result;
  }

  @Post('refresh-token')
  @JwtAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh authentication token' })
  @ApiResponse({
    status: 200,
    description: 'Returns new JWT access token',
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  refreshToken(@Request() req: RequestWithUser) {
    return this.authService.login(req.user as ValidatedUser);
  }

  @Post('logout')
  @JwtAuth()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout current user' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully logged out',
    schema: {
      properties: {
        message: { type: 'string', example: 'Logged out successfully' },
      },
    },
  })
  logout() {
    // In a stateless JWT authentication, server-side logout is typically a client concern
    // But we can implement token blacklisting if needed
    return { message: 'Logged out successfully' };
  }
}
