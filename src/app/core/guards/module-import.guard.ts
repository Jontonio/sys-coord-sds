import { CanActivateFn } from '@angular/router';

export const moduleImportGuard: CanActivateFn = (route, state) => {
  return true;
};
