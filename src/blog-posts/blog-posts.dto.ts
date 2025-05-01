import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty({
    example: 'My First Blog Post',
    description: 'The title of the blog post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is the content of my first blog post.',
    description: 'The main content of the blog post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The author of the blog post',
    required: false,
  })
  @IsString()
  @IsOptional()
  author?: string;
}

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}
