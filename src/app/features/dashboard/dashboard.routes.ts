import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guard/role-guard';
import { UserRole } from '../../core/enum/user-role.enum';

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
          {
            path: 'assignments',
            loadChildren: () =>
              import('../assignments/assignments.routes').then((e) => e.assignmentsRoutes),
          },
          {
            path: 'reviews',
            loadChildren: () => import('../reviews/reviews.routes').then((e) => e.reviewsRoutes),
          },
        ],
      },

      {
        path: 'student',
        canActivate: [roleGuard],
        data: { roles: [UserRole.STUDENT] },
        loadComponent: () => import('./roles/student/student').then((c) => c.Student),
        children: [
          {
            path: 'assigned',
            loadChildren: () =>
              import('../assigned-case/assigned-case.routes').then((e) => e.assignedRoutes),
          },
        ],
      },
    ],
  },
];
