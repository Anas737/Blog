import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models';
import { PostsService } from 'src/app/core/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  posts: Post[];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getFeed(0, 10).subscribe((posts) => {
      this.posts = posts;
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
}
