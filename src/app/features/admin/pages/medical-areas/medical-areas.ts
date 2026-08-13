import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { createIcons, icons } from 'lucide';
import { finalize } from 'rxjs';

import { MedicalAreaApi } from '../../services/medical-area-api.service';
import { MedicalAreaResponseDto } from './dto/medical-area-response.dto';
import { UpdateMedicalAreaDto } from './dto/update-medical-area.dto';

import { MedicalAreaFormComponent } from '../../components/medical-area-form/medical-area-form';
import { createMedicalAreaForm } from '../../forms/medical-area.form';

import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-medical-areas',
  standalone: true,
  imports: [MedicalAreaFormComponent],
  templateUrl: './medical-areas.html',
  styleUrl: './medical-areas.scss',
})
export class MedicalAreas implements OnInit {
  private readonly medicalAreaApi = inject(MedicalAreaApi);
  private readonly errorService = inject(ErrorService);

  readonly medicalAreaForm = createMedicalAreaForm();
  readonly medicalAreas = signal<MedicalAreaResponseDto[]>([]);
  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly search = signal('');
  readonly createOpen = signal(false);
  readonly selectedArea = signal<MedicalAreaResponseDto | null>(null);

  readonly filteredAreas = computed(() => {
    const searchValue = this.search().trim().toLowerCase();

    if (!searchValue) {
      return this.medicalAreas();
    }

    return this.medicalAreas().filter((area) => area.name.toLowerCase().includes(searchValue));
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

    this.medicalAreaApi
      .findALl()
      .pipe(
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (areas) => {
          this.medicalAreas.set(areas);
        },

        error: () => {
          this.medicalAreas.set([]);
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
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.closeCreateModal();
          this.loadMedicalAreas();
        },
      });
  }

  // ==========================================================================
  // UPDATE
  // ==========================================================================

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
    this.errorService.clear();

    const value = this.medicalAreaForm.getRawValue();

    const description = value.description?.trim() ?? '';

    const dto: UpdateMedicalAreaDto = {
      name: value.name,
      description: description === '' ? null : description,
    };

    this.medicalAreaApi
      .update(area.id, dto)
      .pipe(
        finalize(() => {
          this.submitting.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.closeCreateModal();
          this.loadMedicalAreas();
        },
      });
  }

  // ==========================================================================
  // DELETE
  // ==========================================================================

  deleteMedicalArea(id: string): void {
    const confirmDelete = confirm('¿Eliminar esta área médica?');

    if (!confirmDelete) {
      return;
    }

    this.errorService.clear();

    this.medicalAreaApi
      .remove(id)
      .pipe(
        finalize(() => {
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.loadMedicalAreas();
        },
      });
  }

  // ==========================================================================
  // MODAL
  // ==========================================================================

  openCreateModal(): void {
    this.selectedArea.set(null);

    this.medicalAreaForm.reset();

    this.createOpen.set(true);

    this.renderIcons();
  }

  openEditModal(area: MedicalAreaResponseDto): void {
    this.selectedArea.set(area);

    this.medicalAreaForm.patchValue({
      name: area.name,
      description: area.description ?? '',
    });

    this.createOpen.set(true);

    this.renderIcons();
  }

  closeCreateModal(): void {
    this.selectedArea.set(null);

    this.medicalAreaForm.reset();

    this.createOpen.set(false);

    this.renderIcons();
  }

  // ==========================================================================
  // SUBMIT
  // ==========================================================================

  submitMedicalArea(): void {
    if (this.selectedArea()) {
      this.updateMedicalArea();
      return;
    }

    this.createMedicalArea();
  }

  // ==========================================================================
  // ICONS
  // ==========================================================================

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
