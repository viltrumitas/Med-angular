import { Routes } from '@angular/router';
import { Route } from 'lucide';

export const teacherClassroomRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/classroom-list/classroom-list').then((c) => c.ClassroomList),
  },
  {
    path: ':classroomId/assignments/:assignmentId',
    loadComponent: () =>
      import('./pages/assignment-detail/assignment-detail').then((c) => c.AssignmentDetailPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/classroom-detail/classroom-detail').then((c) => c.ClassroomDetail),
  },
];
