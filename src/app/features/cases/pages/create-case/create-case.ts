import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralSection } from '../../components/general-section/general-section';
import { createCaseForm } from '../../forms/case.form';
import { PatientSection } from '../../components/patient-section/patient-section';
import { Findings } from '../../components/findings/findings';
import { VitalSigns } from '../../components/vital-signs/vital-signs';
import { Neurological } from '../../components/neurological/neurological';
import { Feedback } from '../../components/feedback/feedback';
import { CasesApi } from '../../services/cases-api.service';
import { mapCreateCase } from '../../mappers/create-case.mapper';
import { MedicalArea } from '../../components/medical-area/medical-area';
import { Router } from '@angular/router';

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
    MedicalArea,
  ],
  templateUrl: './create-case.html',
  styleUrl: './create-case.scss',
})
export class CreateCase {
  caseForm = createCaseForm();

  private readonly caseService = inject(CasesApi);
  private readonly reouter = inject(Router);

  private createdCaseId: string | null = null;

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
        this.reouter.navigate(['/dashboard/teacher/cases']);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
