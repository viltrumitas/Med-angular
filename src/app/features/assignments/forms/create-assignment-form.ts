import { FormGroup, FormControl, Validators } from '@angular/forms';
import { minArrayLength } from '../../../shared/validators/min-array-length';

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

    caseIds: new FormControl<string[]>([], {
      nonNullable: true,
      validators: [minArrayLength(1)], // 🔥 AQUÍ EL FIX REAL
    }),
  });
}
