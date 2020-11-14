import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Post } from 'src/app/core/models';
import { PostsService } from './posts.service';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private postsService: PostsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    let post$ = of({ title: '', content: '' } as Post);

    const postId = route.params['postId'];

    if (postId) {
      post$ = this.postsService
        .getById(postId)
        .pipe(
          mergeMap((_post) =>
            of({ _id: _post._id, title: _post.title, content: _post.content })
          )
        );
    }

    return post$;
  }
}
