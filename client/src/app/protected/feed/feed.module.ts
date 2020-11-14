import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { FeedResolver } from './feed-resolver.service';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [FeedComponent],
  imports: [FeedRoutingModule, SharedModule],
  providers: [FeedResolver],
})
export class FeedModule {}
