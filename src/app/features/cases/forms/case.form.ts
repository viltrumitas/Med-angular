import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Gender } from '../models/patient.model';

export function createCaseForm() {
  return new FormGroup({
    general: new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),

      consult: new FormControl('', {
        nonNullable: true,
      }),

      scenery: new FormControl('', {
        nonNullable: true,
      }),
    }),

    patient: new FormGroup({
      patientName: new FormControl('', {
        nonNullable: true,
      }),

      gender: new FormControl<Gender>('OTHER', {
        nonNullable: true,
        validators: [Validators.required],
      }),

      age: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),

      medicalHistory: new FormControl<string>(''),

      medications: new FormControl(''),
    }),

    findings: new FormGroup({
      generalFindings: new FormControl('', {
        nonNullable: true,
      }),
    }),

    vitalSigns: new FormGroup({
      ta: new FormControl(''),
      fc: new FormControl<number | null>(null),
      fr: new FormControl<number | null>(null),
      spo2: new FormControl<number | null>(null),
      glucose: new FormControl<number | null>(null),
      temperature: new FormControl<number | null>(null),
      capillaryFiller: new FormControl<number | null>(null),
    }),

    neurological: new FormGroup({
      cincinnati: new FormGroup({
        facialDroop: new FormControl<'NORMAL' | 'ABNORMAL' | null>(null),
        armDrift: new FormControl<'NORMAL' | 'ABNORMAL' | null>(null),
        speech: new FormControl<'NORMAL' | 'ABNORMAL' | null>(null),
      }),

      glasgow: new FormControl<number | null>(null),
    }),

    publishCase: new FormGroup({
      isPublished: new FormControl<boolean>(false, {
        nonNullable: true,
      }),
    }),

    feedback: new FormControl(''),
  });
}

export type CaseForm = ReturnType<typeof createCaseForm>;

export type GeneralForm = CaseForm['controls']['general'];
export type PatientForm = CaseForm['controls']['patient'];
export type FindingsForm = CaseForm['controls']['findings'];
export type VitalSignsForm = CaseForm['controls']['vitalSigns'];
export type NeurologicalForm = CaseForm['controls']['neurological'];
export type PublishCaseForm = CaseForm['controls']['publishCase'];

export type CaseFormValue = ReturnType<CaseForm['getRawValue']>;
