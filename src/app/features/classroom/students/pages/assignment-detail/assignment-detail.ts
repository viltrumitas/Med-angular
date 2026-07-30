import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { createIcons, icons } from 'lucide';

import { LateSubmissionPolicy } from '../../../../../core/enum/late-submission-policy';

import { AssignedStudentCase } from '../../../../assigned-case/models/assigned-case.model';
import { AssignedCaseApiService } from '../../../../assigned-case/services/assigned-case-api.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetail implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly assignedApi = inject(AssignedCaseApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly assignedCases = signal<AssignedStudentCase[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly assignment = computed(() => this.assignedCases()[0]?.assignment ?? null);
  readonly totalCases = computed(() => this.assignedCases().length);
  readonly completedCases = computed(() => {
    return this.assignedCases().filter((assignedCase) => {
      const status = assignedCase.submission?.status;

      return status === 'SUBMITTED' || status === 'REVIEWED';
    }).length;
  });

  readonly reviewedCases = computed(() => {
    return this.assignedCases().filter(
      (assignedCase) => assignedCase.submission?.status === 'REVIEWED',
    ).length;
  });

  readonly pendingCases = computed(() => {
    return this.assignedCases().filter((assignedCase) => {
      const status = assignedCase.submission?.status;

      return !status || status === 'DRAFT';
    }).length;
  });

  readonly progress = computed(() => {
    const total = this.totalCases();

    if (total === 0) {
      return 0;
    }

    return Math.round((this.completedCases() / total) * 100);
  });

  readonly assignmentStatus = computed(() => {
    const assignment = this.assignment();

    if (!assignment) {
      return null;
    }

    if (!assignment.dueDate) {
      return {
        type: 'no-deadline',
        title: 'Sin fecha límite',
        message: 'Puedes completar esta actividad en cualquier momento.',
        isClosed: false,
        acceptsLate: false,
      };
    }

    const dueDate = new Date(assignment.dueDate);
    const difference = dueDate.getTime() - Date.now();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (difference >= 0) {
      let message: string;

      if (difference >= 30 * day) {
        message = `Vence el ${dueDate.toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}`;
      } else if (difference >= day) {
        const days = Math.ceil(difference / day);

        message = days === 1 ? 'Vence mañana' : `Vence en ${days} días`;
      } else if (difference >= hour) {
        const hours = Math.ceil(difference / hour);

        message = hours === 1 ? 'Vence en 1 hora' : `Vence en ${hours} horas`;
      } else if (difference >= minute) {
        const minutes = Math.ceil(difference / minute);

        message = minutes === 1 ? 'Vence en 1 minuto' : `Vence en ${minutes} minutos`;
      } else {
        message = 'Vence en unos segundos';
      }

      return {
        type: difference < day ? 'warning' : 'available',
        title: 'Disponible',
        message,
        isClosed: false,
        acceptsLate: false,
      };
    }

    const acceptsLate = assignment.lateSubmissionPolicy === LateSubmissionPolicy.ACCEPT_LATE;

    if (acceptsLate) {
      return {
        type: 'late',
        title: 'Entrega tardía',
        message: 'La fecha límite expiró, pero todavía puedes enviar tus respuestas.',
        isClosed: false,
        acceptsLate: true,
      };
    }

    return {
      type: 'closed',
      title: 'Actividad cerrada',
      message: 'La fecha límite terminó y el docente ya no acepta nuevas entregas.',
      isClosed: true,
      acceptsLate: false,
    };
  });

  ngOnInit(): void {
    this.loadAssignment();
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  loadAssignment(): void {
    const assignmentId = this.route.snapshot.paramMap.get('assignmentId');

    if (!assignmentId) {
      this.loading.set(false);
      this.loadError.set('No se encontró el identificador de la actividad.');
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);

    this.assignedApi
      .findMyAssignedCasesByAssignment(assignmentId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (assignedCases) => {
          this.assignedCases.set(assignedCases);
        },
        error: (error) => {
          this.assignedCases.set([]);

          this.loadError.set(
            this.getErrorMessage(error, 'No pudimos cargar la actividad. Intenta nuevamente.'),
          );
        },
      });
  }

  canOpenCase(assignedCase: AssignedStudentCase): boolean {
    const status = this.assignmentStatus();

    if (!status?.isClosed) {
      return true;
    }

    return !!assignedCase.submission;
  }

  openCase(assignedCase: AssignedStudentCase): void {
    if (!this.canOpenCase(assignedCase)) {
      return;
    }

    this.router.navigate(['/dashboard/student/assigned-cases', assignedCase.id]);
  }

  getCaseActionLabel(assignedCase: AssignedStudentCase): string {
    const status = assignedCase.submission?.status;

    switch (status) {
      case 'DRAFT':
        return 'Continuar actividad';

      case 'SUBMITTED':
        return 'Ver entrega';

      case 'REVIEWED':
        return 'Ver evaluación';

      default:
        return this.canOpenCase(assignedCase) ? 'Comenzar actividad' : 'Actividad cerrada';
    }
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
