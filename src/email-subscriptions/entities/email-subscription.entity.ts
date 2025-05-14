import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('email_subscriptions')
export class EmailSubscription {
  @ApiProperty({
    description: 'The unique identifier of the email subscription',
    example: 1,
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'Email address of the subscriber',
    example: 'user@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Date when the subscription was created',
    example: '2023-06-15T00:00:00Z',
  })
  @CreateDateColumn({ name: 'subscribed_at' })
  subscribedAt: Date;

  @ApiProperty({
    description: 'Whether the subscription has been confirmed',
    example: false,
  })
  @Column({ name: 'is_confirmed', default: false })
  isConfirmed: boolean;

  @ApiProperty({
    description: 'Token used to confirm the subscription',
    example: 'abc123def456',
    nullable: true,
  })
  @Column({ name: 'confirmation_token', nullable: true, length: 64 })
  confirmationToken: string;

  @ApiProperty({
    description: 'Date when the subscription was confirmed',
    example: '2023-06-16T00:00:00Z',
    nullable: true,
  })
  @Column({ name: 'confirmed_at', nullable: true })
  confirmedAt: Date;

  @ApiProperty({
    description: 'Date when the user unsubscribed',
    example: '2023-07-15T00:00:00Z',
    nullable: true,
  })
  @Column({ name: 'unsubscribed_at', nullable: true })
  unsubscribedAt: Date;

  @ApiProperty({
    description: 'Source of the subscription',
    example: 'website_footer',
    nullable: true,
  })
  @Column({ nullable: true, length: 100 })
  source: string;

  @ApiProperty({
    description: 'User preferences for email content',
    example: { newsletters: true, promotions: false },
    nullable: true,
  })
  @Column({ type: 'json', nullable: true })
  preferences: Record<string, any>;
}
