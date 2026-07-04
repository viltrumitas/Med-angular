import { Routes } from '@angular/router';

export const assignmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/assignment-list/assignment-list').then((c) => c.AssignmentList),
  },
  {
    path: 'crear-assignment',
    loadComponent: () =>
      import('./pages/assignment-create/assignment-create').then((c) => c.AssignmentCreate),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/assignment-detail/assignment-detail').then((c) => c.AssignmentDetailPage),
  },
];
