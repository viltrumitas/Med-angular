import { Component, Input } from '@angular/core';
import { TreatmentForm } from '../../form/submission-form.factory';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Teacher } from '../../../dashboard/roles/teacher/teacher';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';
import { InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-treatment',
  imports: [FormsModule, ReactiveFormsModule, TextareaComponent, InputComponent],
  templateUrl: './treatment.html',
  styleUrl: './treatment.scss',
})
export class Treatment {
  @Input({ required: true })
  group!: TreatmentForm;
}
