import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post, User } from 'src/app/core/models';
import { ProfileService } from 'src/app/protected/profile/profile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;

  @Input()
  user: User;

  @Input()
  isCurrentUser: boolean;

  @Input()
  isForProfile: boolean;

  @Output()
  toggleFollowing = new EventEmitter<boolean>();

  isSubmitting: boolean = false;

  constructor(private profileService: ProfileService) {}

  get canBeFollowed(): boolean {
    return !this.isCurrentUser && !this.isForProfile;
  }

  get author(): User {
    return this.user || this.post.author;
  }

  ngOnInit(): void {}

  onToggleFollowing() {
    this.isSubmitting = true;

    const following = this.post.author.following;
    const authorUsername = this.post.author.username;

    const subscription$ = following
      ? this.profileService.unfollow(authorUsername)
      : this.profileService.follow(authorUsername);

    subscription$.subscribe((profile) => {
      this.toggleFollowing.emit(profile.following);

      this.isSubmitting = false;
    });
  }
}
