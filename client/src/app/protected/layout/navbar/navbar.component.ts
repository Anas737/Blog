import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  opened: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.purgeAuth();
  }

  triggerMenu() {
    this.opened = !this.opened;
  }
}
