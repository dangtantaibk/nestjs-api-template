import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty({
    description: 'The business category the blog belongs to',
    example: 'yen-sao',
  })
  @IsString()
  @IsNotEmpty()
  business: string;

  @ApiProperty({
    description: 'The title of the blog post',
    example: 'Top 10 Benefits of Birds Nest',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A brief description of the blog post',
    example: 'Learn about the amazing health benefits of consuming birds nest regularly.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The full content of the blog post',
    example: 'Birds nest has been used in traditional Chinese medicine for centuries...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'URL of the main image for the blog post',
    example: 'https://example.com/images/birds-nest-benefits.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The date when the blog post was published',
    example: '2023-06-15',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'The author of the blog post',
    example: 'Dr. Nguyen Van A',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'The URL-friendly slug for the blog post',
    example: 'top-10-benefits-of-birds-nest',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'The category of the blog post',
    example: 'health-benefits',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'The estimated time to read the blog post',
    example: '5 min',
  })
  @IsString()
  @IsNotEmpty()
  readTime: string;

  @ApiProperty({
    description: 'Tags related to the blog post',
    example: ['health', 'nutrition', 'traditional-medicine'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  tags: string[] = [];
}
