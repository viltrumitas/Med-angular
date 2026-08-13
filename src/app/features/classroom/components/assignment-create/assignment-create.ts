import {
  AfterViewInit,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { finalize, startWith } from 'rxjs';
import { createIcons, icons } from 'lucide';
import { ErrorService } from '../../../../core/services/error.service';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { InputComponent } from '../../../../shared/components/input/input';
import { TextareaComponent } from '../../../../shared/components/text-area/text-area';
import { createAssignmentForm } from '../../../assignments/forms/create-assignment-form';
import { mapCreateAssignment } from '../../../assignments/mappers/create-assignment.mapper';
import { AssignmentApi } from '../../../assignments/services/assignment-api';
import { CaseResponseDto } from '../../../cases/dto/case-response.dto';
import { ClassroomApi } from '../../service/clasroom-api.service';
import { SelectComponent } from '../../../../shared/components/select/select';

// types para filtros en la seleccion de casos
type UsageFilter = 'ALL' | 'NEVER_USED' | 'LOW_USAGE' | 'HIGH_USAGE' | 'RECENT';

type SortMode = 'RECOMMENDED' | 'TITLE' | 'LOW_USAGE' | 'HIGH_USAGE' | 'NEWEST';

@Component({
  selector: 'app-assignment-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, TextareaComponent, SelectComponent],
  templateUrl: './assignment-create.html',
  styleUrl: './assignment-create.scss',
})
export class AssignmentCreate implements AfterViewInit {
  private readonly assignmentApi = inject(AssignmentApi);
  private readonly classroomApi = inject(ClassroomApi);
  private readonly errorService = inject(ErrorService);
  private readonly destroyRef = inject(DestroyRef);

  readonly classroomId = input.required<string>();
  readonly created = output<void>();
  readonly assignmentForm = createAssignmentForm();
  readonly cases = signal<CaseResponseDto[]>([]);
  readonly isLoadingCases = signal(false);
  readonly isSubmitting = signal(false);

  // signal para ventanas extendibles
  readonly expandedAreas = signal(new Set<string>());

  // signal para la barra de busqueda
  readonly search = signal('');

  // form para cada filtro
  readonly areaControl = new FormControl('ALL', {
    nonNullable: true,
  });

  readonly usageControl = new FormControl<UsageFilter>('ALL', {
    nonNullable: true,
  });

  readonly sortControl = new FormControl<SortMode>('RECOMMENDED', {
    nonNullable: true,
  });

  private readonly initialFormValue = structuredClone(this.assignmentForm.getRawValue());

  private readonly selectedCaseIds = toSignal(
    this.assignmentForm.controls.caseIds.valueChanges.pipe(
      startWith(this.assignmentForm.controls.caseIds.value),
    ),
    {
      initialValue: this.assignmentForm.controls.caseIds.value,
    },
  );

  readonly selectedCasesCount = computed(() => this.selectedCaseIds()?.length ?? 0);
  readonly hasSelectedCases = computed(() => this.selectedCasesCount() > 0);
  readonly interactionDisabled = computed(() => this.isSubmitting() || this.isLoadingCases());

  readonly selectedArea = toSignal(
    this.areaControl.valueChanges.pipe(startWith(this.areaControl.value)),
    {
      initialValue: this.areaControl.value,
    },
  );

  readonly usageFilter = toSignal(
    this.usageControl.valueChanges.pipe(startWith(this.usageControl.value)),
    {
      initialValue: this.usageControl.value,
    },
  );

  readonly sortMode = toSignal(
    this.sortControl.valueChanges.pipe(startWith(this.sortControl.value)),
    {
      initialValue: this.sortControl.value,
    },
  );

  constructor() {
    this.loadCases();
  }

  // barra de busqueda
  updateSearch(value: string): void {
    this.search.set(value.trim().toLowerCase());
  }

  // crear las options en el componente
  readonly areaOptions = computed(() => [
    {
      label: 'Todas las áreas',
      value: 'ALL',
    },
    ...this.availableAreas().map((area) => ({
      label: area.name,
      value: area.id,
    })),
  ]);

  readonly usageOptions = [
    {
      label: 'Todos',
      value: 'ALL',
    },
    {
      label: 'Nunca usados',
      value: 'NEVER_USED',
    },
    {
      label: 'Poco usados',
      value: 'LOW_USAGE',
    },
    {
      label: 'Muy usados',
      value: 'HIGH_USAGE',
    },
    {
      label: 'Usados recientemente',
      value: 'RECENT',
    },
  ];

  readonly sortOptions = [
    {
      label: 'Recomendados',
      value: 'RECOMMENDED',
    },
    {
      label: 'Menor uso',
      value: 'LOW_USAGE',
    },
    {
      label: 'Mayor uso',
      value: 'HIGH_USAGE',
    },
    {
      label: 'Más recientes',
      value: 'NEWEST',
    },
    {
      label: 'Título (A-Z)',
      value: 'TITLE',
    },
  ];

  // crea las areas disponibles
  readonly availableAreas = computed(() => {
    const map = new Map<string, { id: string; name: string }>();

    this.cases().forEach((clinicalCase) => {
      if (clinicalCase.medicalArea) {
        map.set(clinicalCase.medicalArea.id, {
          id: clinicalCase.medicalArea.id,
          name: clinicalCase.medicalArea.name,
        });
      }
    });

    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  });

  // filtrar antes de agrupar
  readonly filteredCases = computed(() => {
    const term = this.search();
    const usage = this.usageFilter();
    let cases = [...this.cases()];

    // =========================
    // BÚSQUEDA
    // =========================

    if (term) {
      cases = cases.filter(
        (clinicalCase) =>
          clinicalCase.title?.toLowerCase().includes(term) ||
          clinicalCase.patientName?.toLowerCase().includes(term) ||
          clinicalCase.consult?.toLowerCase().includes(term) ||
          clinicalCase.medicalArea?.name.toLowerCase().includes(term),
      );
    }

    // =========================
    // FILTRO POR AREA
    // =========================
    const selectedArea = this.selectedArea();
    if (selectedArea !== 'ALL') {
      cases = cases.filter((c) => c.medicalArea.id === selectedArea);
    }

    // =========================
    // FILTRO DE USO
    // =========================

    if (usage !== 'ALL') {
      cases = cases.filter((c) => {
        switch (usage) {
          case 'NEVER_USED':
            return c.usage.neverUsed;

          case 'LOW_USAGE':
            return c.usage.totalAssignments <= 2;

          case 'HIGH_USAGE':
            return c.usage.totalAssignments >= 5;

          case 'RECENT':
            return !!c.usage.lastUsedAt;

          default:
            return true;
        }
      });
    }

    // =========================
    // ORDENAMIENTO
    // =========================

    const sort = this.sortMode();

    cases.sort((a, b) => {
      switch (sort) {
        case 'TITLE':
          return a.title.localeCompare(b.title);

        case 'LOW_USAGE':
          return a.usage.totalAssignments - b.usage.totalAssignments;

        case 'HIGH_USAGE':
          return b.usage.totalAssignments - a.usage.totalAssignments;

        case 'NEWEST':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        case 'RECOMMENDED':
        default:
          if (a.usage.neverUsed !== b.usage.neverUsed) {
            return a.usage.neverUsed ? -1 : 1;
          }

          if (a.usage.totalAssignments !== b.usage.totalAssignments) {
            return a.usage.totalAssignments - b.usage.totalAssignments;
          }

          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

    return cases;
  });

  // agrupar casos por area

  readonly groupedCases = computed(() => {
    const groups = new Map<
      string,
      {
        areaId: string;
        area: string;
        cases: CaseResponseDto[];
      }
    >();

    this.filteredCases().forEach((clinicalCase) => {
      const areaId = clinicalCase.medicalArea?.id ?? 'no-area';
      const areaName = clinicalCase.medicalArea?.name ?? 'Sin área';

      if (!groups.has(areaId)) {
        groups.set(areaId, {
          areaId,
          area: areaName,
          cases: [],
        });
      }

      groups.get(areaId)!.cases.push(clinicalCase);
    });

    return Array.from(groups.values()).sort((a, b) => a.area.localeCompare(b.area));
  });

  // boton para limpiar filtros
  readonly activeFiltersCount = computed(() => {
    let count = 0;

    if (this.search()) count++;
    if (this.selectedArea() !== 'ALL') count++;
    if (this.usageFilter() !== 'ALL') count++;
    if (this.sortMode() !== 'RECOMMENDED') count++;

    this.renderIcons();

    return count;
  });

  clearFilters(): void {
    this.search.set('');

    this.areaControl.setValue('ALL');
    this.usageControl.setValue('ALL');
    this.sortControl.setValue('RECOMMENDED');
  }

  // toggle area, (ventanas)
  toggleArea(areaId: string) {
    const current = new Set(this.expandedAreas());

    if (current.has(areaId)) {
      current.delete(areaId);
    } else {
      current.add(areaId);
    }

    this.expandedAreas.set(current);
  }

  isExpanded(areaId: string) {
    this.renderIcons();
    return this.expandedAreas().has(areaId);
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  toggleCase(caseId: string): void {
    if (this.interactionDisabled()) {
      return;
    }

    const control = this.assignmentForm.controls.caseIds;
    const currentIds = control.value ?? [];

    const updatedIds = currentIds.includes(caseId)
      ? currentIds.filter((id) => id !== caseId)
      : [...currentIds, caseId];

    control.setValue(updatedIds);
    control.markAsTouched();
    control.markAsDirty();
    control.updateValueAndValidity();

    this.errorService.clear();
  }

  isCaseSelected(caseId: string): boolean {
    return this.selectedCaseIds()?.includes(caseId) ?? false;
  }

  submitAssignment(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.errorService.clear();

    const caseIdsControl = this.assignmentForm.controls.caseIds;

    if (!caseIdsControl.value?.length) {
      caseIdsControl.markAsTouched();
      caseIdsControl.markAsDirty();
      return;
    }

    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    const dto = mapCreateAssignment(this.assignmentForm.getRawValue());

    this.isSubmitting.set(true);
    this.assignmentForm.disable();

    this.classroomApi
      .createAssignment(this.classroomId(), dto)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSubmitting.set(false);
          this.assignmentForm.enable();
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.resetForm();
          this.created.emit();
        },
        error: () => {
          this.renderIcons();
        },
      });
  }

  loadCases(): void {
    if (this.isLoadingCases()) {
      return;
    }

    this.errorService.clear();
    this.isLoadingCases.set(true);

    this.assignmentApi
      .findMyPublishedCases()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoadingCases.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (cases) => {
          this.cases.set(cases);
        },
        error: (error) => {
          this.cases.set([]);

          this.renderIcons();
        },
      });
  }

  private resetForm(): void {
    this.assignmentForm.reset(structuredClone(this.initialFormValue));

    this.assignmentForm.markAsPristine();
    this.assignmentForm.markAsUntouched();
    this.assignmentForm.updateValueAndValidity();

    this.errorService.clear();
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const httpError = error as {
        error?: {
          message?: string | string[];
        };
      };

      const message = httpError.error?.message;

      if (Array.isArray(message)) {
        return message.join(' ');
      }

      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    return fallback;
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
