import {
  AfterViewInit,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize, startWith } from 'rxjs';
import { createIcons, icons } from 'lucide';

import { ErrorService } from '../../../../core/services/error.service';
import { InputComponent } from '../../../../shared/components/input/input';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';

import { createAssignmentForm } from '../../../assignments/forms/create-assignment-form';
import { mapCreateAssignment } from '../../../assignments/mappers/create-assignment.mapper';
import { AssignmentApi } from '../../../assignments/services/assignment-api';
import { CaseResponseDto } from '../../../cases/dto/case-response.dto';

import { ClassroomApi } from '../../service/clasroom-api.service';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-assignment-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, TextareaComponent, ButtonComponent],
  templateUrl: './assignment-create.html',
  styleUrl: './assignment-create.scss',
})
export class AssignmentCreate implements AfterViewInit {
  private readonly assignmentApi = inject(AssignmentApi);
  private readonly classroomApi = inject(ClassroomApi);
  private readonly errorService = inject(ErrorService);
  private readonly destroyRef = inject(DestroyRef);

  readonly classroomId = input.required<string>();
  readonly created = output<void>();
  readonly assignmentForm = createAssignmentForm();
  readonly cases = signal<CaseResponseDto[]>([]);
  readonly isLoadingCases = signal(false);
  readonly isSubmitting = signal(false);
  readonly casesLoadError = signal<string | null>(null);
  readonly submitError = signal<string | null>(null);

  private readonly initialFormValue = this.assignmentForm.getRawValue();

  private readonly selectedCaseIds = toSignal(
    this.assignmentForm.controls.caseIds.valueChanges.pipe(
      startWith(this.assignmentForm.controls.caseIds.value),
    ),
    {
      initialValue: this.assignmentForm.controls.caseIds.value,
    },
  );

  readonly selectedCasesCount = computed(() => this.selectedCaseIds().length);

<<<<<<< HEAD
  @Output()
  created = new EventEmitter<void>();

  // =========================
  // LIFECYCLE
  // =========================

  ngOnInit(): void {
    this.assignmentForm.controls.hasDueDate.valueChanges.subscribe(
      enabled => {
        if (!enabled) {
          this.assignmentForm.patchValue({
            dueDate: null,
            lateSubmissionPolicy:
              LateSubmissionPolicy.ACCEPT_LATE,
          });
        }
      }
    );
=======
  constructor() {
>>>>>>> d036172 (v1)
    this.loadCases();
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  toggleCase(caseId: string): void {
    if (this.isSubmitting()) {
      return;
    }

    const control = this.assignmentForm.controls.caseIds;
    const currentIds = control.value;

    const updatedIds = currentIds.includes(caseId)
      ? currentIds.filter((id) => id !== caseId)
      : [...currentIds, caseId];

    control.setValue(updatedIds);
    control.markAsTouched();
    control.markAsDirty();

    this.submitError.set(null);
    this.errorService.clear();

    this.renderIcons();
  }

  isCaseSelected(caseId: string): boolean {
    return this.selectedCaseIds().includes(caseId);
  }

  submitAssignment(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.errorService.clear();
    this.submitError.set(null);

    const caseIdsControl = this.assignmentForm.controls.caseIds;

    if (caseIdsControl.value.length === 0) {
      caseIdsControl.markAsTouched();

      this.submitError.set('Selecciona al menos un caso clínico para crear la actividad.');

      return;
    }

    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    const dto = mapCreateAssignment(this.assignmentForm.getRawValue());

    this.isSubmitting.set(true);
    this.assignmentForm.disable();

    this.classroomApi
      .createAssignment(this.classroomId(), dto)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSubmitting.set(false);
          this.assignmentForm.enable();
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.resetForm();
          this.created.emit();
        },
        error: () => {
          this.submitError.set(
            'No pudimos crear la actividad. Revisa la información e intenta nuevamente.',
          );
        },
      });
  }

  loadCases(): void {
    if (this.isLoadingCases()) {
      return;
    }

    this.errorService.clear();
    this.casesLoadError.set(null);
    this.isLoadingCases.set(true);

    this.assignmentApi
      .findMyPublishedCases()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoadingCases.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (cases) => {
          this.cases.set(cases);
        },
        error: () => {
          this.cases.set([]);

          this.casesLoadError.set('No pudimos cargar tus casos publicados. Intenta nuevamente.');
        },
      });
  }

  private resetForm(): void {
    this.assignmentForm.reset(this.initialFormValue);

    this.assignmentForm.markAsPristine();
    this.assignmentForm.markAsUntouched();

    this.submitError.set(null);
  }

  private renderIcons(): void {
    queueMicrotask(() => {
      createIcons({ icons });
    });
  }
}
