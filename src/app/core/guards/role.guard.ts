import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { LoaddingService } from '../services/loadding.service';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const cacheService = inject(CacheService);
  const loadingService = inject(LoaddingService);

  loadingService.setMessage('Modulos del sistema');

  const rolesPermitidos = route.data?.['rolesPermitidos'] || [];
  const token = cacheService.getSessionStorage('x-token');

  if (!token) {
      authService.redirecToLogin();
      return false;
  }

  const currentUser = authService.getUserAuth;

  if (!currentUser) {
      cacheService.removeLocalStorage('x-token');
      authService.redirecToLogin();
      return false;
  }

  const cod_modular_ie = currentUser.cod_modular_ie;

  const hasPermission = currentUser.roles.some((role: any) => rolesPermitidos.includes(role.name.toUpperCase()));

  if (!hasPermission) {
    //TODO: falta redigir a una pagina de no autorizado o retornar a la misma pagina
    return false;
  }

  return true;
};
