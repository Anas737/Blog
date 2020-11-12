import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core';
import { Post, User } from 'src/app/core/models';
import { PostsService } from '../../shared/post/posts.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  posts: Post[];

  postsSubscription: Subscription;

  isCurrentUser: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;

      this.isCurrentUser =
        this.user.username === this.userService.currentUser.username;
    });

    this.postsSubscription = this.postsService.posts$.subscribe((_posts) => {
      this.posts = _posts;
    });
  }

  onToggleFollowing(following) {
    this.isSubmitting = true;

    if (following === undefined) {
      const following = this.user.following;
      const username = this.user.username;

      const subscription$ = following
        ? this.profileService.unfollow(username)
        : this.profileService.follow(username);

      subscription$.subscribe((profile) => {
        this.user.following = profile.following;

        this.isSubmitting = false;
      });
    } else {
      this.user.following = following;
    }
  }

  trackByFn(index: number, post: Post) {
    return post.id;
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
