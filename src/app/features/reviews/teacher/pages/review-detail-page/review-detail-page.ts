import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ReviewResponseDto } from '../../../dto/review-response.dto';
import { ReviewApi } from '../../../services/review-api';
import { ReviewDetail } from '../../../components/review-detail/review-detail';

@Component({
  selector: 'app-review-detail-page',
  standalone: true,
  imports: [ReviewDetail],
  templateUrl: './review-detail-page.html',
  styleUrl: './review-detail-page.scss',
})
export class ReviewDetailPage {
  private readonly api = inject(ReviewApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly review = signal<ReviewResponseDto | null>(null);
  readonly loading = signal(true);
  readonly canEdit = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      return;
    }

    this.api.getReviewById(id).subscribe({
      next: (review) => {
        console.log('Review', review);
        this.review.set(review);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  editReview(id: string) {
    this.router.navigate([
      `/dashboard/teacher/reviews`, id, 'edit'
    ]);
  }
}
