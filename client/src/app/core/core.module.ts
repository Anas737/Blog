import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaderInterceptorProvider } from './interceptors';
import { JwtService } from './auth/jwt/jwt.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [JwtService, HttpHeaderInterceptorProvider],
})
export class CoreModule {}
