import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { createIcons, icons } from 'lucide';

import { ClassroomApi } from '../../service/clasroom-api.service';
import { ClassroomModel } from '../../models/classroom.model';
import { JoinClassroomForm } from '../../forms/join-class.fom';
import { Modal } from '../../../../shared/components/modal/modal';
import { ClassroomStudentModel } from '../../models/classroom-student.model';

@Component({
  selector: 'app-join-classroom',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './join-classroom.html',
  styleUrl: './join-classroom.scss',
})
export class JoinClassroom {
  private readonly classroomApi = inject(ClassroomApi);

  readonly isOpen = input.required<boolean>();

  readonly closeRequested = output<void>();
  readonly joined = output<ClassroomStudentModel>();

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = new FormGroup<JoinClassroomForm>({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.renderIcons();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    const { code } = this.form.getRawValue();

    console.log('Código enviado:', code);

    this.classroomApi.join({ code }).subscribe({
      next: (classroom) => {
        console.log('Respuesta join:', classroom);

        this.handleSuccess(classroom);
      },

      error: (error: HttpErrorResponse) => {
        console.log('Error join:', error);

        this.handleError(error);
      },
    });
  }

  onCancel(): void {
    this.resetForm();
    this.closeRequested.emit();
  }

  private handleSuccess(classroom: ClassroomStudentModel): void {
    this.isSubmitting.set(false);
    this.resetForm();
    this.joined.emit(classroom);
  }

  private handleError(error: HttpErrorResponse): void {
    this.isSubmitting.set(false);
    this.errorMessage.set(this.mapError(error));
  }

  private mapError(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return 'No existe ningún salón con ese código.';
    }

    if (error.status === 409) {
      return 'Ya estás inscrito en este salón.';
    }

    if (typeof error.error?.message === 'string') {
      return error.error.message;
    }

    return 'Ocurrió un error al unirte al salón. Intenta de nuevo.';
  }

  private resetForm(): void {
    this.form.reset();
    this.errorMessage.set(null);
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
