import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { createAssignmentForm } from '../../forms/create-assignment-form';
import { mapCreateAssignment } from '../../mappers/create-assignment.mapper';
import { AssignmentApi } from '../../services/assignment-api';
import { InputComponent } from "../../../../shared/components/input/input";
import { TextareaComponent } from "../../../../shared/components/text-area/text-area";
import { ButtonComponent } from "../../../../shared/components/button/button";
import { Router } from '@angular/router';
import { CaseResponseDto } from '../../../cases/dto/case-response.dto';

@Component({
  selector: 'app-assignment-create',
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

  private readonly router = inject(Router)

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

    const data = mapCreateAssignment(value);

    this.assignmentService.create(data).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/teacher/assignments'], {
          replaceUrl: true,
        });
      },
      error: (err) => console.log(err),
    });
  }
}