import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import { Post } from 'src/app/core/models';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class PostsService {
  constructor(private apiService: ApiService) {}

  getFeed(offset?: number, limit?: number): Observable<Post[]> {
    const params = new HttpParams();
    params.append('offset', String(offset));
    params.append('limit', String(limit));

    return this.apiService.get('posts/feed', params);
  }

  getAll(): Observable<Post[]> {
    return this.apiService.get('posts');
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
    return this.apiService.delete(`posts/${postId}`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.apiService.get(`posts/${postId}/comments`);
  }

  addComment(postId: string, commentData): Observable<Comment> {
    return this.apiService.post(`posts/${postId}/comments/create`, commentData);
  }

  updateComment(commentId: string, commentData): Observable<Comment> {
    return this.apiService.put(`comments/${commentId}`, commentData);
  }

  deleteComment(commentId: string) {
    return this.apiService.delete(`comments/${commentId}`);
  }
}
