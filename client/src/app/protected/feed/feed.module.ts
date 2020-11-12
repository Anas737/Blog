import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { PostsService } from '../../shared/post/posts.service';
import { FeedResolver } from './feed-resolver.service';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [FeedComponent],
  imports: [FeedRoutingModule, SharedModule],
  providers: [FeedResolver, PostsService],
})
export class FeedModule {}
