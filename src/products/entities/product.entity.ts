import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The business category the product belongs to',
    example: 'Yến sào',
  })
  @Column()
  business: string;

  @ApiProperty({
    description: 'The product URL',
    example: 'https://example.com/product/123',
  })
  @Column()
  product_url: string;

  @ApiProperty({
    description: 'The product URL code',
    example: 'PROD123',
  })
  @Column()
  product_url_code: string;

  @ApiProperty({
    description: 'The product image URL',
    example: 'https://example.com/images/product123.jpg',
  })
  @Column()
  image_url: string;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Yến Sào Cao Cấp',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: '1,500,000 VNĐ',
  })
  @Column()
  price: string;

  @ApiProperty({
    description: 'The product code',
    example: 'YS001',
  })
  @Column()
  code: string;

  @ApiProperty({
    description: 'The category code of the product',
    example: 'yen-thuong-hang',
  })
  @Column()
  category: string;

  @ApiProperty({
    description: 'The name of the product category',
    example: 'Yến Thượng Hạng',
  })
  @Column()
  categoryName: string;

  @ApiProperty({
    description: 'Date when the product was created',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the product was last updated',
    example: '2023-01-02T12:30:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
