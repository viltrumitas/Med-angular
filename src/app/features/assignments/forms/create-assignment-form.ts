import { FormGroup, FormControl, Validators } from '@angular/forms';

export function createAssignmentForm() {
  return new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    description: new FormControl('', {
      nonNullable: true,
    }),

    isPublished: new FormControl(false, {
      nonNullable: true,
    }),
  });
}

export type AssignmentForm = ReturnType<typeof createAssignmentForm>;

export type AssignmentFormValue =
  ReturnType<AssignmentForm['getRawValue']>;