import { Routes } from '@angular/router';

export const casesRoutes: Routes = [
  { path: '', loadComponent: () => import('./cases').then((c) => c.Cases) },
  {
    path: 'crear-caso',
    loadComponent: () => import('./pages/create-case/create-case').then((c) => c.CreateCase),
  },
];
