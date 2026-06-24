import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralSection } from '../../components/general-section/general-section';
import { createCaseForm } from '../../forms/case.form';
import { PatientSection } from '../../components/patient-section/patient-section';
import { Findings } from '../../components/findings/findings';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { VitalSigns } from '../../components/vital-signs/vital-signs';

@Component({
  selector: 'app-create-case',
  imports: [
    ReactiveFormsModule,
    GeneralSection,
    PatientSection,
    Findings,
    ButtonComponent,
    VitalSigns,
  ],
  templateUrl: './create-case.html',
  styleUrl: './create-case.scss',
})
export class CreateCase {
  caseForm = createCaseForm();

  submitCase() {
    if (this.caseForm.invalid) {
      this.caseForm.markAllAsTouched();
      return;
    }

    const data = this.caseForm.value;

    console.log(data);

    // aquí después:
    // this.caseService.createCase(data)
  }
}
