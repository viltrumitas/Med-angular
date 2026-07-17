import { Routes } from "@angular/router";

export const studentReviewRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./students/pages/my-reviews/my-reviews')
        .then(c => c.MyReviews)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./students/pages/review-detail-page/review-detail-page')
      .then(c => c.ReviewDetailPage),
  },
]