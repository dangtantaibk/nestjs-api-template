import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './blog-posts.entity';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])], // Import the BlogPost entity
  controllers: [BlogPostsController], // Register the controller
  providers: [BlogPostsService], // Register the service
})
export class BlogPostsModule {}
