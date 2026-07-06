import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { PrimaryAssessmentForm } from '../../forms/review.form';
@Component({
  selector: 'app-primary-assessment',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './primary-assessment.html',
  styleUrl: './primary-assessment.scss',
})
export class PrimaryAssessment {
  @Input({ required: true })
  group!: PrimaryAssessmentForm;
}
