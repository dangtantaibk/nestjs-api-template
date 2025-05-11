import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOneBy({ id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.rolesRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.rolesRepository.delete(id);
  }

  async addPermissions(id: string, permissions: string[]): Promise<Role> {
    const role = await this.findOne(id);
    role.permissions = [...new Set([...(role.permissions || []), ...permissions])];
    return this.rolesRepository.save(role);
  }

  async removePermissions(id: string, permissions: string[]): Promise<Role> {
    const role = await this.findOne(id);
    role.permissions = (role.permissions || []).filter(p => !permissions.includes(p));
    return this.rolesRepository.save(role);
  }
} 