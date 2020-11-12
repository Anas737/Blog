import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import { UserService } from '../user';

@Injectable({
  providedIn: CoreModule,
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isAuthenticated$.pipe(
      map((isAuth) => {
        console.log(isAuth);

        if (!isAuth) this.router.navigateByUrl('/home');

        return isAuth;
      })
    );
  }
}
