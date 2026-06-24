import { Component, Input } from '@angular/core';
import { NeurologicalForm } from '../../forms/case.form';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-neurological',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './neurological.html',
  styleUrl: './neurological.scss',
})
export class Neurological {
  @Input()
  group!: NeurologicalForm;
}
