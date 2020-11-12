import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserService } from 'src/app/core';
import { PostsService } from 'src/app/shared/post/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  Editor = ClassicEditor;

  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private postsService: PostsService
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
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      post: ['', Validators.required],
    });
  }

  submit(): void {
    this.postsService
      .create({
        title: this.title.value,
        content: this.post.value,
      })
      .subscribe();

    this.router.navigateByUrl(
      `profile/${this.userService.currentUser.username}`
    );
  }
}
