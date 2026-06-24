import { Routes } from '@angular/router';
import { CreateCase } from './pages/create-case/create-case';

export const casesRouter: Routes = [
  { path: '', loadComponent: () => import('./cases').then((c) => c.Cases) },
  { path: 'crear-caso', component: CreateCase },
];
