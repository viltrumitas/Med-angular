import { AfterViewInit, Component, DestroyRef, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { ErrorService } from '../../../../../core/services/error.service';

import { ButtonComponent } from '../../../../../shared/components/button/button';
import { InputComponent } from '../../../../../shared/components/input/input';

import { createClassroomForm } from '../../../forms/classroom.form';
import { mapCreateClassroom } from '../../../mappers/map-clasroom.mapper';
import { ClassroomApi } from '../../../service/clasroom-api.service';
import { TextareaComponent } from '../../../../../shared/components/text-area/text-area';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, TextareaComponent],
  templateUrl: './create-classroom.html',
  styleUrl: './create-classroom.scss',
})
export class CreateClassroom implements AfterViewInit {
  private readonly api = inject(ClassroomApi);
  private readonly errorService = inject(ErrorService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = createClassroomForm();
  readonly loading = signal(false);
  readonly created = output<void>();
  readonly cancelled = output<void>();

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  submit(): void {
    if (this.loading()) {
      return;
    }

    this.errorService.clear();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = mapCreateClassroom(this.form.getRawValue());

    this.loading.set(true);
    this.form.disable();

    this.api
      .create(dto)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.form.enable();
        }),
      )
      .subscribe({
        next: () => {
          this.created.emit();
        },
        error: () => {},
      });
  }

  cancel(): void {
    if (this.loading()) {
      return;
    }

    this.errorService.clear();
    this.cancelled.emit();
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
