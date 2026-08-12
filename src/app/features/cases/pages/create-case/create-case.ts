import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
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
import { createIcons, icons } from 'lucide';
import { MedicalAreaApi } from '../../../admin/services/medical-area-api.service';
import { MedicalAreaResponseDto } from '../../../admin/pages/medical-areas/dto/medical-area-response.dto';

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
export class CreateCase implements OnInit, AfterViewInit {
  private readonly caseService = inject(CasesApi);
  private readonly router = inject(Router);
  private medicalAreaService = inject(MedicalAreaApi);

  // signal para medical area
  medicalAreas = signal<MedicalAreaResponseDto[]>([]);

  readonly caseForm = createCaseForm();

  ngAfterViewInit(): void {
    createIcons({ icons });
  }

  ngOnInit() {
    this.loadMedicalAreas();
  }
 
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
        this.router.navigate(['/dashboard/teacher/cases']);
      },
      error: (err) => {
        console.log('[CreateCase] Error al crear el caso', err);
      },
    });
  }

  loadMedicalAreas() {
    this.medicalAreaService.findALl().subscribe({
      next: (areas) => {
        this.medicalAreas.set(areas);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/dashboard/teacher/cases']);
  }
}
