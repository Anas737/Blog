import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile-resolver.service';
import { PostsService } from '../../shared/post/posts.service';

@NgModule({
  declarations: [ProfileComponent],
  imports: [ProfileRoutingModule, SharedModule],
  providers: [ProfileResolver, PostsService],
})
export class ProfileModule {}
