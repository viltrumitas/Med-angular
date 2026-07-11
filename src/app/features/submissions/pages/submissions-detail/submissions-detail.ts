import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SubmissionApi } from '../../service/submission-api.service';
import { createSubmissionForm } from '../../form/submission-form.factory';
import { SubmissionResponseDto } from '../../dto/submission-response.dto';

import { toUpdateSubmissionDto } from '../../mappers/submission-update.mapper';
import { mapSubmissionFormValue } from '../../mappers/submission-form.mapper';

import { Priority } from '../../../../core/enum/priority.enum';
import { SubmissionStatus } from '../../../../core/models/submission-status.enum';

import { Clinical } from '../../components/clinical/clinical';
import { Diagnostic } from '../../components/diagnostic/diagnostic';
import { Treatment } from '../../components/treatment/treatment';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-submissions-detail',
  imports: [ReactiveFormsModule, Clinical, Diagnostic, Treatment],
  templateUrl: './submissions-detail.html',
  styleUrl: './submissions-detail.scss',
})
export class SubmissionsDetail implements OnInit, AfterViewInit {
  private readonly api = inject(SubmissionApi);
  private readonly destroyRef = inject(DestroyRef);

  readonly submissionId = input.required<string>();
  readonly submissions = signal<SubmissionResponseDto | null>(null);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly isSubmitting = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);
  readonly form = createSubmissionForm();
  readonly isReadonly = computed(() => this.submissions()?.status !== SubmissionStatus.DRAFT);
  readonly statusLabels: Record<SubmissionStatus, string> = {
    DRAFT: 'Borrador',
    SUBMITTED: 'Enviado',
    REVIEWED: 'Revisado',
  };

  ngOnInit(): void {
    this.loadSubmission();
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  save(): void {
    const submissionId = this.submissionId();
    if (this.isReadonly() || this.isSaving() || this.isSubmitting()) {
      return;
    }

    this.isSaving.set(true);
    this.saveError.set(null);

    const dto = toUpdateSubmissionDto(this.form.getRawValue());

    this.api
      .update(submissionId, dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.submissions.set(response);
          this.isSaving.set(false);
          this.renderIcon();
        },
        error: (err: HttpErrorResponse) => {
          console.error('[SubmissionDetail] Error al guardar:', err);
          this.saveError.set(err.error?.message ?? 'No se pudo guardar la submission');
          this.isSaving.set(false);
          this.renderIcon();
        },
      });
  }

  submit(): void {
    const submissionId = this.submissionId();

    if (this.isReadonly() || this.isSaving() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.saveError.set(null);

    this.api
      .submit(submissionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.submissions.set(response);
          this.form.disable();
          this.isSubmitting.set(false);
          this.renderIcon();
        },
        error: (err: HttpErrorResponse) => {
          console.error('[SubmissionDetail] Error al enviar:', err);
          this.saveError.set(err.error?.message ?? 'No se pudo enviar la submission');
          this.isSubmitting.set(false);
          this.renderIcon();
        },
      });
  }

  private loadSubmission(): void {
    const submissionId = this.submissionId();

    this.isLoading.set(true);
    this.loadError.set(null);

    this.api
      .findOne(submissionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.submissions.set(response);
          this.form.patchValue(mapSubmissionFormValue(response));
          if (this.isReadonly()) {
            this.form.disable();
          } else {
            this.form.enable();
          }

          this.isLoading.set(false);
          this.renderIcon();
        },
        error: (err: HttpErrorResponse) => {
          console.error('[SubmissionDetail] Error al cargar:', err);

          this.loadError.set('No se pudo cargar la submission');

          this.isLoading.set(false);
        },
      });
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
