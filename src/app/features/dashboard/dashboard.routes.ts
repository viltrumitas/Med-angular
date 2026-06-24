import { Routes } from '@angular/router';
import { casesRouter } from '../cases/cases.routes';

export const dashboardRoutes: Routes = [
  { path: '', loadComponent: () => import('./dashboard').then((c) => c.Dashboard) },
  { path: 'cases', children: casesRouter },
];
