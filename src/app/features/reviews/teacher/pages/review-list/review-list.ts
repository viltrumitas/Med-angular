import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';

import { SubmissionCard } from '../../../components/review-card/review-card';
import { ReviewApi } from '../../../services/review-api';
import { SubmissionsListItem } from '../../../models/submissions-list.model';
import { SubmissionApi } from '../../../../submissions/service/submission-api.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [SubmissionCard],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList implements OnInit {
  private readonly router = inject(Router);
  private readonly reviewsService = inject(ReviewApi);
  private readonly submissionsService = inject(SubmissionApi)

  submissions = signal<SubmissionsListItem[]>([]);
  loading = signal(false);

  // Filtros
  search = signal('');
  selectedAssignment = signal('ALL');
  selectedCase = signal('ALL');

  // Filtrar por tipo de entrega
  deliveryFilter = signal<'ALL' | 'ON_TIME' | 'LATE'>('ALL');

  // ordenar
  sortBy = signal<'newest' | 'oldest' | 'student' | 'dueDate' | 'priority'>('newest');

  // Lista de asignaciones disponibles
  assignments = computed(() => [
    'ALL',
    ...new Set(this.submissions().map(s => s.assignment.title)),
  ]);

  cases = computed(() => [
    'ALL',
    ...new Set(this.submissions().map(s => s.case.title)),
  ]);

  // Lista filtrada
  filteredSubmissions = computed(() => {
    let list = [...this.submissions()];
    const search = this.search().trim().toLowerCase();

    // Filtro por asignación
    if (this.selectedAssignment() !== 'ALL') {
      list = list.filter(
        s => s.assignment.title === this.selectedAssignment()
      );
    }

    // Filtrar por caso clínico
    if (this.selectedCase() !== 'ALL') {
      list = list.filter(
        s => s.case.title === this.selectedCase()
      );
    }

    // Filtrar por tipo de entrega
    if (this.deliveryFilter() !== 'ALL') {
      list = list.filter(
        s => s.submissionTiming === this.deliveryFilter()
      );
    }

    // Filtro por nombre o matrícula
    if (search) {
      list = list.filter(s =>
        s.student.firstName.toLowerCase().includes(search) ||
        s.student.lastName.toLowerCase().includes(search) ||
        s.student.matricula.toString().includes(search)
      );
    }

    // ordenamiento
    switch (this.sortBy()) {
      case 'student':
        list.sort((a, b) =>
          `${a.student.lastName} ${a.student.firstName}`.localeCompare(
            `${b.student.lastName} ${b.student.firstName}`,
            'es',
            {
              sensitivity: 'base',
            }
          )
        );
        break;

      case 'oldest':
        list.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      case 'dueDate':
        list.sort((a, b) => {

          const dateA = a.assignment.dueDate
            ? new Date(a.assignment.dueDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          const dateB = b.assignment.dueDate
            ? new Date(b.assignment.dueDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          return dateA - dateB;
        });
        break;

      case 'priority':
        list.sort((a, b) => {

          if (a.submissionTiming !== b.submissionTiming) {
            return a.submissionTiming === 'LATE'
              ? -1
              : 1;
          }

          return (
            new Date(a.submittedAt ?? a.createdAt).getTime() -
            new Date(b.submittedAt ?? b.createdAt).getTime()
          );
        });
        break;

      case 'newest':
      default:
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;
    }

    return list;
  });

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.loading.set(true);

    this.submissionsService.findPending().subscribe({
      next: (data) => {
        this.submissions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  openSubmission(id: string) {
    this.router.navigate([
      '/dashboard/teacher/reviews/crear',
      id,
    ]);
  }
}
