import { Component, inject, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { createAssignmentForm } from '../../../assignments/forms/create-assignment-form';
import { mapCreateAssignment } from '../../../assignments/mappers/create-assignment.mapper';
import { AssignmentApi } from '../../../assignments/services/assignment-api';
import { InputComponent } from "../../../../shared/components/input/input";
import { TextareaComponent } from "../../../../shared/components/text-area/text-area";
import { ButtonComponent } from "../../../../shared/components/button/button";
import { CaseResponseDto } from '../../../cases/dto/case-response.dto';
import { ClassroomApi } from '../../service/clasroom-api.service';

@Component({
  selector: 'app-assignment-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    ButtonComponent
  ],
  templateUrl: './assignment-create.html',
  styleUrl: './assignment-create.scss',
})
export class AssignmentCreate {

  assignmentForm = createAssignmentForm();

  cases: CaseResponseDto[] = [];

  assignmentService = inject(AssignmentApi);
  classroomService = inject(ClassroomApi);

  @Input({ required: true })
  classroomId!: string;

  @Output()
  created = new EventEmitter<void>();

  ngOnInit() {
    this.assignmentService.findMyPublishedCases().subscribe({
      next: (data) => {
        this.cases = data;
      },
    });
  }

  toggleCase(caseId: string) {
    const current = this.assignmentForm.getRawValue().caseIds;

    const updated = current.includes(caseId)
      ? current.filter(id => id !== caseId)
      : [...current, caseId];

    this.assignmentForm.patchValue({
      caseIds: updated,
    });
  }

  submitAssignment() {
    const value = this.assignmentForm.getRawValue();

    if (!value.caseIds || value.caseIds.length === 0) {
      console.log('Selecciona al menos un caso');
      return;
    }

    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    const dto = mapCreateAssignment(value);

    this.classroomService
      .createAssignment(this.classroomId, dto)
      .subscribe({
        next: () => {
          this.assignmentForm.reset(createAssignmentForm().getRawValue());
          this.created.emit();
        },
        error: (err) => console.error(err),
      });
  }
}