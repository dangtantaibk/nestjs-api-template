import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { User } from '../users/user.entity'; // Removed unused import
import { ValidatedUser, JwtPayload } from './auth.interfaces'; // Import interfaces

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Return ValidatedUser or null
  async validateUser(
    username: string,
    pass: string,
  ): Promise<ValidatedUser | null> {
    const user = await this.usersService.findOne(username);
    // Use parentheses for await inside condition if required by linter
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result; // Return user object without the password hash
    }
    return null;
  }

  // Use ValidatedUser type for user parameter
  // Remove async as await is not used
  login(user: ValidatedUser) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
