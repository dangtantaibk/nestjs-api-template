import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './subscriptions.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { Subscription } from './subscriptions.entity';

@ApiTags('subscriptions') // Group endpoints under 'subscriptions' tag
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' }) // Describe the endpoint
  @ApiBody({ type: CreateSubscriptionDto }) // Specify the request body type for Swagger
  @ApiResponse({
    status: 201,
    description: 'The subscription has been successfully created.',
    type: Subscription,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., invalid email format).',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict (Email already subscribed).',
  })
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    try {
      return await this.subscriptionsService.create(createSubscriptionDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error; // Re-throw other errors
    }
  }
}
