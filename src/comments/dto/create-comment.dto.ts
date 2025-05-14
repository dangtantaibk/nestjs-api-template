import { IsEmail, IsString, IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The ID of the blog post this comment belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    description: 'The ID of the parent comment if this is a reply',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @ApiProperty({
    description: 'Name of the comment author',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({
    description: 'Email of the comment author',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  authorEmail: string;

  @ApiProperty({
    description: 'The comment content',
    example: 'This is a great article! Thanks for sharing.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The comment status',
    example: 'pending',
    enum: ['pending', 'approved', 'rejected', 'spam'],
    default: 'pending',
    required: false,
  })
  @IsString()
  @IsIn(['pending', 'approved', 'rejected', 'spam'])
  @IsOptional()
  status?: string = 'pending';
}
