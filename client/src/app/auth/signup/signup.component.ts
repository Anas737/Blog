import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @Output()
  onCloseSignUp = new EventEmitter();

  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.authService
      .register({
        email: this.email,
        username: this.username,
        password: this.password,
      })
      .subscribe((response) => {
        console.log(response);

        this.closeSignUp();
      });
  }

  closeSignUp() {
    this.onCloseSignUp.emit();
  }
}
