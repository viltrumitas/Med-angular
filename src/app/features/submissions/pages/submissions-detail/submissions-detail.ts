import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubmissionApi } from '../../service/submission-api.service';
import { createSubmissionForm } from '../../form/submission-form.factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SubmissionResponseDto } from '../../dto/submission-response.dto';
import { toUpdateSubmissionDto } from '../../mappers/submission-update.mapper';
import { Priority } from '../../../../core/enum/priority.enum';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { Clinical } from '../../components/clinical/clinical';
import { Diagnostic } from '../../components/diagnostic/diagnostic';
import { Treatment } from '../../components/treatment/treatment';
import { SubmissionStatus } from '../../../../core/models/submission-status.enum';
import { mapSubmissionFormValue } from '../../mappers/submission-form.mapper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-submissions-detail',
  imports: [ReactiveFormsModule, ButtonComponent, Clinical, Diagnostic, Treatment],
  templateUrl: './submissions-detail.html',
  styleUrl: './submissions-detail.scss',
})
export class SubmissionsDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(SubmissionApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly submissionId = this.route.snapshot.paramMap.get('id');

  readonly isReadonly = computed(() => this.submissions()?.status !== SubmissionStatus.DRAFT);
  readonly statusLabels: Record<SubmissionStatus, string> = {
    DRAFT: 'Borrador',
    SUBMITTED: 'Enviado',
    REVIEWED: 'Revisado',
  };

  submissions = signal<SubmissionResponseDto | null>(null);
  isLoading = signal(false);
  isSaving = signal(false);
  isSubmitting = signal(false);
  loadError = signal<string | null>(null);
  saveError = signal<string | null>(null);

  form = createSubmissionForm();
  Priority = Priority;

  ngOnInit(): void {
    if (!this.submissionId) return;

    this.isLoading.set(true);
    this.api
      .findOne(this.submissionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (respose) => {
          this.submissions.set(respose);
          this.form.patchValue(mapSubmissionFormValue(respose));
          if (!this.isReadonly()) {
            this.form.disable;
          }
          this.isLoading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.error('[SubmissionDetail] Error al cargar:', err);
          this.loadError.set('No se pudo cargar la submission');
          this.isLoading.set(false);
        },
      });
  }

  save(): void {
    if (!this.submissionId) return;

    this.isSaving.set(true);
    this.saveError.set(null);
    const dto = toUpdateSubmissionDto(this.form.getRawValue());

    this.api
      .update(this.submissionId, dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.submissions.set(res);
          this.isSaving.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.error('[SubmissionDetail] Error al guardar:', err);
          this.saveError.set(err.error?.message ?? 'No se pudo guardar la submission');
          this.isSaving.set(false);
        },
      });
  }

  submit(): void {
    if (!this.submissionId) return;

    this.isSubmitting.set(true);
    this.saveError.set(null);

    this.api
      .submit(this.submissionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.submissions.set(res);
          this.form.disable;
          this.isSubmitting.set(false);
        },
        error: (err: HttpErrorResponse) => {
          console.error('[SubmissionDetail] Error al enviar:', err);
          this.saveError.set(err.error?.message ?? 'No se pudo enviar la submission');
          this.isSubmitting.set(false);
        },
      });
  }
}
