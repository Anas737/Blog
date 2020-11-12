import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/core/models';
import { PostsService } from 'src/app/shared/post/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsSubscription = this.postsService.posts$.subscribe((_posts) => {
      this.posts = _posts;

      console.log(this.posts);
    });
  }

  trackByFn(index: number, post: Post) {
    return post.id;
  }

  onUnfollow(authorUsername) {
    this.posts = this.posts.filter(
      (post) => post.author.username !== authorUsername
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
