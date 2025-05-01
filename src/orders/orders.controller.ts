import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { Order } from './orders.entity';

@ApiTags('orders') // Group endpoints under 'orders' tag in Swagger UI
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' }) // Describe the endpoint
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
}
