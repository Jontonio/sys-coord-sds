import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/pages/auth-home/auth-home.component'),
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.component')
      },
      {
        path: 'password-reset-request',
        loadComponent: () => import('./features/auth/pages/password-reset-request/password-reset-request.component')
      }
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./shared/layout/layout.component'),
    children:[
      {
        path: 'home',
        loadComponent: () => import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
      }
    ]
  },
  {
    path: 'customer',
    loadComponent: () => import('./shared/layout/layout.component'),
    children:[
      {
        path: 'home',
        loadComponent: () => import('./features/customer/pages/customer-home/customer-home.component')
      }
    ]
  },
  {
    path: 'docente',
    loadComponent: () => import('./shared/layout/layout.component'),
    children:[
      {
        path: 'home',
        loadComponent: () => import('./features/teacher/pages/teacher-home/teacher-home.component')
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
