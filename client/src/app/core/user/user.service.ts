import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from '../api';
import { CoreModule } from '../core.module';
import { User } from '../models';

@Injectable({
  providedIn: CoreModule,
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({} as User);

  constructor(private apiService: ApiService) {}

  get user$() {
    return this.userSubject.asObservable().pipe(distinctUntilChanged());
  }

  get user() {
    return this.userSubject.value;
  }

  register(credentials: any): Observable<any> {
    return this.apiService.post('users', credentials);
  }

  update(user: User): Observable<User> {
    return this.apiService.put('user', user).pipe(
      map((response) => {
        this.setUser(response.user);

        return response;
      })
    );
  }

  get() {
    return this.apiService.get('user').pipe(
      map((response) => {
        this.setUser(response.user);

        return response;
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.apiService.post('users/login', credentials).pipe(
      map((response) => {
        this.setUser(response.user);

        return response;
      })
    );
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  purgeUser() {
    this.userSubject.next({} as User);
  }
}
