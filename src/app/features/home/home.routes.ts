import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guard/guest-guard';

export const homeRoute: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () => import('./home').then((c) => c.Home),
  },
];
