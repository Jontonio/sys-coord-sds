import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { CacheService } from '../services/cache.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaddingService } from '../services/loadding.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const cacheService = inject(CacheService);
  const spinnerService = inject(NgxSpinnerService);
  const loading = inject(LoaddingService);

  spinnerService.show();
  loading.setMessage("Verificando sesión")

  return new Promise((resolve, reject) => {
    authService.checkAuthUser().subscribe({
      next:({ data }) => {
        authService.setUserAuth(data);
        spinnerService.hide();
        resolve(true);
      },
      error:(e) => {
        spinnerService.hide();
        cacheService.removeSessionStorage('x-token');
        authService.redirecToLogin();
        reject(false)
      },
    })
  })
};
