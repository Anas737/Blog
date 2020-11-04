import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core';
import { Post, User } from 'src/app/core/models';
import { ProfileService } from '../../core/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  posts: Post[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const profileUsername = this.activatedRoute.snapshot.params['username'];
    const currentUser = this.userService.user;

    // TODO: Profile not found case

    if (!profileUsername || profileUsername === currentUser.username) {
      this.user = currentUser;
    } else {
      this.profileService.get(profileUsername).subscribe((_user) => {
        this.user = _user;
      });
    }

    this.profileService.getByPosts(profileUsername).subscribe((_posts) => {
      this.posts = _posts;
    });
  }

  trackByFn(index: number, post: Post) {
    return post.id;
  }
}
