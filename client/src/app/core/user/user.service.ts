import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { ApiService } from '../api/api.service';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class UserService {
  constructor(private apiService: ApiService) {}

  register(userData: any): Observable<any> {
    return this.apiService.post('users', userData);
  }

  login(userData: any): Observable<any> {
    return this.apiService.post('users/login', userData);
  }
}
