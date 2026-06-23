import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { DashboardLayout } from './features/dashboard/layout/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  { path: 'auth', children: authRoutes },
  { path: 'dashboard ', component: DashboardLayout },
];
