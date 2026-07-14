import { Routes } from "@angular/router";

export const reviewsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/review-list/review-list')
        .then(c => c.ReviewList),
  },

  {
    path: 'my-reviews',
    loadComponent: () =>
      import('./pages/my-reviews/my-reviews')
        .then(c => c.MyReviews),
  },

  {
    path: 'crear/:submissionId',
    loadComponent: () =>
      import('./pages/review-create/review-create')
        .then(c => c.ReviewCreate),
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/review-edit/review-edit')
        .then(c => c.ReviewEdit),
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/review-detail/review-detail')
        .then(c => c.ReviewDetail),
  },
];