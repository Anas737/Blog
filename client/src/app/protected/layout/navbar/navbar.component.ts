import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  opened: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.purgeAuth();
  }

  triggerMenu() {
    this.opened = !this.opened;
  }
}
