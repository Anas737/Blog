import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';
import { Comment } from 'src/app/core/models';
import { PostsService } from 'src/app/protected/post/posts.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input()
  comment: Comment;

  isMenuDisplayed: boolean = false;
  isCurrentUser: boolean = false; // Commenter is the current user

  constructor(
    private postsService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isCurrentUser =
      this.userService.currentUser.username === this.comment.commenter.username;
  }

  onToggleMenu(event) {
    event.stopPropagation();

    this.isMenuDisplayed = !this.isMenuDisplayed;
  }

  @HostListener('document:click')
  onHideMenu() {
    this.isMenuDisplayed = false;
  }

  onDelete() {
    this.postsService.deleteComment(this.comment._id).subscribe(() => {
      console.log('deleted');
    });
  }

  onEdit() {}
}
