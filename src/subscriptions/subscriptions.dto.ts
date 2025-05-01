import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

export class CreateSubscriptionDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address for the subscription',
  }) // Add Swagger property info
  email: string;
}
