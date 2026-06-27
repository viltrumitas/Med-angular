import { Routes } from '@angular/router';

export const homeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then((c) => c.Home),
  },
];
