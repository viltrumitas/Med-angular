import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { createAssignmentForm } from '../../forms/create-assignment-form'; 
import { mapCreateAssignment } from '../../mappers/create-assignment.mapper';
import { AssignmentApi } from '../../services/assignment-api';
import { InputComponent } from "../../../../shared/components/input/input";
import { TextareaComponent } from "../../../../shared/components/text-area/text-area";
import { ButtonComponent } from "../../../../shared/components/button/button";

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

  assignmentService = inject(AssignmentApi);

  createdAssignmentId: string | null = null;

  submitAssignment() {
    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    const data = mapCreateAssignment(
      this.assignmentForm.getRawValue(),
    );

    console.log('Enviado', data);

    this.assignmentService.create(data).subscribe({
      next: (assignment) => {
        console.log('Actividad creada', assignment);

        this.createdAssignmentId = assignment.id;
      },

      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  publishAssignment() {
    if (!this.createdAssignmentId) {
      console.warn('Primero debes crear la actividad');
      return;
    }

    this.assignmentService
      .publish(this.createdAssignmentId)
      .subscribe({
        next: (assignment) => {
          console.log('Actividad publicada', assignment);
        },

        error: (err) => {
          console.log('Error al publicar', err);
        },
      });
  }
}