import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, NotFoundException, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LoggerUtil } from '../common/utils/logger.util';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);
  private readonly startTime = Date.now();

  @Get('me')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({
    status: 200,
    description: 'Current user information',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@Request() req): Promise<Partial<User>> {
    LoggerUtil.log(this.logger, 'Get current user', { userId: req.user.userId }, this.startTime);
    
    const userId = req.user.userId;
    if (!userId) {
      throw new NotFoundException('User ID not found in request');
    }
    
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Current user not found');
    }
    
    const { password, ...safeUserData } = user;
    return safeUserData;
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    LoggerUtil.log(this.logger, 'Create user', { createUserDto }, this.startTime);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [User],
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll(): Promise<Partial<User>[]> {
    LoggerUtil.log(this.logger, 'Get all users', {}, this.startTime);
    const users = await this.usersService.findAll();
    const sanitizedUsers = users.map(user => {
      const { password, ...safeUserData } = user;
      return safeUserData;
    });
    return sanitizedUsers;
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findOne(@Param('id') id: string): Promise<Partial<User>> {
    LoggerUtil.log(this.logger, 'Get user by ID', { id }, this.startTime);
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    const { password, ...safeUserData } = user;
    return safeUserData;
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    LoggerUtil.log(this.logger, 'Update user', { id, updateUserDto }, this.startTime);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async remove(@Param('id') id: string): Promise<void> {
    LoggerUtil.log(this.logger, 'Delete user', { id }, this.startTime);
    return this.usersService.remove(id);
  }
}