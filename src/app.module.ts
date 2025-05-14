import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { BlogsModule } from './blogs/blogs.module';
import { EmailSubscriptionsModule } from './email-subscriptions/email-subscriptions.module';
import { CommentsModule } from './comments/comments.module';
import { ThrottlerModule } from '@nestjs/throttler';

import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { BlogPost } from './blogs/entities/blog-post.entity';
import { EmailSubscription } from './email-subscriptions/entities/email-subscription.entity';
import { Comment } from './comments/entities/comment.entity';
import { LoggingModule } from './common/logging/logging.module';

// Ensure environment variables are loaded
dotenv.config();

const logger = new Logger('Database');
logger.log(`DATABASE_PASSWORD value: ${process.env.DATABASE_PASSWORD}`);
logger.log(`DATABASE_USER value: ${process.env.DATABASE_USER}`);
logger.log(`NODE_ENV value: ${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Role, Order, Product, BlogPost, EmailSubscription, Comment],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // time to live - 1 minute
      limit: 10,  // 10 requests per ttl globally
    }]),
    AuthModule,
    UsersModule,
    RolesModule,
    OrdersModule,
    ProductsModule,
    BlogsModule,
    EmailSubscriptionsModule,
    CommentsModule,
    LoggingModule,
  ],
})
export class AppModule {}