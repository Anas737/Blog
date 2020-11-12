import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedResolver } from './feed-resolver.service';
import { FeedComponent } from './feed.component';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    resolve: {
      feed: FeedResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
