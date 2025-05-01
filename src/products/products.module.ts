import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Import the Product entity
  controllers: [ProductsController], // Register the controller
  providers: [ProductsService], // Register the service
})
export class ProductsModule {}
