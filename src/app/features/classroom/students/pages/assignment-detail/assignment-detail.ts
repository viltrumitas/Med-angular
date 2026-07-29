import { AfterViewInit, Component, inject, OnInit, signal, computed } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { AssignedCaseApiService } from '../../../../assigned-case/services/assigned-case-api.service';
import { AssignedStudentCase } from '../../../../assigned-case/models/assigned-case.model';
import { LateSubmissionPolicy } from '../../../../../core/enum/late-submission-policy';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [DatePipe,],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetail implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly assignedApi = inject(AssignedCaseApiService);

  readonly assignedCases = signal<AssignedStudentCase[]>([]);

  readonly assignment = computed(() =>
    this.assignedCases()[0]?.assignment ?? null,
  );

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
      };
    }

    const now = new Date();
    const due = new Date(assignment.dueDate);

    const diff = due.getTime() - now.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (diff >= 0) {
      let message = '';

      if (days >= 2) {
        message = `Vence en ${days} días`;
      } else if (days === 1) {
        message = 'Vence mañana';
      } else if (hours >= 2) {
        message = `Vence en ${hours} horas`;
      } else if (hours === 1) {
        message = 'Vence en 1 hora';
      } else if (minutes > 1) {
        message = `Vence en ${minutes} minutos`;
      } else {
        message = 'Está por vencer';
      }

      return {
        type: hours < 24 ? 'warning' : 'available',
        title: 'Disponible',
        message,
      };
    }

    if (assignment.lateSubmissionPolicy === 'ACCEPT_LATE') {
      return {
        type: 'late',
        title: 'Entrega tardía',
        message:
          'La fecha límite expiró, pero todavía puedes entregar.',
      };
    }

    return {
      type: 'closed',
      title: 'Actividad cerrada',
      message:
        'El docente ya no acepta entregas para esta actividad.',
    };
  });

  readonly loading = signal(true);
  readonly totalCases = computed(() => this.assignedCases().length);

  readonly completedCases = computed(
    () => this.assignedCases().filter((item) => item.submission?.status === 'SUBMITTED').length,
  );
  readonly pendingCases = computed(
    () => this.assignedCases().filter((item) => !item.submission).length,
  );

  ngOnInit() {
    const assignmentId = this.route.snapshot.paramMap.get('assignmentId');

    if (!assignmentId) return;

    this.assignedApi.findMyAssignedCasesByAssignment(assignmentId).subscribe({
      next: (cases) => {
        console.log('[Student Assignment]', cases);
        this.assignedCases.set(cases);
        this.loading.set(false);

        this.renderIcon();
      },

      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  openCase(id: string) {
    this.router.navigate(['/dashboard/student/assigned-cases', id]);
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
