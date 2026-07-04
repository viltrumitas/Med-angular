import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubmissionApi } from '../../service/submission-api.service';
import { createSubmissionForm } from '../../form/submission-form.factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SubmissionResponseDto } from '../../dto/submission-response.dto';
import { SubmissionMapper } from '../../mappers/submission.mapper';
import { Priority } from '../../../../core/enum/priority.enum';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { Clinical } from '../../components/clinical/clinical';
import { Diagnostic } from '../../components/diagnostic/diagnostic';
import { Treatment } from '../../components/treatment/treatment';

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

  submissions = signal<SubmissionResponseDto | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  Priority = Priority;

  form = createSubmissionForm();
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[SubmissionDetail] Id extraido de la ruta:', id);
    if (!id) return;

    this.isLoading.set(true);

    this.api
      .findOne(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (respose) => {
          this.submissions.set(respose);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('[SubmissionDetail] Error: ', err);
          this.error.set('No se pudo cargar la submission');
          this.isLoading.set(false);
        },
      });
  }

  save(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const formValue = this.form.getRawValue();

    this.api
      .update(id, SubmissionMapper(formValue))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.submissions.set(res);
        },
        error: (err) => {
          console.error('[SubmissionDetail] Error update:', err);
          this.error.set('No se pudo guardar el submission');
        },
      });
  }

  submit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.api
      .submit(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.submissions.set(res);
        },
        error: (err) => {
          console.error('[SubmissionDetail] Error submit:', err);
          this.error.set('No se pudo enviar el submission');
        },
      });
  }
}
