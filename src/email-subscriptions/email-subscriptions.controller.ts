import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Query, HttpCode } from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { UpdateEmailSubscriptionDto } from './dto/update-email-subscription.dto';
import { ConfirmSubscriptionDto } from './dto/confirm-subscription.dto';
import { UnsubscribeDto } from './dto/unsubscribe.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmailSubscription } from './entities/email-subscription.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggerUtil } from '../common/utils/logger.util';

@ApiTags('Email Subscriptions')
@Controller('email-subscriptions')
export class EmailSubscriptionsController {
  constructor(private readonly emailSubscriptionsService: EmailSubscriptionsService) {}
  private readonly logger = new Logger(EmailSubscriptionsController.name);
  private readonly startTime = Date.now();

  @Post()
  @ApiOperation({ summary: 'Subscribe a new email' })
  @ApiResponse({ status: 201, description: 'Email successfully subscribed', type: EmailSubscription })
  @ApiResponse({ status: 409, description: 'Email already subscribed' })
  async create(@Body() createEmailSubscriptionDto: CreateEmailSubscriptionDto): Promise<EmailSubscription> {
    LoggerUtil.log(this.logger, 'Create email subscription', { createEmailSubscriptionDto }, this.startTime);
    return this.emailSubscriptionsService.create(createEmailSubscriptionDto);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Confirm email subscription' })
  @ApiResponse({ status: 200, description: 'Email subscription successfully confirmed', type: EmailSubscription })
  @ApiResponse({ status: 404, description: 'Invalid confirmation token' })
  async confirm(@Body() confirmSubscriptionDto: ConfirmSubscriptionDto): Promise<EmailSubscription> {
    LoggerUtil.log(this.logger, 'Confirm email subscription', { token: confirmSubscriptionDto.token }, this.startTime);
    return this.emailSubscriptionsService.confirm(confirmSubscriptionDto.token);
  }

  @Post('unsubscribe')
  @HttpCode(204)
  @ApiOperation({ summary: 'Unsubscribe an email' })
  @ApiResponse({ status: 204, description: 'Successfully unsubscribed' })
  @ApiResponse({ status: 404, description: 'Email subscription not found' })
  async unsubscribe(@Body() unsubscribeDto: UnsubscribeDto): Promise<void> {
    LoggerUtil.log(this.logger, 'Unsubscribe email', { email: unsubscribeDto.email }, this.startTime);
    return this.emailSubscriptionsService.unsubscribe(unsubscribeDto.email);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all email subscriptions' })
  @ApiResponse({ status: 200, description: 'List of all email subscriptions', type: [EmailSubscription] })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll(): Promise<EmailSubscription[]> {
    LoggerUtil.log(this.logger, 'Get all email subscriptions', {}, this.startTime);
    return this.emailSubscriptionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get email subscription by ID' })
  @ApiResponse({ status: 200, description: 'Email subscription found', type: EmailSubscription })
  @ApiResponse({ status: 404, description: 'Email subscription not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findOne(@Param('id') id: string): Promise<EmailSubscription> {
    LoggerUtil.log(this.logger, 'Get email subscription by ID', { id }, this.startTime);
    return this.emailSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update email subscription' })
  @ApiResponse({ status: 200, description: 'Email subscription successfully updated', type: EmailSubscription })
  @ApiResponse({ status: 404, description: 'Email subscription not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(
    @Param('id') id: string, 
    @Body() updateEmailSubscriptionDto: UpdateEmailSubscriptionDto
  ): Promise<EmailSubscription> {
    LoggerUtil.log(this.logger, 'Update email subscription', { id, updateEmailSubscriptionDto }, this.startTime);
    return this.emailSubscriptionsService.update(+id, updateEmailSubscriptionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete email subscription' })
  @ApiResponse({ status: 204, description: 'Email subscription successfully deleted' })
  @ApiResponse({ status: 404, description: 'Email subscription not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async remove(@Param('id') id: string): Promise<void> {
    LoggerUtil.log(this.logger, 'Delete email subscription', { id }, this.startTime);
    return this.emailSubscriptionsService.remove(+id);
  }
}
