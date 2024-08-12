import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

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
    path: 'main',
    loadComponent: () => import('./features/main/main.component'),
    children:[
      {
        path: 'dashboard',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/dashboard/pages/dashboard-home/dashboard-home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER','DOCENTE_USER']}
      },
      {
        path: 'docente',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/teacher/pages/teacher-home/teacher-home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER'] }
      },
      {
        path: 'institucion',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/institution/institution-home/institution-home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER'] }
      },
      {
        path: 'college',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/college/pages/college-home/college-home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER','DIRECTOR_USER'] }
      },
      {
        path: 'configuracion',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/settings/pages/home/home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER','DIRECTOR_USER'] }
      },
      {
        path: 'asignatura',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/school-subject/pages/home/home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER'] }
      },
      {
        path: 'unidades-de-clase',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/class-unit/pages/class-unit-home/class-unit-home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER','DOCENTE_USER'] }
      },
      {
        path: 'programacion-academica',
        loadComponent: () => import('./shared/layout/layout.component'),
        children:[
          {
            path: 'home',
            loadComponent: () => import('./features/program-academic/pages/program-academic-home/program-academic-home.component')
          }
        ],
        canActivate:[roleGuard],
        data:{ rolesPermitidos:['DOCENTE_USER','DIRECTOR_USER'] }
      }
    ],
    canActivate:[authGuard]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
