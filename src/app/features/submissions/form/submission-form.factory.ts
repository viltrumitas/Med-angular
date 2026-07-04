import { FormControl, FormGroup } from '@angular/forms';
import { Priority } from '../../../core/enum/priority.enum';

export function createSubmissionForm() {
  return new FormGroup({
    clinical: new FormGroup({
      scenaryManagnment: new FormControl('', {
        nonNullable: true,
      }),
      sss: new FormControl('', {
        nonNullable: true,
      }),
      primaryTest: new FormControl('', {
        nonNullable: true,
      }),
      sample: new FormControl('', {
        nonNullable: true,
      }),
      opqrst: new FormControl('', {
        nonNullable: true,
      }),
    }),

    diagnostic: new FormGroup({
      presumptiveDiagnosis: new FormControl('', { nonNullable: true }),
      priority: new FormControl<Priority | null>(null),
    }),

    treatment: new FormGroup({
      transferDecision: new FormControl(false, { nonNullable: true }),
      treatmentPlan: new FormControl('', { nonNullable: true }),
      reportPatient: new FormControl('', { nonNullable: true }),
    }),
  });
}

export type SubmissionForm = ReturnType<typeof createSubmissionForm>;
export type SubmissionFormValue = ReturnType<SubmissionForm['getRawValue']>;

export type ClinicalForm = SubmissionForm['controls']['clinical'];
export type DiagnosticForm = SubmissionForm['controls']['diagnostic'];
export type TreatmentForm = SubmissionForm['controls']['treatment'];
