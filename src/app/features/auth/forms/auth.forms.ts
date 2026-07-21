import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createLoginForm() {
  return new FormGroup({
    matricula: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });
}

export function createRegisterForm() {
  return new FormGroup({
    matricula: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });
}
