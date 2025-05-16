import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Extract roleIds from DTO
    const { roleIds, ...userProperties } = createUserDto;

    // Create user instance with basic properties
    const user = this.usersRepository.create({
      ...userProperties,
      password: hashedPassword,
    });

    // Assign roles if provided
    if (roleIds && Array.isArray(roleIds)) {
      user.roles = await this.getRoleEntities(roleIds);
    }

    // Save user with relationships
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['roles']
    });
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roles']
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roles']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles']
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Handle password update if needed
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // Handle basic properties (excluding roles)
    const { roleIds, ...userProperties } = updateUserDto;

    // Update basic properties
    Object.assign(user, userProperties);

    // Handle roles if provided
    if (roleIds && Array.isArray(roleIds)) {
      // Set the roles relationship
      user.roles = await this.getRoleEntities(roleIds);
    }

    // Save the updated user with relationships
    return this.usersRepository.save(user);
  }

  // Helper method to get role entities by IDs
  private async getRoleEntities(roleIds: string[]): Promise<any[]> {
    if (!roleIds.length) return [];

    // Assuming you have a RolesRepository or can query roles
    // You might need to adjust this based on your actual role entity repository
    return this.usersRepository.manager.findBy('Role', {
      id: In(roleIds),
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  /**
   * Get all permissions associated with a user
   * @param userId The ID of the user
   * @returns Array of permission strings
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    // Get the user with roles relationship
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      return [];
    }

    // Extract unique permissions from all roles
    const permissions = new Set<string>();

    // Loop through user roles and collect all permissions
    for (const role of user.roles) {
      for (const permission of role.permissions) {
        permissions.add(permission);
      }
    }

    return Array.from(permissions);
  }

}