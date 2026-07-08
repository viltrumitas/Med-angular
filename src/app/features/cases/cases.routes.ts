import { Routes } from '@angular/router';

export const casesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/cases-list/cases-list').then((c) => c.CasesList),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-case/create-case').then((c) => c.CreateCase),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/case-detail/case-detail').then((c) => c.CaseDetail),
  },
];
