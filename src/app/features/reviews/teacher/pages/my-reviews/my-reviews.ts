import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewApi } from '../../../services/review-api';
import { CommonModule } from '@angular/common';
import { ReviewSummaryResponseDto } from '../../../dto/review-summary-response.dto';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-my-reviews',
  imports: [CommonModule],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.scss',
})
export class MyReviews {
  private readonly api = inject(ReviewApi);
  private readonly router = inject(Router);

  reviews = signal<ReviewSummaryResponseDto[]>([]);
  loading = signal(true);

  // signal para filtros
  search = signal('');
  selectedAssignments = signal('ALL');

  // signal para filtrar por casos clinicos
  selectedCase = signal('ALL');

  // signal para ordenar
  sortBy = signal<
    'newest' |
    'oldest' |
    'student' |
    'scoreDesc' |
    'scoreAsc'
  >('newest');

  // signal para buscar por entrega
  deliveryFilter = signal<'ALL' | 'ON_TIME' | 'LATE'>('ALL');

  // obtener la lista de actividades
  assignments = computed(() => [
    'ALL',
    ...new Set(this.reviews().map(r => r.assignment.title)),
  ]);

  // obtener la lista de casos
  cases = computed(() => [
    'ALL',
    ...new Set(this.reviews().map(r => r.case.title)),
  ]);


  filteredReviews = computed(() => {
    let list = [...this.reviews()];
    const search = this.search().trim().toLowerCase();

    // filtrar por actividad
    if (this.selectedAssignments() !== 'ALL') {
      list = list.filter(
        review => review.assignment.title === this.selectedAssignments()
      );
    }

    // filtrar por caso clinico
    if (this.selectedCase() !== 'ALL') {
      list = list.filter(
        review => review.case.title === this.selectedCase()
      );
    }

    // buscar por nombre, apellido o matricula
    if (search) {
      list = list.filter(review =>
        review.student.firstName.toLowerCase().includes(search) ||
        review.student.lastName.toLowerCase().includes(search) ||
        review.student.matricula.toString().includes(search)
      );
    }

    // Tipo de entrega
    if (this.deliveryFilter() !== 'ALL') {
      list = list.filter(
        review => review.submissionTiming === this.deliveryFilter()
      );
    }

    // odernear por a-z los nombres de los estudiantes
    switch (this.sortBy()) {

      case 'student':
        list.sort((a, b) =>
          `${a.student.lastName} ${a.student.firstName}`.localeCompare(
            `${b.student.lastName} ${b.student.firstName}`,
            'es',
            { sensitivity: 'base' }
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

      case 'scoreDesc':
        list.sort(
          (a, b) => b.totalScore - a.totalScore
        );
        break;

      case 'scoreAsc':
        list.sort(
          (a, b) => a.totalScore - b.totalScore
        );
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
    this.api.getReview().subscribe({
      next: (data) => {
        this.reviews.set(data);
        this.loading.set(false);
        this.renderIcons()
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  openReview(id: string) {
    this.router.navigate(['/dashboard/teacher/reviews', id]);
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
