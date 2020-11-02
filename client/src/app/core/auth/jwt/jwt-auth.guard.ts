import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  canActivate() {
    return true;
  }
}
