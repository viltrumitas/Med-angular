import { Routes } from '@angular/router';

export const assignedRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/assigned-detail/assigned-detail').then((c) => c.AssignedDetail),
  },
];
