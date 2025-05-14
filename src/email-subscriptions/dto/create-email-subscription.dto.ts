import { IsEmail, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmailSubscriptionDto {
  @ApiProperty({
    description: 'Email address to subscribe',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Source of the subscription',
    example: 'website_footer',
    required: false,
  })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({
    description: 'User preferences for email content',
    example: { newsletters: true, promotions: false },
    required: false,
  })
  @IsObject()
  @IsOptional()
  @Type(() => Object)
  preferences?: Record<string, any>;
}
