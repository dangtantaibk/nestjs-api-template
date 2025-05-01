import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscriptions.entity';
import { CreateSubscriptionDto } from './subscriptions.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { email: createSubscriptionDto.email },
    });
    if (existingSubscription) {
      throw new ConflictException('Email already subscribed');
    }
    const newSubscription = this.subscriptionsRepository.create(
      createSubscriptionDto,
    );
    return this.subscriptionsRepository.save(newSubscription);
  }
}
