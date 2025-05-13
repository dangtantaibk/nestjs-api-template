import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.roles) {
      throw new ForbiddenException('Permission denied: Missing user or roles information');
    }

    // const userRoles = await this.rolesService.findAll();
    const userRoleNames = user.roles.map(role => role.name);
    const hasRole = requiredRoles.some(role => userRoleNames.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Permission denied: You do not have sufficient privileges');
    }
    return true;
  }
} 