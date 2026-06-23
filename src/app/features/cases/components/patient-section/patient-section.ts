import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-section',
  imports: [],
  templateUrl: './patient-section.html',
  styleUrl: './patient-section.scss',
})
export class PatientSection {
  @Input({ required: true }) group!: FormGroup<{
    patientName: FormControl<string>;
    gender: FormControl<'MALE' | 'FEMALE' | 'OTHER' | null>;
    age: FormControl<number | string>;
    medicalHistory: FormControl<string[]>;
    medications: FormControl<string>;
  }>;
}
