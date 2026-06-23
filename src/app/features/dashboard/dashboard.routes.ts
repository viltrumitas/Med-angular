import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((c) => c.Dashboard),
  },
];
