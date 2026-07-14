import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewApi } from '../../services/review-api';
import { ReviewResponseDto } from '../../dto/review-response.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-reviews',
  imports: [CommonModule],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.scss',
})
export class MyReviews {
  private readonly api = inject(ReviewApi);
  private readonly router = inject(Router)

  reviews = signal<ReviewResponseDto[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getMyReviews().subscribe({
      next: (data) => {
        this.reviews.set(data);
        this.loading.set(false)
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  openReview(id: string) {
    this.router.navigate([
      '/dashboard/teacher/reviews',
      id
    ]);
  }
}
