import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/core/models';
import { ProfileService } from 'src/app/core/profile';

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

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {}

  followingToggle() {
    const following = this.post.author.following;
    const authorUsername = this.post.author.username;

    const subscription$ = following
      ? this.profileService.unfollow(authorUsername)
      : this.profileService.follow(authorUsername);

    subscription$.subscribe((profile) => {
      this.onFollowingToggle.emit(profile.following);
    });
  }
}
