import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the product',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Sample Product',
    description: 'The name of the product',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'This is a great sample product.',
    description: 'Detailed description of the product',
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 99.99,
    description: 'The price of the product',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: 'https://example.com/product.jpg',
    description: 'URL of the product image',
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
