import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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

import { ReviewApi } from '../../services/review-api';
import { Router, ActivatedRoute } from '@angular/router';
import { mapCreateReview } from '../../mappers/review-mapper';
import { SubmissionResponseDto } from '../../dto/submission-response.dto';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CaseContent } from '../../../cases/pages/case-content/case-content';
import { SubmissionContent } from '../../components/submission-content/submission-content';
import { TextareaComponent } from "../../../../shared/components/text-area/text-area";

@Component({
  selector: 'app-review-create',
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
    CaseContent,
    SubmissionContent,
    TextareaComponent
  ],
  templateUrl: './review-create.html',
  styleUrl: './review-create.scss',
})
export class ReviewCreate implements OnInit {

  private readonly api = inject(ReviewApi);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  totalScore = signal(0);

  reviewForm = createReviewForm();

  submission = signal<SubmissionResponseDto | null>(null);

  loading = signal(true);

  saving = signal(false);

  ngOnInit() {
    const submissionId =
      this.route.snapshot.paramMap.get('submissionId');

    if (!submissionId) {
      this.router.navigate([
        '/dashboard/teacher/reviews',
      ]);
      return;
    }

    this.reviewForm.valueChanges.subscribe(() => {
      this.calculateTotalScore();
    });

    this.calculateTotalScore();

    this.api
      .getSubmissionById(submissionId)
      .subscribe({

        next: (submission) => {
          this.submission.set(submission);
          this.loading.set(false);
        },

        error: () => {
          this.loading.set(false);

          this.router.navigate([
            '/dashboard/teacher/reviews',
          ]);
        },

      });
  }

  save() {

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const submission = this.submission();

    if (!submission) return;

    this.saving.set(true);

    const dto = mapCreateReview(
      this.reviewForm.getRawValue(),
    );

    this.api
      .create(submission.id, dto)
      .subscribe({

        next: () => {

          this.saving.set(false);

          this.router.navigate([
            '/dashboard/teacher/reviews/my-reviews',
          ]);

        },

        error: (err) => {

          console.error(err);

          this.saving.set(false);

        },

      });

  }

  private calculateTotalScore(): void {

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

    const total = sections.reduce((total, section) => {

      return (
        total +
        Object.values(section).reduce(
          (sum, score) => sum + Number(score),
          0,
        )
      );

    }, 0);

    this.totalScore.set(total);

  }

}
