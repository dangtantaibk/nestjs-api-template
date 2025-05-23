import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { RolesModule } from '../roles/roles.module';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    RolesModule,
    BlogsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
