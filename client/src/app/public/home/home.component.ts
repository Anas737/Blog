import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSignUpOpened: boolean = false;
  isLogInOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  triggerSignUp() {
    console.log('Trigger');
    this.isSignUpOpened = !this.isSignUpOpened;
  }

  triggerLogIn() {
    this.isLogInOpened = !this.isLogInOpened;
  }
}
