import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders') // Specify the table name if different from the class name
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column('text', { nullable: true })
  notes: string;

  @Column({ nullable: true })
  productId: number;

  @CreateDateColumn()
  createdAt: Date;
}
