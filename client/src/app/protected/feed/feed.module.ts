import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [FeedComponent],
  imports: [FeedRoutingModule, SharedModule],
})
export class FeedModule {}
