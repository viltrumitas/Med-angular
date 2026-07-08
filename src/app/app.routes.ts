import { Routes } from '@angular/router';
import { guestGuard } from './core/guard/guest-guard';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/home/home.routes').then((e) => e.homeRoute),
  },

  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((e) => e.authRoutes),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((e) => e.dashboardRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
