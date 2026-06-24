import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralSection } from '../../components/general-section/general-section';
import { createCaseForm } from '../../forms/case.form';
import { PatientSection } from '../../components/patient-section/patient-section';
import { Findings } from '../../components/findings/findings';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { VitalSigns } from '../../components/vital-signs/vital-signs';
import { Neurological } from '../../components/neurological/neurological';
import { PublishCase } from '../../components/publish-case/publish-case';
import { Feedback } from '../../components/feedback/feedback';
import { CasesApi } from '../../services/cases-api';
import { mapCreateCase } from '../../mappers/create-case.mapper';

@Component({
  selector: 'app-create-case',
  imports: [
    ReactiveFormsModule,
    GeneralSection,
    PatientSection,
    Findings,
    ButtonComponent,
    VitalSigns,
    Neurological,
    PublishCase,
    Feedback,
  ],
  templateUrl: './create-case.html',
  styleUrl: './create-case.scss',
})
export class CreateCase {
  caseForm = createCaseForm();
  caseService = inject(CasesApi);

  submitCase() {
    if (this.caseForm.invalid) {
      this.caseForm.markAllAsTouched();
      return;
    }
    const data = mapCreateCase(this.caseForm.getRawValue());
    console.log('enviado', data);

    this.caseService.createCase(data).subscribe({
      next: (res) => {
        console.log('Caso Creado', res);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
