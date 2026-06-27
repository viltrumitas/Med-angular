import { Routes } from '@angular/router';
import { casesRoutes } from '../cases/cases.routes';
import { authGuard } from '../../core/guard/auth-guard';
import { roleGuard } from '../../core/guard/role-guard';
import { UserRole } from '../../core/models/user-role';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((c) => c.Dashboard),
    children: [
      {
        path: 'teacher',
        canActivate: [roleGuard],
        data: { roles: [UserRole.TEACHER] },
        loadComponent: () => import('./roles/teacher/teacher').then((c) => c.Teacher),
        children: [
          {
            path: 'cases',
            loadChildren: () => import('../cases/cases.routes').then((e) => e.casesRoutes),
          },
        ],
      },

      {
        path: 'student',
        canActivate: [roleGuard],
        data: { roles: [UserRole.STUDENT] },
        loadComponent: () => import('./roles/student/student').then((c) => c.Student),
        children: [],
      },
    ],
  },
];
