import { PartialType } from '@nestjs/swagger';
import { CreateEmailSubscriptionDto } from './create-email-subscription.dto';

export class UpdateEmailSubscriptionDto extends PartialType(CreateEmailSubscriptionDto) {}
