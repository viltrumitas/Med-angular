import { FormControl, FormGroup, Validators } from "@angular/forms";

import { UserRole } from "../../../core/enum/user-role.enum";

export function createAuthorizedUserForm() {
  return new FormGroup({
    matricula: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
      ],
    }),

    firstName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),

    lastName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),

    role: new FormControl<UserRole>(UserRole.TEACHER, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}

export type AuthorizedUserForm = ReturnType<typeof createAuthorizedUserForm>;

export type AuthorizedUserFormValue = ReturnType<AuthorizedUserForm['getRawValue']>;