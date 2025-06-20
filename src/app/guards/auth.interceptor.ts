// src/app/guards/auth.interceptor.ts
import { Injectable }            from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Router }                from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError }            from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          localStorage.clear();              // logout client
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
