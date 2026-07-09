import { Routes } from '@angular/router';

export const studentClassroomRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/classroom-list/classroom-list').then((c) => c.ClassroomList),
  },
];
