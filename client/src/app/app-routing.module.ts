import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedComponent } from './protected/protected.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./protected').then((m) => m.ProtectedModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./public').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
