import { Routes } from '@angular/router';

export const submissionRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/submissions-list/submissions-list').then((c) => c.SubmissionsList),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/submissions-detail/submissions-detail').then((c) => c.SubmissionsDetail),
  },
];
