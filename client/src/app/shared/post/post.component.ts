import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { Comment, Post, User } from 'src/app/core/models';
import { PostsService } from 'src/app/protected/post/posts.service';
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
  isCommentsOpened: boolean = false;
  isLoadingComments: boolean = true;

  commentForm: FormGroup;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  get canBeFollowed(): boolean {
    return !this.isCurrentUser && !this.isForProfile;
  }

  get author(): User {
    return this.user || this.post.author;
  }

  get comment(): AbstractControl {
    return this.commentForm.get('comment');
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  onToggleFollowing() {
    this.isSubmitting = true;

    const following = this.post.author.following;
    const authorUsername = this.post.author.username;

    const obs$ = following
      ? this.profileService.unfollow(authorUsername)
      : this.profileService.follow(authorUsername);

    obs$.subscribe((profile) => {
      this.toggleFollowing.emit(profile.following);

      this.isSubmitting = false;
    });
  }

  onDeletePost() {
    this.postsService.delete(this.post._id).subscribe();
  }

  onEditPost() {
    this.router.navigateByUrl(`post/edit/${this.post._id}`);
  }

  onOpenComments() {
    this.isCommentsOpened = true;

    this.postsService.getComments(this.post._id).subscribe((comments) => {
      console.log(comments);

      this.isLoadingComments = false;
    });
  }

  onAddComment() {
    const commentData: Comment = {
      content: this.comment.value,
      commenter: this.userService.currentUser,
    };

    this.comment.setValue('');

    this.postsService
      .addComment(this.post._id, commentData)
      .subscribe((comment) => console.log(comment));
  }

  trackByFn(index: number, comment: Comment) {
    return comment._id;
  }
}
