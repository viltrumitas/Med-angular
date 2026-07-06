import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { PatientPriorityForm } from '../../forms/review.form';

@Component({
  selector: 'app-patient-priority',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './patient-priority.html',
  styleUrl: './patient-priority.scss',
})
export class PatientPriority {
  @Input({ required: true })
  group!: PatientPriorityForm;
}
