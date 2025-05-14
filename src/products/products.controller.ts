import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggerUtil } from '../common/utils/logger.util';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  private readonly logger = new Logger(ProductsController.name);
  private readonly startTime = Date.now();

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created', type: Product })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    LoggerUtil.log(this.logger, 'Create product', { createProductDto }, this.startTime);
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
  async findAll(): Promise<Product[]> {
    LoggerUtil.log(this.logger, 'Get all products', {}, this.startTime);
    return this.productsService.findAll();
  }

  @Get('business/:business')
  @ApiOperation({ summary: 'Get products by business category' })
  @ApiResponse({ status: 200, description: 'List of products by business', type: [Product] })
  async findByBusiness(@Param('business') business: string): Promise<Product[]> {
    LoggerUtil.log(this.logger, 'Get products by business', { business }, this.startTime);
    return this.productsService.findByBusiness(business);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiResponse({ status: 200, description: 'List of products by category', type: [Product] })
  async findByCategory(@Param('category') category: string): Promise<Product[]> {
    LoggerUtil.log(this.logger, 'Get products by category', { category }, this.startTime);
    return this.productsService.findByCategory(category);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'query', description: 'Search query string' })
  @ApiResponse({ status: 200, description: 'List of products matching search query', type: [Product] })
  async searchProducts(@Query('query') query: string): Promise<Product[]> {
    LoggerUtil.log(this.logger, 'Search products', { query }, this.startTime);
    return this.productsService.searchProducts(query);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get a product by code' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findByCode(@Param('code') code: string): Promise<Product> {
    LoggerUtil.log(this.logger, 'Get product by code', { code }, this.startTime);
    return this.productsService.findByCode(code);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<Product> {
    LoggerUtil.log(this.logger, 'Get product by ID', { id }, this.startTime);
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated', type: Product })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    LoggerUtil.log(this.logger, 'Update product', { id, updateProductDto }, this.startTime);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: string): Promise<void> {
    LoggerUtil.log(this.logger, 'Delete product', { id }, this.startTime);
    return this.productsService.remove(id);
  }
}
