import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL: string = 'http://localhost:3000/api';

  private readonly HTTP_OPTIONS: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  register(userData: RegisterUserDTO): Observable<any> {
    return this.http.post(
      `${this.API_URL}/users`,
      { user: userData },
      this.HTTP_OPTIONS
    );
  }

  login(userData: LoginUserDTO): Observable<any> {
    return this.http.post(
      `${this.API_URL}/users/login`,
      { user: userData },
      this.HTTP_OPTIONS
    );
  }
}
