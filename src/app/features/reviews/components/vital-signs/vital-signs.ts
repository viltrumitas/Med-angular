import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { VitalSignsForm } from '../../forms/review.form';

@Component({
  selector: 'app-vital-signs',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './vital-signs.html',
  styleUrl: './vital-signs.scss',
})
export class VitalSigns {
  @Input({ required: true })
  group!: VitalSignsForm;
}
