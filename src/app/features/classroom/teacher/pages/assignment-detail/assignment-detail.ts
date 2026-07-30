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
import { AssignmentApi } from '../../../../assignments/services/assignment-api';
import { AssignedCase } from '../../../models/assigned-case.model';
import { AssignmentDetail as AssignmentDetailModel } from '../../../models/assignment-detail.model';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetailPage implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(AssignmentApi);
  private readonly destroyRef = inject(DestroyRef);

  readonly assignment = signal<AssignmentDetailModel | null>(null);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly isPublishing = signal(false);
  readonly publishError = signal<string | null>(null);
  readonly isDeleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly totalStudents = computed(() => this.assignment()?.assignedCases.length ?? 0);
  readonly totalCases = computed(() => {
    const assignedCases = this.assignment()?.assignedCases ?? [];

    return new Set(assignedCases.map((assignedCase) => assignedCase.case.id)).size;
  });

  readonly totalCompleted = computed(() => {
    const assignedCases = this.assignment()?.assignedCases ?? [];

    return assignedCases.filter((assignedCase) => {
      const status = assignedCase.submission?.status;

      return status === 'SUBMITTED' || status === 'REVIEWED';
    }).length;
  });

  readonly totalReviewed = computed(() => {
    const assignedCases = this.assignment()?.assignedCases ?? [];

    return assignedCases.filter((assignedCase) => assignedCase.submission?.status === 'REVIEWED')
      .length;
  });

  readonly totalPending = computed(() => {
    const assignedCases = this.assignment()?.assignedCases ?? [];

    return assignedCases.filter((assignedCase) => {
      const status = assignedCase.submission?.status;

      return !status || status === 'DRAFT';
    }).length;
  });

  readonly totalAwaitingReview = computed(() => {
    const assignedCases = this.assignment()?.assignedCases ?? [];

    return assignedCases.filter((assignedCase) => assignedCase.submission?.status === 'SUBMITTED')
      .length;
  });

  readonly progress = computed(() => {
    const total = this.totalStudents();

    if (total === 0) {
      return 0;
    }

    return Math.round((this.totalCompleted() / total) * 100);
  });

  readonly reviewProgress = computed(() => {
    const total = this.totalCompleted();

    if (total === 0) {
      return 0;
    }

    return Math.round((this.totalReviewed() / total) * 100);
  });

  readonly deadlineInfo = computed(() => {
    const assignment = this.assignment();

    if (!assignment?.dueDate) {
      return {
        hasDueDate: false,
        expired: false,
        acceptsLate: assignment?.lateSubmissionPolicy === LateSubmissionPolicy.ACCEPT_LATE,
        message: 'Sin fecha límite',
      };
    }

    const dueDate = new Date(assignment.dueDate);
    const difference = dueDate.getTime() - Date.now();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const absoluteDifference = Math.abs(difference);

    let message: string;

    if (difference < 0) {
      if (absoluteDifference >= day) {
        const days = Math.floor(absoluteDifference / day);

        message = `Venció hace ${days} ${days === 1 ? 'día' : 'días'}`;
      } else if (absoluteDifference >= hour) {
        const hours = Math.floor(absoluteDifference / hour);

        message = `Venció hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else {
        const minutes = Math.max(1, Math.floor(absoluteDifference / minute));

        message = `Venció hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
      }
    } else if (difference > 30 * day) {
      message = `Vence el ${dueDate.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`;
    } else if (difference >= day) {
      const days = Math.ceil(difference / day);

      message = `Queda${days === 1 ? '' : 'n'} ${days} ${days === 1 ? 'día' : 'días'}`;
    } else if (difference >= hour) {
      const hours = Math.ceil(difference / hour);

      message = `Queda${hours === 1 ? '' : 'n'} ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (difference >= minute) {
      const minutes = Math.ceil(difference / minute);

      message = `Queda${minutes === 1 ? '' : 'n'} ${minutes} ${
        minutes === 1 ? 'minuto' : 'minutos'
      }`;
    } else {
      message = 'Vence en unos segundos';
    }

    return {
      hasDueDate: true,
      expired: difference < 0,
      acceptsLate: assignment.lateSubmissionPolicy === LateSubmissionPolicy.ACCEPT_LATE,
      message,
    };
  });

  readonly canPublish = computed(() => {
    const assignment = this.assignment();

    return !!assignment && !assignment.isPublished && !this.isPublishing();
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

    this.api
      .findOne(assignmentId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (assignment) => {
          this.assignment.set(assignment);
        },
        error: (error) => {
          this.assignment.set(null);

          this.loadError.set(
            this.getErrorMessage(error, 'No pudimos cargar la actividad. Intenta nuevamente.'),
          );
        },
      });
  }

  openReview(assignedCase: AssignedCase): void {
    const submission = assignedCase.submission;

    if (!submission || submission.status !== 'SUBMITTED') {
      return;
    }

    const classroomId = this.route.snapshot.paramMap.get('classroomId');

    this.router.navigate(['/dashboard/teacher/reviews/crear', submission.id], {
      queryParams: {
        classroomId,
      },
    });
  }

  publish(): void {
    const assignment = this.assignment();

    if (!assignment || assignment.isPublished || this.isPublishing()) {
      return;
    }

    this.publishError.set(null);
    this.isPublishing.set(true);

    this.api
      .publish(assignment.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isPublishing.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (updatedAssignment) => {
          this.assignment.set(updatedAssignment);
        },
        error: (error) => {
          console.error('Error al publicar la actividad:', error);

          this.publishError.set(this.getErrorMessage(error, 'No pudimos publicar la actividad.'));
        },
      });
  }

  deleteAssignment(): void {
    const assignment = this.assignment();

    if (!assignment || this.isDeleting()) {
      return;
    }

    const confirmed = window.confirm(
      `¿Eliminar la actividad “${assignment.title}”? Esta acción no se puede deshacer.`,
    );

    if (!confirmed) {
      return;
    }

    const classroomId = this.route.snapshot.paramMap.get('classroomId');

    if (!classroomId) {
      this.deleteError.set('No se encontró el salón asociado a la actividad.');
      return;
    }

    this.deleteError.set(null);
    this.isDeleting.set(true);

    this.api
      .delete(assignment.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isDeleting.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/teacher/classroom', classroomId]);
        },
        error: (error) => {
          this.deleteError.set(this.getErrorMessage(error, 'No pudimos eliminar la actividad.'));
        },
      });
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
