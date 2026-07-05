import { Component, input } from '@angular/core';
import { DiagnosticForm } from '../../form/submission-form.factory';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../shared/components/select/select';
import { InputComponent } from '../../../../shared/components/input/input';
import { Treatment } from '../treatment/treatment';
import { PriorityOption } from '../../models/priority-option.model';
import { Priority } from '../../../../core/enum/priority.enum';

@Component({
  selector: 'app-diagnostic',
  imports: [ReactiveFormsModule, SelectComponent, InputComponent],
  templateUrl: './diagnostic.html',
  styleUrl: './diagnostic.scss',
})
export class Diagnostic {
  group = input.required<DiagnosticForm>();

  readonly priorityOption: PriorityOption[] = [
    { label: 'Verde', value: Priority.GREEN },
    { label: 'Amarillo', value: Priority.YELLOW },
    { label: 'Rojo', value: Priority.RED },
    { label: 'Negro', value: Priority.BLACK },
  ];
}
