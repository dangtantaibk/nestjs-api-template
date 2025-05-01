import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'; // Fix path to auth service
import { ValidatedUser } from './auth.interfaces'; // Import interface

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Optionally configure options like usernameField here
  }

  // Use ValidatedUser type
  async validate(username: string, pass: string): Promise<ValidatedUser> {
    // Explicitly type the result or handle null case if validateUser can return null
    // Format arguments
    const user: ValidatedUser | null = await this.authService.validateUser(
      username,
      pass,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Return the validated user object
  }
}
