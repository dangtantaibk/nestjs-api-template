import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service'; // Correct path to service within users folder

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService], // Provide service from this folder
  exports: [UsersService], // Export service from this folder
})
export class UsersModule {}
