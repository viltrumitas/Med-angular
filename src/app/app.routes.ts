import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Auth } from './features/auth/pages/auth';
import { Caso } from './features/cases/alumno/caso/caso';
import { CrearCaso } from './features/cases/maestro/crear-caso/crear-caso';
import { Layout } from './features/dashboard/layout/layout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/layout/layout').then((m) => m.Layout),
    children: [
      { path: 'home', component: Layout },
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
