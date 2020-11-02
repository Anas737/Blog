import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService
      .login({
        user: {
          email: this.email,
          password: this.password,
        },
      })
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (err) => console.log(err)
      );
  }

  closeLogIn() {
    this.onCloseLogIn.emit();
  }
}
