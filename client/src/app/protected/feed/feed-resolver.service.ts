import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models';
import { PostsService } from 'src/app/protected/post/posts.service';

@Injectable()
export class FeedResolver implements Resolve<Post[]> {
  constructor(private postsService: PostsService) {}

  resolve(): Observable<Post[]> {
    return this.postsService.getFeed(0, 10);
  }
}
