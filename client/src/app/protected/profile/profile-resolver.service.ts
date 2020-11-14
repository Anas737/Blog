import { Injectable } from '@angular/core';
import { ProfileModule } from './profile.module';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../../core/models/index';
import { Observable, of } from 'rxjs';
import { ProfileService } from './profile.service';
import { concatMap, switchMap } from 'rxjs/operators';
import { PostsService } from '../post/posts.service';

@Injectable()
export class ProfileResolver implements Resolve<User> {
  constructor(
    private profileService: ProfileService,
    private postsService: PostsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const username = route.params['username'];

    return this.postsService.getByAuthor(username).pipe(
      concatMap(() => {
        return this.profileService.get(username);
      })
    );
  }
}
