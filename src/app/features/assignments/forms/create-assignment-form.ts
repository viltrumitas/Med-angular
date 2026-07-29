import { FormGroup, FormControl, Validators } from '@angular/forms';
import { minArrayLength } from '../../../shared/validators/min-array-length';
import { LateSubmissionPolicy } from '../../../core/enum/late-submission-policy';

export function createAssignmentForm() {
  return new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    description: new FormControl('', {
      nonNullable: true,
    }),

    caseIds: new FormControl<string[]>([], {
      nonNullable: true,
      validators: [minArrayLength(1)],
    }),

    hasDueDate: new FormControl(false, {
      nonNullable: true,
    }),

    dueDate: new FormControl<string | null>(null),

    lateSubmissionPolicy: new FormControl<LateSubmissionPolicy>(
      LateSubmissionPolicy.ACCEPT_LATE,
      {
        nonNullable: true,
      }
    )
  });
}
