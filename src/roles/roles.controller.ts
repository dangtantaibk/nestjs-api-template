import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { LoggerUtil } from '../common/utils/logger.util';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  private readonly logger = new Logger(RolesController.name);
  private readonly startTime = Date.now();

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role successfully created',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createRoleDto: CreateRoleDto) {
    LoggerUtil.log(this.logger, 'Create role', { createRoleDto }, this.startTime);
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'List of all roles',
    type: [Role],
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    LoggerUtil.log(this.logger, 'Get all roles', {}, this.startTime);
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiResponse({
    status: 200,
    description: 'Role found',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    LoggerUtil.log(this.logger, 'Get role by ID', { id }, this.startTime);
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully updated',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    LoggerUtil.log(this.logger, 'Update role', { id, updateRoleDto }, this.startTime);
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    LoggerUtil.log(this.logger, 'Delete role', { id }, this.startTime);
    return this.rolesService.remove(id);
  }

  @Post(':id/permissions')
  @Roles('admin')
  @ApiOperation({ summary: 'Add permissions to a role' })
  @ApiResponse({
    status: 200,
    description: 'Permissions successfully added',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  addPermissions(
    @Param('id') id: string,
    @Body('permissions') permissions: string[],
  ) {
    LoggerUtil.log(this.logger, 'Add permissions', { id, permissions }, this.startTime);
    return this.rolesService.addPermissions(id, permissions);
  }

  @Delete(':id/permissions')
  @Roles('admin')
  @ApiOperation({ summary: 'Remove permissions from a role' })
  @ApiResponse({
    status: 200,
    description: 'Permissions successfully removed',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  removePermissions(
    @Param('id') id: string,
    @Body('permissions') permissions: string[],
  ) {
    LoggerUtil.log(this.logger, 'Remove permissions', { id, permissions }, this.startTime);
    return this.rolesService.removePermissions(id, permissions);
  }
}