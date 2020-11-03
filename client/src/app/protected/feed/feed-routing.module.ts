import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { SharedModule } from 'src/app/shared';
import { FeedComponent } from './feed.component';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    outlet: 'protected',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
