import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core';
import { Comment, Post } from 'src/app/core/models';

@Injectable()
export class PostsService {
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    [] as Post[]
  );

  constructor(private apiService: ApiService) {}

  get posts$() {
    return this.postsSubject.asObservable().pipe(distinctUntilChanged());
  }

  getFeed(offset?: number, limit?: number): Observable<Post[]> {
    return this.apiService
      .get(
        'posts/feed',
        new HttpParams({
          fromObject: {
            offset: String(offset),
            limit: String(limit),
          },
        })
      )
      .pipe(tap((posts) => this.postsSubject.next(posts)));
  }

  getByAuthor(author: string) {
    return this.apiService
      .get(
        'posts',
        new HttpParams({
          fromObject: {
            username: author,
          },
        })
      )
      .pipe(
        tap((posts) => {
          this.postsSubject.next(posts);
        })
      );
  }

  getAll(): Observable<Post[]> {
    return this.apiService
      .get('posts')
      .pipe(tap((posts) => this.postsSubject.next(posts)));
  }

  getById(postId: string): Observable<Post> {
    return this.apiService.get(`posts/${postId}`);
  }

  create(postData): Observable<Post> {
    return this.apiService.post('posts/create', postData);
  }

  update(postId: string, postData): Observable<Post> {
    return this.apiService.put(`posts/${postId}`, postData);
  }

  delete(postId: string): Observable<Post> {
    return this.apiService.delete(`posts/${postId}`).pipe(
      tap(() => {
        const posts = this.postsSubject.value.filter(
          (_post) => _post._id !== postId
        );

        this.postsSubject.next(posts);
      })
    );
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.apiService.get(`posts/${postId}/comments`).pipe(
      tap((_comments) => {
        const posts = [...this.postsSubject.value];
        const postIndex = posts.findIndex((_post) => _post._id === postId);
        posts[postIndex].comments.push(..._comments);

        this.postsSubject.next(posts);
      })
    );
  }

  addComment(postId: string, commentData): Observable<Comment> {
    return this.apiService
      .post(`posts/${postId}/comments/create`, commentData)
      .pipe(
        tap((_comment) => {
          const posts = [...this.postsSubject.value];

          const postIndex = posts.findIndex((_post) => _post._id === postId);
          posts[postIndex].comments.push(_comment);

          this.postsSubject.next(posts);
        })
      );
  }

  updateComment(commentId: string, commentData): Observable<Comment> {
    return this.apiService.put(`comments/${commentId}`, commentData).pipe(
      tap((_comment: Comment) => {
        const posts = [...this.postsSubject.value];

        const postIndex = posts.findIndex(
          (_post) => _post._id === _comment.post
        );
        const commentIndex = posts[postIndex].comments.findIndex(
          (comment) => comment._id === _comment._id
        );

        posts[postIndex].comments[commentIndex] = _comment;

        this.postsSubject.next(posts);
      })
    );
  }

  deleteComment(commentId: string) {
    return this.apiService.delete(`comments/${commentId}`).pipe(
      tap((_comment: Comment) => {
        console.log(_comment);

        const posts = [...this.postsSubject.value];

        const postIndex = posts.findIndex(
          (_post) => _post._id === _comment.post
        );

        posts[postIndex].comments = posts[postIndex].comments.filter(
          (comment) => comment._id !== _comment._id
        );

        this.postsSubject.next(posts);
      })
    );
  }
}
