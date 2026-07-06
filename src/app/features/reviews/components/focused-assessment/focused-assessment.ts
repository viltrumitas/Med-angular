import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { FocusedAssessmentForm } from '../../forms/review.form';
@Component({
  selector: 'app-focused-assessment',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './focused-assessment.html',
  styleUrl: './focused-assessment.scss',
})
export class FocusedAssessment {
  @Input({ required: true })
  group!: FocusedAssessmentForm;
}
