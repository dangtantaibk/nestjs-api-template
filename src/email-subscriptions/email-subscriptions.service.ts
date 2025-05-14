import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EmailSubscription } from './entities/email-subscription.entity';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { UpdateEmailSubscriptionDto } from './dto/update-email-subscription.dto';

@Injectable()
export class EmailSubscriptionsService {
  constructor(
    @InjectRepository(EmailSubscription)
    private readonly emailSubscriptionRepository: Repository<EmailSubscription>,
  ) {}

  async create(createEmailSubscriptionDto: CreateEmailSubscriptionDto): Promise<EmailSubscription> {
    // Check if email already exists
    const existingSubscription = await this.emailSubscriptionRepository.findOneBy({ 
      email: createEmailSubscriptionDto.email 
    });

    if (existingSubscription) {
      // If already exists but was unsubscribed, reactivate it
      if (existingSubscription.unsubscribedAt) {
        existingSubscription.unsubscribedAt = null;
        existingSubscription.confirmationToken = this.generateConfirmationToken();
        return this.emailSubscriptionRepository.save(existingSubscription);
      }
      throw new ConflictException('Email is already subscribed');
    }

    // Create new subscription
    const subscription = this.emailSubscriptionRepository.create({
      ...createEmailSubscriptionDto,
      confirmationToken: this.generateConfirmationToken(),
    });

    return this.emailSubscriptionRepository.save(subscription);
  }

  async findAll(): Promise<EmailSubscription[]> {
    return this.emailSubscriptionRepository.find({
      where: { unsubscribedAt: null },
      order: { subscribedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<EmailSubscription> {
    const subscription = await this.emailSubscriptionRepository.findOneBy({ id });
    if (!subscription) {
      throw new NotFoundException(`Email subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async findByEmail(email: string): Promise<EmailSubscription> {
    const subscription = await this.emailSubscriptionRepository.findOneBy({ email });
    if (!subscription) {
      throw new NotFoundException(`Email subscription for ${email} not found`);
    }
    return subscription;
  }

  async update(id: number, updateEmailSubscriptionDto: UpdateEmailSubscriptionDto): Promise<EmailSubscription> {
    const subscription = await this.findOne(id);
    
    // Update only the fields provided in the DTO
    Object.assign(subscription, updateEmailSubscriptionDto);
    
    return this.emailSubscriptionRepository.save(subscription);
  }

  async confirm(token: string): Promise<EmailSubscription> {
    const subscription = await this.emailSubscriptionRepository.findOneBy({ confirmationToken: token });
    if (!subscription) {
      throw new NotFoundException('Invalid or expired confirmation token');
    }

    subscription.isConfirmed = true;
    subscription.confirmedAt = new Date();
    subscription.confirmationToken = null;

    return this.emailSubscriptionRepository.save(subscription);
  }

  async unsubscribe(email: string): Promise<void> {
    const subscription = await this.findByEmail(email);
    
    subscription.unsubscribedAt = new Date();
    
    await this.emailSubscriptionRepository.save(subscription);
  }

  async remove(id: number): Promise<void> {
    const result = await this.emailSubscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Email subscription with ID ${id} not found`);
    }
  }

  private generateConfirmationToken(): string {
    return uuidv4().replace(/-/g, '');
  }
}
