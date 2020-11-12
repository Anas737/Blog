import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output()
  onCloseLogIn = new EventEmitter();

  loginError: string;
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isEmailEmpty(): boolean {
    return !Boolean(this.email.value);
  }

  get isPasswordEmpty(): boolean {
    return !Boolean(this.password.value);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginError = '';

    const user = {
      ...this.loginForm.value,
    };

    this.userService.login(user).subscribe(
      () => {
        this.router.navigateByUrl('/feed');
      },
      (err) => {
        console.log(err);

        this.loginError = err.message;
      }
    );
  }

  closeLogIn() {
    this.onCloseLogIn.emit();
  }
}
