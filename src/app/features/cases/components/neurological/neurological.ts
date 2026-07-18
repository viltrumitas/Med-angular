import { Component, Input } from '@angular/core';
import { NeurologicalForm } from '../../forms/case.form';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../shared/components/select/select';
import { Checkbox } from '../../../../shared/components/checkbox/checkbox';

@Component({
  selector: 'app-neurological',
  imports: [ReactiveFormsModule, SelectComponent, Checkbox],
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

  ocularOption = [
    { label: '4 : Espontánea', value: 4 },
    { label: '3 : Estímulo verbal', value: 3 },
    { label: '2 : Al dolor', value: 2 },
    { label: '1 : Nula', value: 1 },
  ];

  verbalOption = [
    { label: '5 : Orientado', value: 5 },
    { label: '4 : Desorientado', value: 4 },
    { label: '3 : Palabras Inapropiadas', value: 3 },
    { label: '2 : Sonidos Incomprensibles', value: 2 },
    { label: '1 : Nula', value: 1 },
  ];

  motorOption = [
    { label: '6 : Obedece Ordenes', value: 6 },
    { label: '5 : Localiza el dolor', value: 5 },
    { label: '4 : Retirada al dolor', value: 4 },
    { label: '3 : Reflejo Flexor', value: 3 },
    { label: '2 : Reflejo Extensor', value: 2 },
    { label: '1 : Nulo', value: 1 },
  ];
}
