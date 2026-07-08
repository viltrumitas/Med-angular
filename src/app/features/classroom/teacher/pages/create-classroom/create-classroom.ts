import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createClassroomForm } from '../../../forms/classroom.form';
import { mapCreateClassroom } from '../../../mappers/map-clasroom.mapper';
import { ClassroomApi } from '../../../service/clasroom-api.service';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-classroom.html',
  styleUrl: './create-classroom.scss',
})
export class CreateClassroom {
  private readonly api = inject(ClassroomApi);
  private readonly router = inject(Router);

  readonly form = createClassroomForm();
  readonly loading = signal(false);

  created = output<void>();
  cancelled = output<void>();

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const dto = mapCreateClassroom(this.form.getRawValue());

    this.api.create(dto).subscribe({
      next: () => {
        this.created.emit();
        this.router.navigate(['/dashboard/teacher/classroom']);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
