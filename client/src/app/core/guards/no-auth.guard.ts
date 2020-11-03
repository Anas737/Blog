import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map((isAuth) => {
        if (isAuth) this.router.navigateByUrl('/feed');

        return !isAuth;
      })
    );
  }
}
