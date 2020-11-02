import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private getPath(route: string) {
    return `${environment.api_url}/${route}`;
  }

  get(route: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(this.getPath(route), { params })
      .pipe(catchError(this.formatErrors));
  }

  post(route: string, body: Object = {}): Observable<any> {
    return this.post(this.getPath(route), body).pipe(
      catchError(this.formatErrors)
    );
  }

  put(route: string, body: Object = {}): Observable<any> {
    return this.put(this.getPath(route), body).pipe(
      catchError(this.formatErrors)
    );
  }

  delete(route: string): Observable<any> {
    return this.delete(this.getPath(route)).pipe(catchError(this.formatErrors));
  }
}
