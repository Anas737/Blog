import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import { UserService } from '../user/user.service';
import { JwtService } from './jwt';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  register(credentials: any): Observable<any> {
    return this.userService.register(credentials);
  }

  login(credentials: any) {
    return this.userService.login(credentials).pipe(
      map((response) => {
        this.setAuth(response.token);

        return response;
      })
    );
  }

  setAuth(token) {
    this.jwtService.saveToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.userService.purgeUser();
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth() {
    const token = this.jwtService.getToken();

    if (!token) {
      this.purgeAuth();

      return;
    }

    this.setAuth(token);

    this.userService.get().subscribe(
      (response) => {
        this.userService.setUser(response.user);
      },
      (err) => {
        this.purgeAuth();
        console.log(err);
      }
    );
  }
}
