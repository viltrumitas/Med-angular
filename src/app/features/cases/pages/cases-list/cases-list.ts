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
    this.renderIcons();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.renderIcons();
  }

  // =========================
  // FILTERS
  // =========================
  setStatusFilter(filter: CaseStatusFilter): void {
    this.statusFilter.set(filter);

    this.renderIcons();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('ALL');

    this.renderIcons();
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
