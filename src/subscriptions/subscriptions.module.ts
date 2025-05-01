import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscriptions.entity';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])], // Import the Subscription entity
  controllers: [SubscriptionsController], // Register the controller
  providers: [SubscriptionsService], // Register the service
})
export class SubscriptionsModule {}
