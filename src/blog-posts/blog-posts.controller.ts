import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './blog-posts.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BlogPost } from './blog-posts.entity';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiBody({ type: CreateBlogPostDto })
  @ApiResponse({
    status: 201,
    description: 'The blog post has been successfully created.',
    type: BlogPost,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({
    status: 200,
    description: 'Return all blog posts.',
    type: [BlogPost],
  })
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog post',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Return the blog post.',
    type: BlogPost,
  })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogPostsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog post by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog post to update',
    type: Number,
  })
  @ApiBody({ type: UpdateBlogPostDto })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully updated.',
    type: BlogPost,
  })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogPostsService.update(id, updateBlogPostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Return 204 on successful deletion
  @ApiOperation({ summary: 'Delete a blog post by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the blog post to delete',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'The blog post has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogPostsService.remove(id);
  }
}
