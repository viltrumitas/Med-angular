import { Routes } from "@angular/router";

export const reviewsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/review-list/review-list').then((c) => c.ReviewList),
  },
  {
    path: 'crear-review',
    loadComponent: () => import('./pages/review-create/review-create').then((c) => c.ReviewCreate),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/review-detail/review-detail').then((c) => c.ReviewDetail),
  },
];