import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmSubscriptionDto {
  @ApiProperty({
    description: 'Confirmation token for email subscription',
    example: 'abc123def456',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
