import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output()
  onCloseLogIn = new EventEmitter();

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login({
      email: this.email,
      password: this.password,
    });
  }

  closeLogIn() {
    this.onCloseLogIn.emit();
  }
}
