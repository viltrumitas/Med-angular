import { Routes } from '@angular/router';

export const assignmentsRoutes: Routes = [
  {
    path: 'crear-assignment',
    loadComponent: () =>
      import('../classroom/components/assignment-create/assignment-create').then(
        (c) => c.AssignmentCreate,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../classroom/teacher/pages/assignment-detail/assignment-detail').then(
        (c) => c.AssignmentDetailPage,
      ),
  },
];
