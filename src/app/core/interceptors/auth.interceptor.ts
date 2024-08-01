import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CacheService } from '../services/cache.service';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {

  const authToken = inject(CacheService).getSessionStorage('x-token');
  const dialog = inject(MatDialog);
  const authService = inject(AuthenticationService);

  if (authToken) {

      const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });

      return next(cloned).pipe(tap(() => { }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  dialog.closeAll();
                  authService.logout();
                  authService.redirecToLogin();
              }
          }
      }));
  }

  return next(req);
}
