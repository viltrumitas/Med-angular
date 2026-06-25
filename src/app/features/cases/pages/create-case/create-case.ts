import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralSection } from '../../components/general-section/general-section';
import { createCaseForm } from '../../forms/case.form';
import { PatientSection } from '../../components/patient-section/patient-section';
import { Findings } from '../../components/findings/findings';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { VitalSigns } from '../../components/vital-signs/vital-signs';
import { Neurological } from '../../components/neurological/neurological';
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
    VitalSigns,
    Neurological,
    Feedback,
  ],
  templateUrl: './create-case.html',
  styleUrl: './create-case.scss',
})
export class CreateCase {
  caseForm = createCaseForm();
  caseService = inject(CasesApi);
  createdCaseId: string | null = null;
  submitCase() {
    if (this.caseForm.invalid) {
      this.caseForm.markAllAsTouched();
      return;
    }
    const data = mapCreateCase(this.caseForm.getRawValue());
    console.log('enviado', data);

    this.caseService.createCase(data).subscribe({
      next: (res: any) => {
        console.log('Caso Creado', res);
        this.createdCaseId = res.id;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  publishCase() {
    if (!this.createdCaseId) {
      console.warn('Primero debes crear el caso');
      return;
    }

    this.caseService.publishCase(this.createdCaseId).subscribe({
      next: () => {
        console.log('Caso publicado correctamente');
      },
      error: (err) => {
        console.log('Error al publicar', err);
      }
    })
  }
}
