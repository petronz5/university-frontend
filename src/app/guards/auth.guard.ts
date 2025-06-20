// src/app/guards/auth.guard.ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { JwtHelperService }               from '@auth0/angular-jwt';
import { inject }                         from '@angular/core';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const jwtHelper = inject(JwtHelperService);
  const router    = inject(Router);
  const token     = localStorage.getItem('token');

  if (token && !jwtHelper.isTokenExpired(token)) {
    return true;
  }

  localStorage.removeItem('token');
  return router.createUrlTree(['/login']);
};
