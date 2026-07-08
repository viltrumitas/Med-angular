import { Routes } from '@angular/router';

export const classroomRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/classroom-list/classroom-list')
        .then(c => c.ClassroomList),
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-classroom/create-classroom')
        .then(c => c.CreateClassroom),
  },

  {
    path: ':classroomId/assignments/:assignmentId',
    loadComponent: () =>
      import('./pages/assignment-detail/assignment-detail')
        .then(c => c.AssignmentDetailPage),
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/classroom-detail/classroom-detail')
        .then(c => c.ClassroomDetail),
  },

];