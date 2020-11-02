import { NgModule } from '@angular/core';
import { ProtectedRoutingModule } from './protected-routing.module';

import { NavbarComponent } from './layout';
import { ProtectedComponent } from './protected.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [ProtectedComponent, NavbarComponent],
  imports: [ProtectedRoutingModule, SharedModule],
})
export class ProtectedModule {}
