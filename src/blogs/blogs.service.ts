import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const blogPost = this.blogPostRepository.create(createBlogPostDto);
    return this.blogPostRepository.save(blogPost);
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async findOne(id: string): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOneBy({ id });
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blogPost;
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOneBy({ slug });
    if (!blogPost) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }
    return blogPost;
  }

  async update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    const blogPost = await this.findOne(id);
    await this.blogPostRepository.update(id, updateBlogPostDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  }

  async findByBusiness(business: string): Promise<BlogPost[]> {
    return this.blogPostRepository.find({ where: { business } });
  }

  async findByCategory(category: string): Promise<BlogPost[]> {
    return this.blogPostRepository.find({ where: { category } });
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    return this.blogPostRepository
      .createQueryBuilder('blogPost')
      .where('blogPost.title ILIKE :query', { query: `%${query}%` })
      .orWhere('blogPost.description ILIKE :query', { query: `%${query}%` })
      .orWhere('blogPost.content ILIKE :query', { query: `%${query}%` })
      .orWhere('blogPost.author ILIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async findByTag(tag: string): Promise<BlogPost[]> {
    return this.blogPostRepository
      .createQueryBuilder('blogPost')
      .where(':tag = ANY(blogPost.tags)', { tag })
      .getMany();
  }

  async getLatestBlogPosts(limit: number = 5): Promise<BlogPost[]> {
    return this.blogPostRepository
      .createQueryBuilder('blogPost')
      .orderBy('blogPost.date', 'DESC')
      .limit(limit)
      .getMany();
  }
}
