import { Routes } from '@angular/router';

export const submissionRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/submissions-detail/submissions-detail').then((c) => c.SubmissionsDetail),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/submissions-create/submissions-create').then((c) => c.SubmissionsCreate),
  },
];
