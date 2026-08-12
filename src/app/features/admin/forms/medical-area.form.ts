import { FormControl, FormGroup, Validators } from "@angular/forms";

export function createMedicalAreaForm() {
  return new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    }),

    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.maxLength(250),
      ],
    }),
  });
}

export type MedicalAreaForm = ReturnType<typeof createMedicalAreaForm>;

export type MedicalAreaFormValue = ReturnType<MedicalAreaForm['getRawValue']>;