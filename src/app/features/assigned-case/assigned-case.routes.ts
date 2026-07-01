import { Routes } from '@angular/router';

export const assignedRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/assigned-list/assigned-list').then((c) => c.AssignedList),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/assigned-detail/assigned-detail').then((c) => c.AssignedDetail),
  },
];
