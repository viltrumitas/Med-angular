import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewApi } from '../../services/review-api';
import { ReviewResponseDto } from '../../dto/review-response.dto';
import { createRegisterForm } from '../../../auth/forms/auth.forms';
import { mapCreateReview } from '../../mappers/review-mapper';
import { createReviewForm } from '../../forms/review.form';

@Component({
  selector: 'app-review-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-edit.html',
  styleUrl: './review-edit.scss',
})
export class ReviewEdit implements OnInit {
  private readonly api = inject(ReviewApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  review = signal<ReviewResponseDto | null>(null);

  loading = signal(true);
  saving = signal(false);

  reviewForm = createReviewForm();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate([
        '/dashboard/teacher/reviews'
      ]);

      return;
    }

    this.api.getReviewById(id).subscribe({
      next: (review) => {
        this.review.set(review);
        this.patchForm(review);
        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);
      }
    });

  }

  private patchForm(
    review: ReviewResponseDto
  ) {
    this.reviewForm.patchValue({
      sceneManagement:
        review.sceneManagement,

      primaryAssessment:
        review.primaryAssessment,

      patientPriority:
        review.patientPriority,

      vitalSigns:
        review.vitalSigns,

      focusedAssessment:
        review.focusedAssessment,

      physicalExamination: 
        review.physicalExamination,

      sampler:
        review.sampler,

      opqrst:
        review.opqrst,
      
      otherInterventions:
        review.otherInterventions,

      feedback:
        review.feedback || ''
    });
  }

  save() {
    const id = this.review()?.id;

    if (!id) return;

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    const dto = mapCreateReview(this.reviewForm.getRawValue());

    this.api.updateReview(dto, id).subscribe({
      next: () => {
        this.saving.set(false);

        this.router.navigate([
          '/dashboard/teacher/reviews',
          id
        ]);
      },

      error: () => {
        this.saving.set(false);
      }
    });
  }
}
