import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @ApiProperty({
    description: 'The unique identifier of the role',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the role',
    example: 'admin',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'The description of the role',
    example: 'Administrator role with full system access',
    nullable: true,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'List of permissions associated with the role',
    example: ['create:users', 'read:users', 'update:users', 'delete:users'],
    type: [String],
    nullable: true,
  })
  @Column('simple-array', { nullable: true })
  permissions: string[];

  @ApiProperty({
    description: 'Users who have this role',
    type: [User],
  })
  @ManyToMany(() => User, user => user.roles)
  @JoinTable({
    name: 'roles_users',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];
}