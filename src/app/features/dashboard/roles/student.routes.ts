import { Routes } from '@angular/router';

export const studentRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'classrooms',
  },
  {
    path: 'classrooms',
    loadChildren: () =>
      import('../../classroom/students/students.routes').then((e) => e.studentClassroomRoutes),
  },
  {
    path: 'activities',
    loadComponent: () => 
      import('../../reviews/students/pages/my-pending/my-pending').then((e) => e.MyPending),
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('../../reviews/student.routes').then((e) => e.studentReviewRoutes),
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
 