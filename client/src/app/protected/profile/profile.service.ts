import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core';
import { Post, User } from 'src/app/core/models';
import { ProfileModule } from './profile.module';

@Injectable()
export class ProfileService {
  constructor(private apiService: ApiService) {}

  get(username: string): Observable<User> {
    return this.apiService.get(`profiles/${username}`);
  }

  follow(username: string) {
    return this.apiService.post(`profiles/${username}/follow`);
  }

  unfollow(username: string) {
    return this.apiService.delete(`profiles/${username}/unfollow`);
  }
}
