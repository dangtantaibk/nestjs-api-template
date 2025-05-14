import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BlogPost } from './entities/blog-post.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggerUtil } from '../common/utils/logger.util';

@ApiTags('Blogs')
@Controller('blogs')
@ApiBearerAuth()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  private readonly logger = new Logger(BlogsController.name);
  private readonly startTime = Date.now();

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'Blog post successfully created', type: BlogPost })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    LoggerUtil.log(this.logger, 'Create blog post', { createBlogPostDto }, this.startTime);
    return this.blogsService.create(createBlogPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'List of all blog posts', type: [BlogPost] })
  async findAll(): Promise<BlogPost[]> {
    LoggerUtil.log(this.logger, 'Get all blog posts', {}, this.startTime);
    return this.blogsService.findAll();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest blog posts' })
  @ApiQuery({ name: 'limit', description: 'Maximum number of blog posts to return', required: false })
  @ApiResponse({ status: 200, description: 'List of latest blog posts', type: [BlogPost] })
  async getLatestBlogPosts(@Query('limit') limit = 5): Promise<BlogPost[]> {
    LoggerUtil.log(this.logger, 'Get latest blog posts', { limit }, this.startTime);
    return this.blogsService.getLatestBlogPosts(+limit);
  }

  @Get('business/:business')
  @ApiOperation({ summary: 'Get blog posts by business category' })
  @ApiResponse({ status: 200, description: 'List of blog posts by business', type: [BlogPost] })
  async findByBusiness(@Param('business') business: string): Promise<BlogPost[]> {
    LoggerUtil.log(this.logger, 'Get blog posts by business', { business }, this.startTime);
    return this.blogsService.findByBusiness(business);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get blog posts by category' })
  @ApiResponse({ status: 200, description: 'List of blog posts by category', type: [BlogPost] })
  async findByCategory(@Param('category') category: string): Promise<BlogPost[]> {
    LoggerUtil.log(this.logger, 'Get blog posts by category', { category }, this.startTime);
    return this.blogsService.findByCategory(category);
  }

  @Get('tag/:tag')
  @ApiOperation({ summary: 'Get blog posts by tag' })
  @ApiResponse({ status: 200, description: 'List of blog posts by tag', type: [BlogPost] })
  async findByTag(@Param('tag') tag: string): Promise<BlogPost[]> {
    LoggerUtil.log(this.logger, 'Get blog posts by tag', { tag }, this.startTime);
    return this.blogsService.findByTag(tag);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search blog posts' })
  @ApiQuery({ name: 'query', description: 'Search query string' })
  @ApiResponse({ status: 200, description: 'List of blog posts matching search query', type: [BlogPost] })
  async searchBlogPosts(@Query('query') query: string): Promise<BlogPost[]> {
    LoggerUtil.log(this.logger, 'Search blog posts', { query }, this.startTime);
    return this.blogsService.searchBlogPosts(query);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a blog post by slug' })
  @ApiResponse({ status: 200, description: 'Blog post found', type: BlogPost })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    LoggerUtil.log(this.logger, 'Get blog post by slug', { slug }, this.startTime);
    return this.blogsService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiResponse({ status: 200, description: 'Blog post found', type: BlogPost })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    LoggerUtil.log(this.logger, 'Get blog post by ID', { id }, this.startTime);
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiResponse({ status: 200, description: 'Blog post successfully updated', type: BlogPost })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async update(@Param('id') id: string, @Body() updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    LoggerUtil.log(this.logger, 'Update blog post', { id, updateBlogPostDto }, this.startTime);
    return this.blogsService.update(id, updateBlogPostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiResponse({ status: 200, description: 'Blog post successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async remove(@Param('id') id: string): Promise<void> {
    LoggerUtil.log(this.logger, 'Delete blog post', { id }, this.startTime);
    return this.blogsService.remove(id);
  }
}
