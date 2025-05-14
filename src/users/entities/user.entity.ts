import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'The user password (hashed)',
    example: '$2b$10$abcdefghijklmnopqrstuv',
    writeOnly: true,
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
    nullable: true,
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    description: 'The roles assigned to the user',
    type: [Role],
  })
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  roles: Role[];

  @ApiProperty({
    description: 'The date when the user was created',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2023-01-01T00:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}