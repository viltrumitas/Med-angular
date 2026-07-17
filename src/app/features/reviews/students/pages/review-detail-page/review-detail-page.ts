import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewDetail } from '../../../components/review-detail/review-detail';
import { ReviewApi } from '../../../services/review-api';
import { ReviewResponseDto } from '../../../dto/review-response.dto';

@Component({
  selector: 'app-review-detail-page',
  imports: [ReviewDetail],
  templateUrl: './review-detail-page.html',
  styleUrl: './review-detail-page.scss',
})
export class ReviewDetailPage {
  private readonly api = inject(ReviewApi);
  private readonly route = inject(ActivatedRoute);

  readonly review = signal<ReviewResponseDto | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      return;
    }

    this.api.getReviewById(id).subscribe({
      next: (review) => {
        this.review.set(review);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }
}
