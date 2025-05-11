import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Full name of the customer', example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Phone number of the customer', example: '+84123456789' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Product of interest', example: 'Product A' })
  @IsString()
  product: string;

  @ApiProperty({ description: 'Additional notes', example: 'Deliver to my office', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}