import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicOrderDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Phone number of the customer', example: '+84123456789' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Product or service being ordered' })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsString()
  notes?: string;
}
