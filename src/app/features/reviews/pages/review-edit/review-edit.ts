import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewApi } from '../../services/review-api';
import { ReviewResponseDto } from '../../dto/review-response.dto';
import { mapCreateReview } from '../../mappers/review-mapper';
import { createReviewForm } from '../../forms/review.form';

import { SceneManagement } from '../../components/scene-management/scene-management';
import { PrimaryAssessment } from '../../components/primary-assessment/primary-assessment';
import { VitalSigns } from '../../components/vital-signs/vital-signs';
import { PatientPriority } from '../../components/patient-priority/patient-priority';
import { PhysicalExamination } from '../../components/physical-examination/physical-examination';
import { FocusedAssessment } from '../../components/focused-assessment/focused-assessment';
import { Opqrst } from '../../components/opqrst/opqrst';
import { Sampler } from '../../components/sampler/sampler';
import { OtherInterventions } from '../../components/other-interventions/other-interventions';

import { ButtonComponent } from '../../../../shared/components/button/button';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';
import { CaseContent } from '../../../cases/pages/case-content/case-content';
import { SubmissionContent } from '../../components/submission-content/submission-content';


@Component({
  selector: 'app-review-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SceneManagement,
    PrimaryAssessment,
    VitalSigns,
    PatientPriority,
    PhysicalExamination,
    FocusedAssessment,
    Opqrst,
    Sampler,
    OtherInterventions,
    ButtonComponent,
    TextareaComponent,
    CaseContent,
    SubmissionContent
  ],
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

  totalScore = signal(0);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate([
        '/dashboard/teacher/reviews'
      ]);

      return;
    }

    this.reviewForm.valueChanges.subscribe(() => {
      this.calculateTotalScore()
    })

    this.api.getReviewById(id).subscribe({
      next: (review) => {
        this.review.set(review);
        this.patchForm(review);
        this.loading.set(false);
      },

      error: (err) => {
        console.log(err)
        this.loading.set(false);
      }
    });

  }

  save() {

    const review = this.review();

    if (!review) return;

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    const dto = mapCreateReview(this.reviewForm.getRawValue());

    this.api.updateReview(dto, review.id).subscribe({
      next: () => {
        this.saving.set(false);

        this.router.navigate([
          '/dashboard/teacher/reviews',
          review.id
        ]);
      },

      error: (err) => {
        console.log(err)
        this.saving.set(false);
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

  private calculateTotalScore() {
    const value = this.reviewForm.getRawValue();

    const sections = [
      value.sceneManagement,
      value.primaryAssessment,
      value.patientPriority,
      value.vitalSigns,
      value.focusedAssessment,
      value.physicalExamination,
      value.sampler,
      value.opqrst,
      value.otherInterventions,
    ];

    const total = sections.reduce((acc, section) => {
      return acc +
        Object.values(section)
          .reduce(
            (sum, v) => sum + Number(v),
            0
          );
    }, 0);

    this.totalScore.set(total)
  }
}
