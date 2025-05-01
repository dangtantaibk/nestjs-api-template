import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-posts.entity';
import { CreateBlogPostDto, UpdateBlogPostDto } from './blog-posts.dto';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
  ) {}

  create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const newPost = this.blogPostsRepository.create(createBlogPostDto);
    return this.blogPostsRepository.save(newPost);
  }

  findAll(): Promise<BlogPost[]> {
    // Optionally add ordering, e.g., by creation date descending
    return this.blogPostsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<BlogPost> {
    const post = await this.blogPostsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
    return post;
  }

  async update(
    id: number,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    const post = await this.findOne(id); // Reuse findOne to check existence
    this.blogPostsRepository.merge(post, updateBlogPostDto);
    return this.blogPostsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.blogPostsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
  }
}
