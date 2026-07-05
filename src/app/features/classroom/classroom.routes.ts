import { Routes } from '@angular/router';

export const classroomRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/classroom-list/classroom-list').then((c) => c.ClassroomList),
  },
];
