import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const roleGuard: CanActivateFn = (route, _state): boolean | UrlTree => {
  const router     = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // solo client-side
  const role = isPlatformBrowser(platformId)
    ? localStorage.getItem('role')
    : null;

  const allowed = (route.data?.['roles'] as string[]) ?? [];
  return role && allowed.includes(role)
    ? true
    : router.createUrlTree(['/']);
};
