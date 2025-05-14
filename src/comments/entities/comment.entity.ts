import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from '../../blogs/entities/blog-post.entity';

@Entity('comments')
export class Comment {
  @ApiProperty({
    description: 'The unique identifier of the comment',
    example: 1,
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'The ID of the blog post this comment belongs to',
    example: 1,
  })
  @Column({ name: 'post_id' })
  postId: string;

  @ApiProperty({
    description: 'The ID of the parent comment if this is a reply',
    example: 5,
    nullable: true,
  })
  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @ApiProperty({
    description: 'Name of the comment author',
    example: 'John Doe',
  })
  @Column({ name: 'author_name', length: 100 })
  authorName: string;

  @ApiProperty({
    description: 'Email of the comment author',
    example: 'john.doe@example.com',
  })
  @Column({ name: 'author_email', length: 255 })
  authorEmail: string;

  @ApiProperty({
    description: 'The comment content',
    example: 'This is a great article! Thanks for sharing.',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    description: 'The comment status',
    example: 'approved',
    enum: ['pending', 'approved', 'rejected', 'spam'],
  })
  @Column({ default: 'pending', length: 20 })
  status: string;

  @ApiProperty({
    description: 'IP address of the commenter',
    example: '192.168.1.1',
    nullable: true,
  })
  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string;

  @ApiProperty({
    description: 'User agent information',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    nullable: true,
  })
  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string;

  @ApiProperty({
    description: 'Date when the comment was created',
    example: '2023-06-15T00:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the comment was last updated',
    example: '2023-06-16T00:00:00Z',
    nullable: true,
  })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  // Optional relation to BlogPost entity - can be used if you want to load the actual blog post
  @ManyToOne(() => BlogPost)
  @JoinColumn({ name: 'post_id' })
  blogPost: BlogPost;
}
