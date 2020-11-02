import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../auth/jwt/jwt.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();

    if (token) {
      this.headersConfig['Authorization'] = `Bearer ${token}`;
    }
    console.log(this.headersConfig);

    const request = req.clone({
      setHeaders: this.headersConfig,
    });

    return next.handle(request);
  }
}
