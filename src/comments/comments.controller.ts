import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Logger, 
  Query, 
  Req,
  HttpCode
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ModerateCommentDto } from './dto/moderate-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggerUtil } from '../common/utils/logger.util';
import { Request } from 'express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  private readonly logger = new Logger(CommentsController.name);
  private readonly startTime = Date.now();

  @Post()
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // Limit to 3 comments per minute
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Comment successfully created', type: Comment })
  @ApiResponse({ status: 429, description: 'Too Many Requests - Rate limit exceeded' })
  async create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request): Promise<Comment> {
    LoggerUtil.log(this.logger, 'Create comment', { createCommentDto }, this.startTime);
    // Extract IP and user agent from the request
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'];
    
    return this.commentsService.create(createCommentDto, ipAddress, userAgent);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'approved', 'rejected', 'spam'] })
  @ApiResponse({ status: 200, description: 'List of all comments', type: [Comment] })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll(@Query('status') status?: string): Promise<Comment[]> {
    LoggerUtil.log(this.logger, 'Get all comments', { status }, this.startTime);
    return this.commentsService.findAll(status);
  }

  @Get('counts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get comment counts by status' })
  @ApiResponse({ status: 200, description: 'Comment counts by status' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getCommentCounts(): Promise<Record<string, number>> {
    LoggerUtil.log(this.logger, 'Get comment counts', {}, this.startTime);
    return this.commentsService.countByStatus();
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get comments for a specific blog post' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'approved', 'rejected', 'spam'], default: 'approved' })
  @ApiResponse({ status: 200, description: 'List of comments for the blog post', type: [Comment] })
  async findByPostId(
    @Param('postId') postId: string, 
    @Query('status') status: string = 'approved'
  ): Promise<Comment[]> {
    LoggerUtil.log(this.logger, 'Get comments by post ID', { postId, status }, this.startTime);
    return this.commentsService.findByPostId(postId, status);
  }

  @Get('replies/:parentId')
  @ApiOperation({ summary: 'Get replies to a specific comment' })
  @ApiResponse({ status: 200, description: 'List of replies to the comment', type: [Comment] })
  async findReplies(@Param('parentId') parentId: string): Promise<Comment[]> {
    const parentIdNum = parseInt(parentId);
    LoggerUtil.log(this.logger, 'Get comment replies', { parentId: parentIdNum }, this.startTime);
    return this.commentsService.findReplies(parentIdNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Comment found', type: Comment })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async findOne(@Param('id') id: string): Promise<Comment> {
    const idNum = parseInt(id);
    LoggerUtil.log(this.logger, 'Get comment by ID', { id: idNum }, this.startTime);
    return this.commentsService.findOne(idNum);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, description: 'Comment successfully updated', type: Comment })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const idNum = parseInt(id);
    LoggerUtil.log(this.logger, 'Update comment', { id: idNum, updateCommentDto }, this.startTime);
    return this.commentsService.update(idNum, updateCommentDto);
  }

  @Patch(':id/moderate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Moderate a comment' })
  @ApiResponse({ status: 200, description: 'Comment successfully moderated', type: Comment })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async moderate(@Param('id') id: string, @Body() moderateCommentDto: ModerateCommentDto): Promise<Comment> {
    const idNum = parseInt(id);
    LoggerUtil.log(this.logger, 'Moderate comment', { id: idNum, moderateCommentDto }, this.startTime);
    return this.commentsService.moderate(idNum, moderateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'Comment successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async remove(@Param('id') id: string): Promise<void> {
    const idNum = parseInt(id);
    LoggerUtil.log(this.logger, 'Delete comment', { id: idNum }, this.startTime);
    return this.commentsService.remove(idNum);
  }
}
