import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ 
    description: 'The business category the product belongs to', 
    example: 'Yến sào' 
  })
  @IsString()
  @IsNotEmpty()
  business: string;

  @ApiProperty({ 
    description: 'The product URL', 
    example: 'https://example.com/product/123' 
  })
  @IsString()
  @IsNotEmpty()
  product_url: string;

  @ApiProperty({ 
    description: 'The product URL code', 
    example: 'PROD123' 
  })
  @IsString()
  @IsNotEmpty()
  product_url_code: string;

  @ApiProperty({ 
    description: 'The product image URL', 
    example: 'https://example.com/images/product123.jpg' 
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({ 
    description: 'The name of the product', 
    example: 'Yến Sào Cao Cấp' 
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'The price of the product', 
    example: '1,500,000 VNĐ' 
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ 
    description: 'The product code', 
    example: 'YS001' 
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ 
    description: 'The category code of the product', 
    example: 'yen-thuong-hang' 
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ 
    description: 'The name of the product category', 
    example: 'Yến Thượng Hạng' 
  })
  @IsString()
  @IsNotEmpty()
  categoryName: string;
}
