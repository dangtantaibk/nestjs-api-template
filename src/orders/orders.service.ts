import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePublicOrderDto } from './dto/create-public-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async createPublicOrder(createPublicOrderDto: CreatePublicOrderDto): Promise<Order> {
    const newOrder = new Order();
    newOrder.fullName = createPublicOrderDto.name;
    newOrder.phone = createPublicOrderDto.phone;
    newOrder.product = createPublicOrderDto.product;
    newOrder.notes = createPublicOrderDto.notes;
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...newOrder,
      createdAt: new Date(),
    } as Order;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return this.ordersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}