import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';

@NgModule({
  declarations: [HomeComponent, SignupComponent, LoginComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
