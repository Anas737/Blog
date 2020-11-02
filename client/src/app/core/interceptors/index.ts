import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './http-header.interceptor';

export const HttpHeaderInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
];
