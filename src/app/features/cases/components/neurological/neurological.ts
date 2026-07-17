import { Component, Input } from '@angular/core';
import { NeurologicalForm } from '../../forms/case.form';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';
import { SelectComponent } from '../../../../shared/components/select/select';

@Component({
  selector: 'app-neurological',
  imports: [ReactiveFormsModule, SelectComponent],
  templateUrl: './neurological.html',
  styleUrl: './neurological.scss',
})
export class Neurological {
  @Input()
  group!: NeurologicalForm;

  readonly cincinnatiOptions = [
    {
      label: 'Normal',
      value: 'NORMAL',
    },
    {
      label: 'Anormal',
      value: 'ABNORMAL',
    },
  ];
}
