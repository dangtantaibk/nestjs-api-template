import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Full name of the customer',
    example: 'John Doe',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+1234567890',
  })
  @Column()
  phone: string;

  @ApiProperty({
    description: 'Name of the ordered product',
    example: 'Premium Subscription',
  })
  @Column()
  product: string;

  @ApiProperty({
    description: 'Additional notes for the order',
    example: 'Please deliver before 6 PM',
    nullable: true,
  })
  @Column({ nullable: true })
  notes: string;

  @ApiProperty({
    description: 'Date when the order was created',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the order was last updated',
    example: '2023-01-02T12:30:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}