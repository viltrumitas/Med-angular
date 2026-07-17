import { Routes } from "@angular/router";

export const reviewsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./teacher/pages/review-list/review-list')
        .then(c => c.ReviewList),
  },

  {
    path: 'my-reviews',
    loadComponent: () =>
      import('./teacher/pages/my-reviews/my-reviews')
        .then(c => c.MyReviews),
  },

  {
    path: 'crear/:submissionId',
    loadComponent: () =>
      import('./teacher/pages/review-create/review-create')
        .then(c => c.ReviewCreate),
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./teacher/pages/review-edit/review-edit')
        .then(c => c.ReviewEdit),
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./teacher/pages/review-detail-page/review-detail-page')
        .then(c => c.ReviewDetailPage),
  },
];