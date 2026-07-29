import { Component, inject, signal, computed, AfterViewInit, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentApi } from '../../../../assignments/services/assignment-api';
import { AssignmentDetail as AssignmentDetailModel } from '../../../models/assignment-detail.model';
import { createIcons, icons } from 'lucide';
import { AssignedCase } from '../../../models/assigned-case.model';
import { LateSubmissionPolicy } from '../../../../../core/enum/late-submission-policy';

@Component({
  selector: 'app-assignment-detail',
  imports: [DatePipe],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetailPage implements AfterViewInit, OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(AssignmentApi);

  assignment = signal<AssignmentDetailModel | null>(null);

  readonly totalStudents = computed(() => {
    return this.assignment()?.assignedCases.length ?? 0;
  });

  readonly totalCases = computed(() => {
    const assignment = this.assignment();

    if (!assignment) return 0;

    return new Set(assignment.assignedCases.map((a) => a.case.id)).size;
  });

  readonly totalCompleted = computed(() => {
    const assignment = this.assignment();
    if (!assignment) return 0;

    return assignment.assignedCases.filter((a) => a.submission?.status === 'SUBMITTED').length;
  });

  readonly totalPending = computed(() => {
    const assignment = this.assignment();
    if (!assignment) return 0;

    return assignment.assignedCases.filter((a) => !a.submission).length;
  });

  readonly progress = computed(() => {
    const total = this.totalStudents();

    if (total === 0) return 0;

    return Math.round((this.totalCompleted() / total) * 100);
  });

  readonly deadlineInfo = computed(() => {
    const assignment = this.assignment();

    if (!assignment) {
      return {
        hasDueDate: false,
        expired: false,
        acceptsLate: false,
        message: 'Sin fecha límite',
      };
    }

    if (!assignment.dueDate) {
      return {
        hasDueDate: false,
        expired: false,
        acceptsLate:
          assignment.lateSubmissionPolicy ===
          LateSubmissionPolicy.ACCEPT_LATE,
        message: 'Sin fecha límite',
      };
    }

    const due = new Date(assignment.dueDate);
    const now = new Date();

    const diff = due.getTime() - now.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    const abs = Math.abs(diff);

    let message = '';

    if (diff < 0) {
      if (abs >= day) {
        const days = Math.floor(abs / day);

        message = `Venció hace ${days} ${days === 1 ? 'día' : 'días'}`;
      } else if (abs >= hour) {
        const hours = Math.floor(abs / hour);

        message = `Venció hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else {
        const minutes = Math.max(1, Math.floor(abs / minute));

        message = `Venció hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
      }
    } else {
      if (diff > 30 * day) {
        message = `Vence el ${due.toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}`;
      } else if (diff >= day) {
        const days = Math.ceil(diff / day);

        message = `Queda${days > 1 ? 'n' : ''} ${days} ${days === 1 ? 'día' : 'días'}`;
      } else if (diff >= hour) {
        const hours = Math.ceil(diff / hour);

        message = `Queda${hours > 1 ? 'n' : ''} ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else if (diff >= minute) {
        const minutes = Math.ceil(diff / minute);

        message = `Queda${minutes > 1 ? 'n' : ''} ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
      } else {
        message = 'Vence en unos segundos';
      }
    }

    return {
      hasDueDate: true,
      expired: diff < 0,
      acceptsLate:
        assignment.lateSubmissionPolicy ===
        LateSubmissionPolicy.ACCEPT_LATE,
      message,
    };
  });

  loading = signal(true);

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  ngOnInit() {
    const assignmentId = this.route.snapshot.paramMap.get('assignmentId')!;

    this.api.findOne(assignmentId).subscribe({
      next: (assignment) => {
        console.log('NEXT');
        console.log(assignment);

        this.assignment.set(assignment);

        console.log('loading antes:', this.loading());
        this.loading.set(false);
        console.log('loading después:', this.loading());
        this.renderIcon();
      },

      error: (err) => {
        console.error('ERROR', err);
        this.loading.set(false);
        this.renderIcon();
      },

      complete: () => {
        console.log('COMPLETE');
      },
    });
  }

  openReview(assigned: AssignedCase) {
    if (!assigned.submission) return;

    if (assigned.submission.status !== 'SUBMITTED') {
      return;
    }

    const classroomId = this.route.snapshot.paramMap.get('classroomId');

    this.router.navigate(['/dashboard/teacher/reviews/crear', assigned.submission.id], {
      queryParams: {
        classroomId,
      },
    });
  }

  publish() {
    const assignment = this.assignment();

    if (!assignment) return;

    this.api.publish(assignment.id).subscribe({
      next: (updated) => {
        this.assignment.set(updated);
      },
    });
  }

  delete() {
    const assignment = this.assignment();

    const classroomId = this.route.snapshot.paramMap.get('classroomId')!;

    if (!assignment) return;

    if (!confirm('¿Eliminar actividad?')) return;

    this.api.delete(assignment.id).subscribe(() => {
      this.router.navigate(['/dashboard/teacher/classroom', classroomId]);
    });
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
