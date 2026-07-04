import { Component, Input } from '@angular/core';
import { DiagnosticForm } from '../../form/submission-form.factory';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../shared/components/select/select';
import { InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-diagnostic',
  imports: [ReactiveFormsModule, SelectComponent, InputComponent],
  templateUrl: './diagnostic.html',
  styleUrl: './diagnostic.scss',
})
export class Diagnostic {
  @Input({ required: true })
  group!: DiagnosticForm;

  readonly priority = [
    {
      label: 'Verde',
      value: 'GREEN',
    },
    {
      label: 'Amarillo',
      value: 'YELLOW',
    },
    {
      label: 'ROjo',
      value: 'RED',
    },
    {
      label: 'Negro',
      value: 'BLACK',
    },
  ];
}
