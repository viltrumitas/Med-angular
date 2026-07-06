import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { OtherInterventionsForm } from '../../forms/review.form';

@Component({
  selector: 'app-other-interventions',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './other-interventions.html',
  styleUrl: './other-interventions.scss',
})
export class OtherInterventions {
  @Input({ required: true })
  group!: OtherInterventionsForm;
}
