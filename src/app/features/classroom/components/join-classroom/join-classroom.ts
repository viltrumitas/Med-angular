import { AfterViewInit, Component, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { createIcons, icons } from 'lucide';

import { ClassroomApi } from '../../service/clasroom-api.service';
import { JoinClassroomForm } from '../../forms/join-class.fom';
import { Modal } from '../../../../shared/components/modal/modal';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-join-classroom',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './join-classroom.html',
  styleUrl: './join-classroom.scss',
})
export class JoinClassroom implements AfterViewInit {
  private readonly classroomApi = inject(ClassroomApi);
  private readonly errorService = inject(ErrorService);

  readonly isOpen = input.required<boolean>();
  readonly closeRequested = output<void>();
  readonly joined = output<void>();
  readonly isSubmitting = signal(false);

  readonly form = new FormGroup<JoinClassroomForm>({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { code } = this.form.getRawValue();

    this.classroomApi.join({ code }).subscribe({
      next: () => this.handleSuccess(),
      error: (error: HttpErrorResponse) => this.handleError(error),
    });
  }

  onCancel(): void {
    this.resetForm();
    this.closeRequested.emit();
  }

  private handleSuccess(): void {
    this.isSubmitting.set(false);
    this.resetForm();
    this.joined.emit();
  }

  private handleError(error: HttpErrorResponse): void {
    this.isSubmitting.set(false);
    this.errorService.handle(error);
  }

  private resetForm(): void {
    this.form.reset();
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
