import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { OrdersModule } from './orders/orders.module';

import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { Order } from './orders/entities/order.entity';

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
      entities: [User, Role, Order],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    OrdersModule,
  ],
})
export class AppModule {}