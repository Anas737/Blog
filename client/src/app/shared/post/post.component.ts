import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/core';
import { Post } from 'src/app/core/models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;

  @Output()
  onFollowingToggle = new EventEmitter<boolean>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  followingToggle() {
    const following = this.post.author.following;
    const authorUsername = this.post.author.username;

    const $subscription = following
      ? this.userService.unfollow(authorUsername)
      : this.userService.follow(authorUsername);

    $subscription.subscribe((profile) => {
      this.onFollowingToggle.emit(profile.following);
    });
  }
}
