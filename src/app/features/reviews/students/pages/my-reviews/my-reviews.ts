import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewApi } from '../../../services/review-api';

import { ReviewSummaryResponseDto } from '../../../dto/review-summary-response.dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.scss',
})
export class MyReviews implements OnInit {
  private readonly api = inject(ReviewApi);
  private readonly router = inject(Router);

  readonly reviews = signal<ReviewSummaryResponseDto[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews() {
    this.loading.set(true);

    this.api.getMyReviews()
      .subscribe({
        next: (response) => {
          this.reviews.set(response);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }

  openReview(id: string) {
    this.router.navigate([
      `/dashboard/student/reviews`,
      id
    ]);
  }
}
