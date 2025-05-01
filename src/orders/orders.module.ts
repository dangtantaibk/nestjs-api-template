import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])], // Import the Order entity
  controllers: [OrdersController], // Register the controller
  providers: [OrdersService], // Register the service
})
export class OrdersModule {}
