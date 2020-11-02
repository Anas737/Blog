import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CoreModule } from '../../core.module';
import { UserService } from '../../user';

@Injectable({
  providedIn: CoreModule,
})
export class JwtAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate() {
    return true;
  }
}
