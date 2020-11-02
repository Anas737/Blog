import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  constructor(private userService: UserService) {}

  register(userData: any): Observable<any> {
    return this.userService.register(userData);
  }

  login(userData: any) {
    return this.userService.login(userData).subscribe((response) => {
      console.log(response);
    });
  }
}
