import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import { Post, User } from 'src/app/core/models';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  get(username: string): Observable<User> {
    return this.apiService.get(`profiles/${username}`);
  }

  getByPosts(username: string): Observable<Post[]> {
    return this.apiService.get(`profiles/${username}/posts`);
  }

  follow(username: string) {
    return this.apiService.post(`profiles/${username}/follow`);
  }

  unfollow(username: string) {
    return this.apiService.delete(`profiles/${username}/unfollow`);
  }
}
