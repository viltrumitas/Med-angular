import { Component, input } from '@angular/core';
import { TreatmentForm } from '../../form/submission-form.factory';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';
import { InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-treatment',
  imports: [FormsModule, ReactiveFormsModule, TextareaComponent, InputComponent],
  templateUrl: './treatment.html',
  styleUrl: './treatment.scss',
})
export class Treatment {
  group = input.required<TreatmentForm>();
}
