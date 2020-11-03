import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from 'src/app/core/guards';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
