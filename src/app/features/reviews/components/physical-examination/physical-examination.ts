import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { PhysicalExaminationForm } from '../../forms/review.form';

@Component({
  selector: 'app-physical-examination',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './physical-examination.html',
  styleUrl: './physical-examination.scss',
})
export class PhysicalExamination {
  @Input({ required: true })
  group!: PhysicalExaminationForm;
}
