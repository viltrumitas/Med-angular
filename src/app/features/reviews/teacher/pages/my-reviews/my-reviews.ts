import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { createIcons, icons } from 'lucide';

import { ReviewSummaryResponseDto } from '../../../dto/review-summary-response.dto';
import { ReviewApi } from '../../../services/review-api';

type ReviewSort = 'newest' | 'oldest' | 'student' | 'scoreDesc' | 'scoreAsc';

type DeliveryFilter = 'ALL' | 'ON_TIME' | 'LATE';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.scss',
})
export class MyReviews implements OnInit {
  private readonly api = inject(ReviewApi);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly reviews = signal<ReviewSummaryResponseDto[]>([]);

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);

  readonly search = signal('');
  readonly selectedAssignment = signal('ALL');
  readonly selectedCase = signal('ALL');
  readonly deliveryFilter = signal<DeliveryFilter>('ALL');
  readonly sortBy = signal<ReviewSort>('newest');

  readonly assignments = computed(() => {
    const titles = this.reviews()
      .map((review) => review.assignment.title)
      .filter(Boolean);

    return [
      'ALL',
      ...Array.from(new Set(titles)).sort((a, b) =>
        a.localeCompare(b, 'es', {
          sensitivity: 'base',
        }),
      ),
    ];
  });

  readonly cases = computed(() => {
    const titles = this.reviews()
      .map((review) => review.case.title)
      .filter(Boolean);

    return [
      'ALL',
      ...Array.from(new Set(titles)).sort((a, b) =>
        a.localeCompare(b, 'es', {
          sensitivity: 'base',
        }),
      ),
    ];
  });

  readonly totalReviews = computed(() => this.reviews().length);

  readonly onTimeReviews = computed(() => {
    return this.reviews().filter((review) => review.submissionTiming === 'ON_TIME').length;
  });

  readonly lateReviews = computed(() => {
    return this.reviews().filter((review) => review.submissionTiming === 'LATE').length;
  });

  readonly averageScore = computed(() => {
    const reviews = this.reviews();

    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + Number(review.totalScore || 0), 0);

    return Math.round((total / reviews.length) * 10) / 10;
  });

  readonly activeFiltersCount = computed(() => {
    let count = 0;

    if (this.search().trim()) {
      count++;
    }

    if (this.selectedAssignment() !== 'ALL') {
      count++;
    }

    if (this.selectedCase() !== 'ALL') {
      count++;
    }

    if (this.deliveryFilter() !== 'ALL') {
      count++;
    }

    if (this.sortBy() !== 'newest') {
      count++;
    }

    return count;
  });

  readonly hasActiveFilters = computed(() => this.activeFiltersCount() > 0);

  readonly filteredReviews = computed(() => {
    let list = [...this.reviews()];

    const normalizedSearch = this.normalizeText(this.search());

    const selectedAssignment = this.selectedAssignment();
    const selectedCase = this.selectedCase();
    const deliveryFilter = this.deliveryFilter();

    if (selectedAssignment !== 'ALL') {
      list = list.filter((review) => review.assignment.title === selectedAssignment);
    }

    if (selectedCase !== 'ALL') {
      list = list.filter((review) => review.case.title === selectedCase);
    }

    if (deliveryFilter !== 'ALL') {
      list = list.filter((review) => review.submissionTiming === deliveryFilter);
    }

    if (normalizedSearch) {
      list = list.filter((review) => {
        const fullName = this.normalizeText(
          `${review.student.firstName} ${review.student.lastName}`,
        );

        const reverseName = this.normalizeText(
          `${review.student.lastName} ${review.student.firstName}`,
        );

        const matricula = String(review.student.matricula);

        const assignment = this.normalizeText(review.assignment.title);

        const clinicalCase = this.normalizeText(review.case.title);

        return (
          fullName.includes(normalizedSearch) ||
          reverseName.includes(normalizedSearch) ||
          matricula.includes(normalizedSearch) ||
          assignment.includes(normalizedSearch) ||
          clinicalCase.includes(normalizedSearch)
        );
      });
    }

    switch (this.sortBy()) {
      case 'student':
        list.sort((a, b) =>
          `${a.student.lastName} ${a.student.firstName}`.localeCompare(
            `${b.student.lastName} ${b.student.firstName}`,
            'es',
            {
              sensitivity: 'base',
            },
          ),
        );
        break;

      case 'oldest':
        list.sort((a, b) => this.getTimestamp(a.createdAt) - this.getTimestamp(b.createdAt));
        break;

      case 'scoreDesc':
        list.sort((a, b) => Number(b.totalScore || 0) - Number(a.totalScore || 0));
        break;

      case 'scoreAsc':
        list.sort((a, b) => Number(a.totalScore || 0) - Number(b.totalScore || 0));
        break;

      case 'newest':
      default:
        list.sort((a, b) => this.getTimestamp(b.createdAt) - this.getTimestamp(a.createdAt));
        break;
    }

    return list;
  });

  readonly filteredCount = computed(() => this.filteredReviews().length);

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    if (this.loading() && this.reviews().length > 0) {
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);

    this.api
      .getReview()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (reviews) => {
          this.reviews.set(reviews);
          this.validateSelectedFilters();
        },
        error: (error) => {
          console.error('[MyReviews] Error al cargar evaluaciones:', error);

          this.reviews.set([]);

          this.loadError.set(this.getErrorMessage(error, 'No pudimos cargar las evaluaciones.'));
        },
      });
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
  }

  updateAssignment(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedAssignment.set(select.value);
  }

  updateCase(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCase.set(select.value);
  }

  updateDeliveryFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.deliveryFilter.set(select.value as DeliveryFilter);
  }

  updateSort(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.sortBy.set(select.value as ReviewSort);
  }

  clearSearch(): void {
    this.search.set('');
    this.renderIcons();
  }

  clearFilters(): void {
    this.search.set('');
    this.selectedAssignment.set('ALL');
    this.selectedCase.set('ALL');
    this.deliveryFilter.set('ALL');
    this.sortBy.set('newest');

    this.renderIcons();
  }

  openReview(reviewId: string): void {
    this.router.navigate(['/dashboard/teacher/reviews', reviewId]);
  }

  private validateSelectedFilters(): void {
    if (!this.assignments().includes(this.selectedAssignment())) {
      this.selectedAssignment.set('ALL');
    }

    if (!this.cases().includes(this.selectedCase())) {
      this.selectedCase.set('ALL');
    }
  }

  private normalizeText(value: string): string {
    return value
      .trim()
      .toLocaleLowerCase('es')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private getTimestamp(value: string | Date): number {
    const timestamp = new Date(value).getTime();

    return Number.isFinite(timestamp) ? timestamp : 0;
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
