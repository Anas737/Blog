import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { ApiService } from '../api';
import { JwtService } from '../auth';
import { CoreModule } from '../core.module';
import { User } from '../models';

@Injectable({
  providedIn: CoreModule,
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );
  private isAuthenticatedSubject: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  get currentUser$() {
    return this.userSubject.asObservable().pipe(distinctUntilChanged());
  }

  get currentUser() {
    return this.userSubject.value;
  }

  get isAuthenticated$() {
    return this.isAuthenticatedSubject
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  /* Authentication */
  authenticate() {
    if (!this.jwtService.getToken()) {
      this.purgeAuth();

      return;
    }

    this.isAuthenticatedSubject.next(true);

    this.get().subscribe();
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.userSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  /* CRUD */
  register(credentials: any): Observable<any> {
    return this.apiService.post('users', credentials);
  }

  login(credentials: any): Observable<User> {
    return this.apiService.post('users/login', credentials).pipe(
      tap((loggedUser) => {
        this.setAuth(loggedUser);
      })
    );
  }

  get(): Observable<User> {
    return this.apiService.get('user').pipe(
      tap(
        (currentUser) => {
          this.userSubject.next(currentUser);
        },
        (err) => {
          console.log(err);
          this.purgeAuth();
        }
      )
    );
  }

  update(toUpdate: User): Observable<User> {
    return this.apiService.post('user', toUpdate).pipe(
      tap((updatedUser) => {
        this.userSubject.next(updatedUser);
      })
    );
  }
}
