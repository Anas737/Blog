import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/core';
import { Post } from 'src/app/core/models';
import { PostsService } from 'src/app/protected/post/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  Editor = ClassicEditor;

  postForm: FormGroup;

  isForEditting: boolean = false;
  postId: string = '';

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get title() {
    return this.postForm.get('title');
  }

  get post() {
    return this.postForm.get('post');
  }

  get isTitleEmpty() {
    return !Boolean(this.title.value);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { post: Post }) => {
      const post = data.post;

      if (post.title !== '' && post.content !== '') {
        this.isForEditting = true;
        this.postId = post._id;
      }

      this.postForm = this.formBuilder.group({
        title: [post.title, Validators.required],
        post: [post.content, Validators.required],
      });
    });
  }

  submit(): void {
    let post$ = of(null);

    const postData = {
      title: this.title.value,
      content: this.post.value,
    };

    if (this.isForEditting) {
      post$ = this.postsService.update(this.postId, postData);
    } else {
      post$ = this.postsService.create(postData);
    }

    post$.subscribe(() => {
      this.router.navigateByUrl(
        `profile/${this.userService.currentUser.username}`
      );
    });
  }
}
