import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { SubmissionCard } from '../../../components/review-card/review-card';
import { SubmissionsListItem } from '../../../models/submissions-list.model';
import { SubmissionApi } from '../../../../submissions/service/submission-api.service';
import { createIcons, icons } from 'lucide';
import { DeliveryFilter } from '../../models/delivery-filter.type';
import { SubmissionSort } from '../../models/submission-sort.type';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [SubmissionCard],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList implements OnInit {
  private readonly router = inject(Router);
  private readonly submissionsService = inject(SubmissionApi);
  private readonly destroyRef = inject(DestroyRef);

  readonly submissions = signal<SubmissionsListItem[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly search = signal('');
  readonly selectedAssignment = signal('ALL');
  readonly selectedCase = signal('ALL');
  readonly deliveryFilter = signal<DeliveryFilter>('ALL');
  readonly sortBy = signal<SubmissionSort>('newest');
  readonly totalPending = computed(() => this.submissions().length);

  readonly totalLate = computed(
    () => this.submissions().filter((submission) => submission.submissionTiming === 'LATE').length,
  );

  readonly totalOnTime = computed(
    () =>
      this.submissions().filter((submission) => submission.submissionTiming === 'ON_TIME').length,
  );

  readonly assignments = computed(() => {
    const assignmentTitles = this.submissions()
      .map((submission) => submission.assignment.title.trim())
      .filter(Boolean);

    return [
      'ALL',
      ...Array.from(new Set(assignmentTitles)).sort((a, b) =>
        a.localeCompare(b, 'es', {
          sensitivity: 'base',
        }),
      ),
    ];
  });

  readonly cases = computed(() => {
    const caseTitles = this.submissions()
      .map((submission) => submission.case.title?.trim())
      .filter((title): title is string => !!title);

    return [
      'ALL',
      ...Array.from(new Set(caseTitles)).sort((a, b) =>
        a.localeCompare(b, 'es', {
          sensitivity: 'base',
        }),
      ),
    ];
  });

  readonly hasActiveFilters = computed(() => {
    return (
      this.search().trim().length > 0 ||
      this.selectedAssignment() !== 'ALL' ||
      this.selectedCase() !== 'ALL' ||
      this.deliveryFilter() !== 'ALL'
    );
  });

  readonly filteredSubmissions = computed(() => {
    let list = [...this.submissions()];

    const normalizedSearch = this.normalizeText(this.search());
    const selectedAssignment = this.selectedAssignment();
    const selectedCase = this.selectedCase();
    const deliveryFilter = this.deliveryFilter();

    if (selectedAssignment !== 'ALL') {
      list = list.filter((submission) => submission.assignment.title.trim() === selectedAssignment);
    }

    if (selectedCase !== 'ALL') {
      list = list.filter((submission) => submission.case.title?.trim() === selectedCase);
    }

    if (deliveryFilter !== 'ALL') {
      list = list.filter((submission) => submission.submissionTiming === deliveryFilter);
    }

    if (normalizedSearch) {
      list = list.filter((submission) => {
        const fullName = this.normalizeText(
          `${submission.student.firstName} ${submission.student.lastName}`,
        );

        const reverseName = this.normalizeText(
          `${submission.student.lastName} ${submission.student.firstName}`,
        );

        const matricula = submission.student.matricula.toString();

        return (
          fullName.includes(normalizedSearch) ||
          reverseName.includes(normalizedSearch) ||
          matricula.includes(normalizedSearch)
        );
      });
    }

    return this.sortSubmissions(list);
  });

  readonly visibleCount = computed(() => this.filteredSubmissions().length);

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    if (this.loading() && this.submissions().length > 0) {
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);

    this.submissionsService
      .findPending()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (submissions) => {
          this.submissions.set(submissions);
          this.renderIcons();
        },
        error: (error) => {
          this.submissions.set([]);

          this.loadError.set(
            this.getErrorMessage(error, 'No pudimos cargar las entregas pendientes.'),
          );
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

  updateDeliveryFilter(filter: DeliveryFilter): void {
    this.deliveryFilter.set(filter);
  }

  updateSort(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.sortBy.set(select.value as SubmissionSort);
  }

  clearFilters(): void {
    this.search.set('');
    this.selectedAssignment.set('ALL');
    this.selectedCase.set('ALL');
    this.deliveryFilter.set('ALL');
    this.sortBy.set('newest');
  }

  openSubmission(id: string): void {
    this.router.navigate(['/dashboard/teacher/reviews/crear', id]);
  }

  private sortSubmissions(submissions: SubmissionsListItem[]): SubmissionsListItem[] {
    const list = [...submissions];

    switch (this.sortBy()) {
      case 'student':
        return list.sort((a, b) => {
          const studentA = `${a.student.lastName} ${a.student.firstName}`;

          const studentB = `${b.student.lastName} ${b.student.firstName}`;

          return studentA.localeCompare(studentB, 'es', {
            sensitivity: 'base',
          });
        });

      case 'oldest':
        return list.sort((a, b) => this.getSubmissionDate(a) - this.getSubmissionDate(b));

      case 'dueDate':
        return list.sort((a, b) => {
          const dateA = a.assignment.dueDate
            ? new Date(a.assignment.dueDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          const dateB = b.assignment.dueDate
            ? new Date(b.assignment.dueDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          return dateA - dateB;
        });

      case 'priority':
        return list.sort((a, b) => {
          const timingPriorityA = a.submissionTiming === 'LATE' ? 0 : 1;

          const timingPriorityB = b.submissionTiming === 'LATE' ? 0 : 1;

          if (timingPriorityA !== timingPriorityB) {
            return timingPriorityA - timingPriorityB;
          }

          return this.getSubmissionDate(a) - this.getSubmissionDate(b);
        });

      case 'newest':
      default:
        return list.sort((a, b) => this.getSubmissionDate(b) - this.getSubmissionDate(a));
    }
  }

  private getSubmissionDate(submission: SubmissionsListItem): number {
    return new Date(submission.submittedAt ?? submission.createdAt).getTime();
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
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
