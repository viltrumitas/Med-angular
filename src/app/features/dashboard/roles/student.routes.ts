import { Routes } from '@angular/router';

export const studentRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'classrooms',
    loadChildren: () =>
      import('../../classroom/students/students.routes').then((e) => e.studentClassroomRoutes),
  },
  {
    path: 'assigned-cases',
    loadChildren: () =>
      import('../../assigned-case/assigned-case.routes').then((e) => e.assignedRoutes),
  },
  {
    path: 'submissions',
    loadChildren: () =>
      import('../../submissions/submissions.routes').then((e) => e.submissionRoutes),
  },
];
