import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guard/role-guard';
import { UserRole } from '../../core/enum/user-role.enum';
import { dashboardRedirectGuard } from '../../core/guard/dashboard.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((c) => c.Dashboard),

    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [dashboardRedirectGuard],
        children: [],
      },

      {
        path: 'teacher',
        canMatch: [roleGuard],
        data: {
          roles: [UserRole.TEACHER],
        },
        loadChildren: () => import('./roles/teacher.routes').then((routes) => routes.teacherRoutes),
      },
      {
        path: 'student',
        canMatch: [roleGuard],
        data: {
          roles: [UserRole.STUDENT],
        },
        loadChildren: () => import('./roles/student.routes').then((routes) => routes.studentRoutes),
      },
    ],
  },
];
