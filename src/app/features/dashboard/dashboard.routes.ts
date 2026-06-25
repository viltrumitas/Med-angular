import { Routes } from '@angular/router';
import { casesRoutes } from '../cases/cases.routes';
import { authGuard } from '../../core/guard/auth-guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard').then((c) => c.Dashboard),
    children: [
      {
        path: 'cases',
        loadChildren: () => import('../cases/cases.routes').then((c) => c.casesRoutes),
      },
    ],
  },
];
