import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { GetCasesApi } from '../../services/get-cases-api.service';
import { CaseSummaryModel } from '../../dto/case-summary.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { createIcons, icons } from 'lucide';
import { CaseStatusFilter } from '../../models/case-filter.model';

@Component({
  selector: 'app-cases-list',
  imports: [RouterLink],
  templateUrl: './cases-list.html',
  styleUrl: './cases-list.scss',
})
export class CasesList implements OnInit, AfterViewInit {
  private readonly casesApi = inject(GetCasesApi);
  private readonly destroyRef = inject(DestroyRef);

  // =========================
  // STATE
  // =========================
  cases = signal<CaseSummaryModel[]>([]);
  searchTerm = signal('');
  statusFilter = signal<CaseStatusFilter>('ALL');
  isLoading = signal(false);
  error = signal<string | null>(null);

  // signal para ventanas que se colapsan
  expandedAreas = signal<Set<string>>(new Set());

  // =========================
  // COMPUTED
  // =========================
  totalCase = computed(() => this.cases().length);
  publishedCount = computed(() => this.cases().filter((caso) => caso.isPublished).length);
  draftCount = computed(() => this.cases().filter((caso) => !caso.isPublished).length);
  filteredCases = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    const filter = this.statusFilter();

    return this.cases().filter((caso) => {
      const matchedStatus =
        filter === 'ALL' ||
        (filter === 'PUBLISHED' && caso.isPublished) ||
        (filter === 'DRAFT' && !caso.isPublished);

      const matchedSearch =
        !term ||
        caso.title.toLowerCase().includes(term) ||
        caso.consult.toLowerCase().includes(term);

      return matchedStatus && matchedSearch;
    });
  });

  // =========================
  // LIFECYCLE
  // =========================
  ngAfterViewInit(): void {
    this.renderIcons();
  }

  ngOnInit(): void {
    this.loadCase();
  }

  // =========================
  // SEARCH
  // =========================
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  // =========================
  // FILTERS
  // =========================
  setStatusFilter(filter: CaseStatusFilter): void {
    this.statusFilter.set(filter);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('ALL');
  }

  // =========================
  // Agrupar casos por area
  // =========================
  groupedCases = computed(() => {
    const groups = new Map<
      string,
      {
        areaId: string;
        area: string;
        cases: CaseSummaryModel[];
      }
    >();

    this.filteredCases().forEach((caso) => {
      const areaId = caso.medicalArea?.id ?? 'none';
      const areaName = caso.medicalArea?.name ?? 'Sin área';

      if (!groups.has(areaId)) {
        groups.set(areaId, {
          areaId,
          area: areaName,
          cases: [],
        });
      }

      groups.get(areaId)!.cases.push(caso);
    });

    return Array.from(groups.values()).sort((a, b) => a.area.localeCompare(b.area));
  });

  // toggle para ventanas desplegables
  toggleArea(areaId: string) {
    const current = new Set(this.expandedAreas());

    if (current.has(areaId)) {
      current.delete(areaId);
    } else {
      current.add(areaId);
    }

    this.expandedAreas.set(current);
  }

  isAreaExpanded(areaId: string) {
    this.renderIcons();
    return this.expandedAreas().has(areaId);
  }

  // =========================
  // API
  // =========================
  private loadCase() {
    this.isLoading.set(true);
    this.error.set(null);

    this.casesApi
      .getCases()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.cases.set(response);
          this.isLoading.set(false);
          this.renderIcons();
        },
        error: (err) => {
          console.error('[Cases] Error al cargar los casos:', err);
          this.error.set('No se pudieron cargar los casos. Intenta de nuevo.');
          this.isLoading.set(false);
          this.renderIcons();
        },
      });
  }

  // =========================
  // LUCIDE
  // =========================
  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
