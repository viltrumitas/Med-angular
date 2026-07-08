import { Routes } from '@angular/router';

export const teacherRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'classrooms',
  },
  {
    path: 'cases',
    loadChildren: () => import('../../cases/cases.routes').then((e) => e.casesRoutes),
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('../../assignments/assignments.routes').then((e) => e.assignmentsRoutes),
  },
  {
    path: 'reviews',
    loadChildren: () => import('../../reviews/reviews.routes').then((e) => e.reviewsRoutes),
  },
  {
    path: 'classrooms',
    loadChildren: () =>
      import('../../classroom/teacher/teacher-clasrooms.routes').then(
        (e) => e.teacherClassroomRoutes,
      ),
  },
];
