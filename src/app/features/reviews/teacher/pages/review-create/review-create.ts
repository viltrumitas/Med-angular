import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, startWith } from 'rxjs';
import { createIcons, icons } from 'lucide';
import { ButtonComponent } from '../../../../../shared/components/button/button';
import { TextareaComponent } from '../../../../../shared/components/text-area/text-area';
import { CaseContent } from '../../../../cases/pages/case-content/case-content';
import { SceneManagement } from '../../../components/scene-management/scene-management';
import { PrimaryAssessment } from '../../../components/primary-assessment/primary-assessment';
import { VitalSigns } from '../../../components/vital-signs/vital-signs';
import { PatientPriority } from '../../../components/patient-priority/patient-priority';
import { PhysicalExamination } from '../../../components/physical-examination/physical-examination';
import { FocusedAssessment } from '../../../components/focused-assessment/focused-assessment';
import { Opqrst } from '../../../components/opqrst/opqrst';
import { Sampler } from '../../../components/sampler/sampler';
import { OtherInterventions } from '../../../components/other-interventions/other-interventions';
import { SubmissionContent } from '../../../components/submission-content/submission-content';
import { SubmissionResponseDto } from '../../../dto/submission-response.dto';
import { createReviewForm } from '../../../forms/review.form';
import { mapCreateReview } from '../../../mappers/review-mapper';
import { ReviewApi } from '../../../services/review-api';

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
    TextareaComponent,
    DatePipe,
  ],
  templateUrl: './review-create.html',
  styleUrl: './review-create.scss',
})
export class ReviewCreate implements OnInit, AfterViewInit {
  private readonly api = inject(ReviewApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly reviewForm = createReviewForm();
  readonly submission = signal<SubmissionResponseDto | null>(null);
  readonly submissionId = signal<string | null>(null);
  readonly classroomId = signal<string | null>(null);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);
  readonly caseExpanded = signal(false);
  readonly submissionExpanded = signal(true);
  readonly totalScore = signal(0);

  readonly canSave = computed(() => {
    return !!this.submission() && !this.loading() && !this.saving();
  });

  ngOnInit(): void {
    this.classroomId.set(this.route.snapshot.queryParamMap.get('classroomId'));

    const submissionId = this.route.snapshot.paramMap.get('submissionId');

    this.submissionId.set(submissionId);

    this.reviewForm.valueChanges
      .pipe(startWith(this.reviewForm.getRawValue()), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.calculateTotalScore();
      });

    if (!submissionId) {
      this.loading.set(false);
      this.loadError.set('No se encontró el identificador de la entrega.');
      return;
    }

    this.loadSubmission();
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  toggleCase(): void {
    this.caseExpanded.update((value) => !value);
    this.renderIcons();
  }

  toggleSubmission(): void {
    this.submissionExpanded.update((value) => !value);
    this.renderIcons();
  }

  loadSubmission(): void {
    const submissionId = this.submissionId();

    if (!submissionId || (this.loading() && this.submission())) {
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);

    this.api
      .getSubmissionById(submissionId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (submission) => {
          this.submission.set(submission);
        },
        error: (error) => {
          this.submission.set(null);

          this.loadError.set(
            this.getErrorMessage(error, 'No pudimos cargar la entrega para revisión.'),
          );
        },
      });
  }

  save(): void {
    if (!this.canSave()) {
      return;
    }

    this.saveError.set(null);

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();

      this.saveError.set(
        'Completa todos los apartados requeridos antes de finalizar la evaluación.',
      );

      this.renderIcons();
      return;
    }

    const submission = this.submission();

    if (!submission) {
      return;
    }

    const dto = mapCreateReview(this.reviewForm.getRawValue());

    this.saving.set(true);
    this.reviewForm.disable();

    this.api
      .create(submission.id, dto)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.saving.set(false);
          this.reviewForm.enable();
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.navigateToReviews();
        },
        error: (error) => {
          this.saveError.set(
            this.getErrorMessage(error, 'No pudimos guardar la evaluación. Intenta nuevamente.'),
          );
        },
      });
  }

  cancel(): void {
    this.navigateToReviews();
  }

  private navigateToReviews(): void {
    const classroomId = this.classroomId();

    if (classroomId) {
      this.router.navigate(['/dashboard/teacher/reviews/my-reviews', classroomId]);

      return;
    }

    this.router.navigate(['/dashboard/teacher/reviews/my-reviews']);
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

    const total = sections.reduce((sectionTotal, section) => {
      if (!section || typeof section !== 'object') {
        return sectionTotal;
      }

      const sectionScore = Object.values(section).reduce((scoreTotal, score) => {
        const numericScore = Number(score);

        return scoreTotal + (Number.isFinite(numericScore) ? numericScore : 0);
      }, 0);

      return sectionTotal + sectionScore;
    }, 0);

    this.totalScore.set(total);
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const httpError = error as {
        error?: {
          message?: string | string[];
        };
      };

      const message = httpError.error?.message;

      if (Array.isArray(message)) {
        return message.join(' ');
      }

      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    return fallback;
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
