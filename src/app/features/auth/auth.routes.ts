import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guard/guest-guard';

export const authRoutes: Routes = [
  {
    path: '',
    // canActivate: [guestGuard],
    loadComponent: () => import('./auth.component').then((c) => c.AuthComponent),
  },
];
