import { NgModule } from '@angular/core';
import { ProtectedRoutingModule } from './protected-routing.module';

import { NavbarComponent } from './layout';
import { ProtectedComponent } from './protected.component';
import { SharedModule } from '../shared';
import { ProfileService } from './profile/profile.service';

@NgModule({
  declarations: [ProtectedComponent, NavbarComponent],
  imports: [ProtectedRoutingModule, SharedModule],
  providers: [ProfileService],
})
export class ProtectedModule {}
