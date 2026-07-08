import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { createIcons, icons } from 'lucide';

import { createAssignmentForm } from '../../../assignments/forms/create-assignment-form';
import { mapCreateAssignment } from '../../../assignments/mappers/create-assignment.mapper';
import { AssignmentApi } from '../../../assignments/services/assignment-api';

import { CaseResponseDto } from '../../../cases/dto/case-response.dto';

import { ClassroomApi } from '../../service/clasroom-api.service';

import { InputComponent } from '../../../../shared/components/input/input';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-assignment-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, TextareaComponent],
  templateUrl: './assignment-create.html',
  styleUrl: './assignment-create.scss',
})
export class AssignmentCreate implements OnInit, AfterViewInit {
  private readonly assignmentService = inject(AssignmentApi);
  private readonly classroomService = inject(ClassroomApi);

  assignmentForm = createAssignmentForm();

  cases: CaseResponseDto[] = [];

  isLoadingCases = signal(false);
  isSubmitting = signal(false);

  @Input({ required: true })
  classroomId!: string;

  @Output()
  created = new EventEmitter<void>();

  // =========================
  // LIFECYCLE
  // =========================

  ngOnInit(): void {
    this.loadCases();
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  // =========================
  // CASES
  // =========================

  toggleCase(caseId: string): void {
    const current = this.assignmentForm.controls.caseIds.value;

    const updated = current.includes(caseId)
      ? current.filter((id) => id !== caseId)
      : [...current, caseId];

    this.assignmentForm.controls.caseIds.setValue(updated);

    this.renderIcons();
  }

  selectedCasesCount(): number {
    return this.assignmentForm.controls.caseIds.value.length;
  }

  isCaseSelected(caseId: string): boolean {
    return this.assignmentForm.controls.caseIds.value.includes(caseId);
  }

  // =========================
  // SUBMIT
  // =========================

  submitAssignment(): void {
    if (this.isSubmitting()) {
      return;
    }

    const value = this.assignmentForm.getRawValue();

    if (value.caseIds.length === 0) {
      return;
    }

    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();

      return;
    }

    const dto = mapCreateAssignment(value);

    this.isSubmitting.set(true);

    this.classroomService.createAssignment(this.classroomId, dto).subscribe({
      next: () => {
        this.assignmentForm.reset(createAssignmentForm().getRawValue());

        this.isSubmitting.set(false);

        this.created.emit();
      },

      error: (err) => {
        console.error('[AssignmentCreate] Error al crear actividad:', err);

        this.isSubmitting.set(false);
      },
    });
  }

  // =========================
  // API
  // =========================

  private loadCases(): void {
    this.isLoadingCases.set(true);

    this.assignmentService.findMyPublishedCases().subscribe({
      next: (data) => {
        this.cases = data;

        this.isLoadingCases.set(false);

        this.renderIcons();
      },

      error: (err) => {
        console.error('[AssignmentCreate] Error al cargar casos:', err);

        this.isLoadingCases.set(false);
      },
    });
  }

  // =========================
  // LUCIDE
  // =========================

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
