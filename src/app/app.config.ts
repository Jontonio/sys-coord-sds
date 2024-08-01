import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { handdleErrorInterceptor } from './core/interceptors/handdle-error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([SpinnerInterceptor,AuthInterceptor, handdleErrorInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
};
