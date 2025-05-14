import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blog_posts')
export class BlogPost {
  @ApiProperty({
    description: 'The unique identifier of the blog post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The business category the blog belongs to',
    example: 'yen-sao',
  })
  @Column()
  business: string;

  @ApiProperty({
    description: 'The title of the blog post',
    example: 'Top 10 Benefits of Birds Nest',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'A brief description of the blog post',
    example: 'Learn about the amazing health benefits of consuming birds nest regularly.',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The full content of the blog post',
    example: 'Birds nest has been used in traditional Chinese medicine for centuries...',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    description: 'URL of the main image for the blog post',
    example: 'https://example.com/images/birds-nest-benefits.jpg',
  })
  @Column()
  image: string;

  @ApiProperty({
    description: 'The date when the blog post was published',
    example: '2023-06-15',
  })
  @Column()
  date: string;

  @ApiProperty({
    description: 'The author of the blog post',
    example: 'Dr. Nguyen Van A',
  })
  @Column()
  author: string;

  @ApiProperty({
    description: 'The URL-friendly slug for the blog post',
    example: 'top-10-benefits-of-birds-nest',
  })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({
    description: 'The category of the blog post',
    example: 'health-benefits',
  })
  @Column()
  category: string;

  @ApiProperty({
    description: 'The estimated time to read the blog post',
    example: '5 min',
  })
  @Column()
  readTime: string;

  @ApiProperty({
    description: 'Tags related to the blog post',
    example: ['health', 'nutrition', 'traditional-medicine'],
    type: [String],
  })
  @Column('simple-array')
  tags: string[];

  @ApiProperty({
    description: 'Date when the blog post was created',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the blog post was last updated',
    example: '2023-01-02T12:30:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
