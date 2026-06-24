import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientForm } from '../../forms/case.form';
import { InputComponent } from '../../../../shared/components/input/input';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-patient-section',
  imports: [ReactiveFormsModule, InputComponent, TextareaComponent],
  templateUrl: './patient-section.html',
  styleUrl: './patient-section.scss',
})
export class PatientSection {
  @Input({ required: true })
  group!: PatientForm;
}
