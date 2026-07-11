import { Routes } from '@angular/router';

export const studentClassroomRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/classroom-list/classroom-list')
        .then(c => c.ClassroomList),
  },

  {
    path: ':classroomId/assignments/:assignmentId',
    loadComponent: () =>
      import('./pages/assignment-detail/assignment-detail')
      .then(c => c.AssignmentDetail),
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/classroom-detail/classroom-detail')
        .then(c => c.ClassroomDetail),
  },
];