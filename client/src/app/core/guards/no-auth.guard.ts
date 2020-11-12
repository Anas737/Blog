import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import { UserService } from '../user';

@Injectable({
  providedIn: CoreModule,
})
export class NoAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isAuthenticated$.pipe(
      map((isAuth) => {
        if (isAuth) this.router.navigateByUrl('/feed');

        return !isAuth;
      })
    );
  }
}
