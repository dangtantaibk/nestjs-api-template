import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUrl,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Sample Product',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This is a great sample product.',
    description: 'Detailed description of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'https://example.com/product.jpg',
    description: 'URL of the product image',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
