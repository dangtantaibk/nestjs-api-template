import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'admin',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password for user authentication',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string; // Use plain password here, hashing happens in service

  @ApiProperty({
    description: 'User role for access control',
    example: 'admin',
    required: false,
    default: 'admin',
  })
  @IsString()
  role?: string; // Optional role, defaults in entity
}
