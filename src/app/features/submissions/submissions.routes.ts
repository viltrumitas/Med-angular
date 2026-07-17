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
      import('./pages/submission-detail-page/submission-detail-page').then((c) => c.SubmissionDetailPage),
  },
];
