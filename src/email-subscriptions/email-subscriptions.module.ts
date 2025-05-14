import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { EmailSubscriptionsController } from './email-subscriptions.controller';
import { EmailSubscription } from './entities/email-subscription.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailSubscription]),
    RolesModule,
  ],
  controllers: [EmailSubscriptionsController],
  providers: [EmailSubscriptionsService],
  exports: [EmailSubscriptionsService],
})
export class EmailSubscriptionsModule {}
