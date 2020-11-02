import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class JwtService {
  getToken(): string {
    return window.localStorage.getItem('jwtToken');
  }

  saveToken(token: string) {
    window.localStorage.setItem('jwtToken', token);
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
