import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // solo in browser
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;

  return token
    ? next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
    : next(req);
};
