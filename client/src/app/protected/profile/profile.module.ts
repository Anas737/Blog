import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared';
import { ProfileResolver } from './profile-resolver.service';

@NgModule({
  declarations: [ProfileComponent],
  imports: [ProfileRoutingModule, SharedModule],
  providers: [ProfileResolver],
})
export class ProfileModule {}
