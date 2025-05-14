import { Controller, Get, Post, Body, Param, Delete, Logger, UseGuards, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { LoggerUtil } from '../common/utils/logger.util';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CreatePublicOrderDto } from './dto/create-public-order.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  private readonly logger = new Logger(OrdersController.name);
  private readonly startTime = Date.now();

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created', type: Order })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    LoggerUtil.log(this.logger, 'Create order', { createOrderDto }, this.startTime);
    return this.ordersService.create(createOrderDto);
  }

  @Public()
  @Post('public')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(201)
  @ApiOperation({ summary: 'Create order from landing page (public)' })
  @ApiResponse({ status: 201, description: 'Order successfully created', type: Order })
  @ApiResponse({ status: 429, description: 'Too Many Requests' })
  async createPublic(@Body() createPublicOrderDto: CreatePublicOrderDto): Promise<Order> {
    LoggerUtil.log(this.logger, 'Create public order', { createPublicOrderDto }, this.startTime);
    return this.ordersService.createPublicOrder(createPublicOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders', type: [Order] })
  async findAll(): Promise<Order[]> {
    LoggerUtil.log(this.logger, 'Get all orders', {}, this.startTime);
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: string): Promise<Order> {
    LoggerUtil.log(this.logger, 'Get order by ID', { id }, this.startTime);
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order successfully deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async remove(@Param('id') id: string): Promise<void> {
    LoggerUtil.log(this.logger, 'Delete order', { id }, this.startTime);
    return this.ordersService.remove(id);
  }
}