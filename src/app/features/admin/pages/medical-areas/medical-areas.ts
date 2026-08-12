import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { createIcons, icons } from 'lucide';

import { MedicalAreaApi } from '../../services/medical-area-api.service';
import { MedicalAreaResponseDto } from './dto/medical-area-response.dto';
import { MedicalAreaFormComponent } from '../../components/medical-area-form/medical-area-form';

import { ErrorService } from '../../../../core/services/error.service';
import { createMedicalAreaForm } from '../../forms/medical-area.form';
import { finalize } from 'rxjs';
import { UpdateMedicalAreaDto } from './dto/update-medical-area.dto';

@Component({
  selector: 'app-medical-areas',
  standalone: true,
  imports: [MedicalAreaFormComponent,],
  templateUrl: './medical-areas.html',
  styleUrl: './medical-areas.scss',
})
export class MedicalAreas implements OnInit {
  private readonly medicalAreaApi = inject(MedicalAreaApi);
  private readonly errorService = inject(ErrorService);

  readonly medicalAreaForm = createMedicalAreaForm();

  readonly medicalAreas = signal<MedicalAreaResponseDto[]>([]);

  readonly loading = signal(true);

  readonly search = signal('');

  readonly createOpen = signal(false);

  readonly submitting = signal(false);

  readonly selectedArea = signal<MedicalAreaResponseDto | null>(null);

  readonly filteredAreas = computed(() => {
    const value = this.search().toLowerCase().trim();

    if (!value) {
      return this.medicalAreas();
    }

    return this.medicalAreas().filter((area) =>
      area.name.toLowerCase().includes(value),
    );
  });

  ngOnInit(): void {
    this.loadMedicalAreas();
  }

  updateSearch(value: string): void {
    this.search.set(value);
  }

  loadMedicalAreas(): void {
    this.loading.set(true);

    this.errorService.clear();

    this.medicalAreaApi.findALl().subscribe({
      next: (areas) => {
        this.medicalAreas.set(areas);

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.renderIcons();
      },
    });
  }

  createMedicalArea(): void {
    if (this.medicalAreaForm.invalid) {
      this.medicalAreaForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.errorService.clear();

    const dto = this.medicalAreaForm.getRawValue();

    this.medicalAreaApi
      .create(dto)
      .pipe(
        finalize(() => {
          this.submitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.closeCreateModal();
          this.loadMedicalAreas();
        },
      });
  }

  // edit area
  updateMedicalArea(): void {
    if (this.medicalAreaForm.invalid) {
      this.medicalAreaForm.markAllAsTouched();
      return;
    }

    const area = this.selectedArea();

    if (!area) {
      return;
    }

    this.submitting.set(true);

    const value = this.medicalAreaForm.getRawValue();

    const dto: UpdateMedicalAreaDto = {
      name: value.name,
      description: value.description.trim() === '' ? null : value.description,
    };

    this.medicalAreaApi
      .update(area.id, dto)
      .pipe(
        finalize(() => {
          this.submitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.loadMedicalAreas();
          this.closeCreateModal();
        },
      });
  }

  // remove area
  deleteMedicalArea(id: string): void {
    const confirmDelete = confirm(
      '¿Eliminar esta área médica?',
    );

    if (!confirmDelete) {
      return;
    }

    this.errorService.clear();

    this.medicalAreaApi.remove(id).subscribe({
      next: () => {
        this.loadMedicalAreas();
      },
    });
  }

  openCreateModal(): void {
    this.selectedArea.set(null);
    this.medicalAreaForm.reset();
    this.createOpen.set(true);
  }

  closeCreateModal(): void {
    this.medicalAreaForm.reset();
    this.createOpen.set(false);
  }

  // modal para abrir el editar area medica
  openEditModal(area: MedicalAreaResponseDto): void {

    this.selectedArea.set(area);

    this.medicalAreaForm.patchValue({
      name: area.name,
      description: area.description ?? '',
    });

    this.createOpen.set(true);
  }

  // cerrar edicion
  closeEditModel(): void {
    this.selectedArea.set(null);

    this.medicalAreaForm.reset();

    this.createOpen.set(false);
  }

  // submit modal
  submitMedicalArea(): void {
    if (this.selectedArea()) {
      this.updateMedicalArea();
    } else {
      this.createMedicalArea();
    }
  }

  private renderIcons(): void {
    
  }
}