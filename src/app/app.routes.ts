import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { homeRoute } from './features/home/home.routes';

export const routes: Routes = [
  { path: 'auth', children: authRoutes },
  { path: 'home', children: homeRoute },
  { path: 'dashboard', children: dashboardRoutes },
];
