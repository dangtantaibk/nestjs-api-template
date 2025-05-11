import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'admin',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description of the role',
    example: 'Administrator role with full access',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Array of permissions for the role',
    example: ['create:user', 'read:user', 'update:user', 'delete:user'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  permissions?: string[];
} 