import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('blog_posts')
export class BlogPost {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the blog post',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'My First Blog Post',
    description: 'The title of the blog post',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'This is the content of my first blog post.',
    description: 'The main content of the blog post',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The author of the blog post',
    required: false,
  })
  @Column({ nullable: true })
  author?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
