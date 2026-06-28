import { Component, Input } from '@angular/core';
import { MedicalAreaForm } from '../../forms/case.form';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../shared/components/select/select';

@Component({
  selector: 'app-medical-area',
  imports: [ReactiveFormsModule, SelectComponent],
  templateUrl: './medical-area.html',
  styleUrl: './medical-area.scss',
})
export class MedicalArea {
  @Input({ required: true })
  group!: MedicalAreaForm;
}
