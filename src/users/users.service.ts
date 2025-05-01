import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.dto'; // Import DTO

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Return User or null
  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Use CreateUserDto and hash password
  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    // Ensure password is provided before hashing
    if (!createUserDto.password) {
      // Use BadRequestException for client errors and single quotes
      throw new BadRequestException('Password is required to create a user.');
    }
    // Format bcrypt.hash arguments
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const newUser = this.usersRepository.create({
      username: createUserDto.username,
      passwordHash: hashedPassword,
      role: createUserDto.role, // Use role from DTO or let entity default handle it
    });
    // save should return Promise<User>
    return this.usersRepository.save(newUser);
  }

  // Example: Add findById
  async findById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Add other methods as needed, e.g., findById, update, delete
}
