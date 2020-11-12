import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator, EmailValidator } from 'src/app/core/validators';
import { UserService } from '../../../core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @Output()
  onCloseSignUp = new EventEmitter();

  signUpForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.signUpForm.get('email');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get isEmailEmpty(): boolean {
    return !Boolean(this.email.value);
  }

  get isUsernameEmpty(): boolean {
    return !Boolean(this.username.value);
  }

  get isPasswordEmpty(): boolean {
    return !Boolean(this.password.value);
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, EmailValidator]],
      username: ['', Validators.required],
      password: ['', [Validators.required, PasswordValidator]],
    });
  }

  register() {
    const user = {
      ...this.signUpForm.value,
    };

    this.userService.register(user).subscribe((response) => {
      console.log(response);

      this.closeSignUp();
    });
  }

  closeSignUp() {
    this.onCloseSignUp.emit();
  }
}
