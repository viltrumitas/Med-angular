import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Auth } from './features/auth/auth';
import { Caso } from './features/casos-clinicos/alumno/caso/caso';
import { CrearCaso } from './features/casos-clinicos/maestro/crear-caso/crear-caso';
import { DashboardHome } from './pages/dashboard/dashboard-home/dashboard-home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/layout/layout').then((m) => m.Layout),
    children: [
      { path: 'home', component: DashboardHome },
      {
        path: 'alumno',
        children: [{ path: 'caso', component: Caso }],
      },
      {
        path: 'maestro',
        children: [{ path: 'crear-caso', component: CrearCaso }],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
