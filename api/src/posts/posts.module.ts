import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CommentsService } from './comments.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SharedModule],
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
})
export class PostModule {}
