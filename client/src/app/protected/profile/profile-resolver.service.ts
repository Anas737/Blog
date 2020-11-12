import { Injectable } from '@angular/core';
import { ProfileModule } from './profile.module';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../../core/models/index';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../../shared/post/posts.service';

@Injectable()
export class ProfileResolver implements Resolve<User> {
  constructor(
    private profileService: ProfileService,
    private postsService: PostsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const username = route.params['username'];

    return this.postsService.getByAuthor(username).pipe(
      switchMap(() => {
        return this.profileService.get(username);
      })
    );
  }
}
