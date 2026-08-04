import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MedicalAreaForm } from '../../forms/case.form';
import { SelectComponent } from '../../../../shared/components/select/select';

import { MedicalAreaResponseDto } from '../../../medical-areas/dto/medical-area-response.dto';

@Component({
  selector: 'app-medical-area',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl: './medical-area.html',
  styleUrl: './medical-area.scss',
})
export class MedicalArea {

  readonly group = input.required<MedicalAreaForm>();

  readonly areas = input.required<MedicalAreaResponseDto[]>();

  readonly areaOptions = computed(() =>
    this.areas().map(area => ({
      label: area.name,
      value: area.id,
    }))
  );


}