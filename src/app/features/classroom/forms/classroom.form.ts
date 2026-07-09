import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createClassroomForm() {
  return new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),

    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
  });
}

export type ClassroomForm = ReturnType<typeof createClassroomForm>;
export type ClassroomFormValue = ReturnType<ClassroomForm['getRawValue']>;
