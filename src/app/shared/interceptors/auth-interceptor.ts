import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@app/pages/auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.userToken}`,
    }
  })

  return next(authReq);
};
