import {
  AfterViewInit,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, interval, startWith } from 'rxjs';
import { createIcons, icons } from 'lucide';
import { LateSubmissionPolicy } from '../../../../core/enum/late-submission-policy';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CaseContent } from '../../../cases/pages/case-content/case-content';
import { SubmissionsDetail } from '../../../submissions/components/submissions-detail/submissions-detail';
import { AssignedStudentCase } from '../../models/assigned-case.model';
import { AssignedCaseApiService } from '../../services/assigned-case-api.service';
import { ErrorService } from '../../../../core/services/error.service';

type AssignmentAvailability = 'NO_LIMIT' | 'AVAILABLE' | 'LATE_ALLOWED' | 'EXPIRED';

@Component({
  selector: 'app-assigned-detail',
  standalone: true,
  imports: [CaseContent, ButtonComponent, SubmissionsDetail],
  templateUrl: './assigned-detail.html',
  styleUrl: './assigned-detail.scss',
})
export class AssignedDetail implements OnInit, AfterViewInit {
  private readonly assignedApi = inject(AssignedCaseApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly errorService = inject(ErrorService);

  readonly submissionDetail = viewChild(SubmissionsDetail);
  readonly assignedCase = signal<AssignedStudentCase | null>(null);
  readonly isLoading = signal(true);
  readonly isStartingSubmission = signal(false);
  readonly casePanelOpen = signal(true);
  readonly submissionPanelOpen = signal(true);

  /**
   * Se actualiza cada minuto para que el estado de la fecha límite
   * cambie aunque el estudiante permanezca dentro de la página.
   */
  private readonly currentTime = signal(Date.now());

  readonly assignmentStatus = computed<AssignmentAvailability>(() => {
    const assignment = this.assignedCase()?.assignment;

    if (!assignment?.dueDate) {
      return 'NO_LIMIT';
    }

    const dueDate = new Date(assignment.dueDate).getTime();

    if (this.currentTime() <= dueDate) {
      return 'AVAILABLE';
    }

    return assignment.lateSubmissionPolicy === LateSubmissionPolicy.ACCEPT_LATE
      ? 'LATE_ALLOWED'
      : 'EXPIRED';
  });

  readonly canStartSubmission = computed(() => {
    const assignedCase = this.assignedCase();

    if (!assignedCase || this.isStartingSubmission()) {
      return false;
    }

    return this.assignmentStatus() !== 'EXPIRED';
  });

  readonly assignmentStatusLabel = computed(() => {
    switch (this.assignmentStatus()) {
      case 'NO_LIMIT':
        return 'Sin fecha límite';

      case 'AVAILABLE':
        return 'Disponible';

      case 'LATE_ALLOWED':
        return 'Entrega tardía permitida';

      case 'EXPIRED':
        return 'Actividad vencida';
    }
  });

  readonly assignmentStatusDescription = computed(() => {
    switch (this.assignmentStatus()) {
      case 'NO_LIMIT':
        return 'Puedes trabajar y enviar tu respuesta sin una fecha límite.';

      case 'AVAILABLE':
        return 'La actividad se encuentra disponible para responder.';

      case 'LATE_ALLOWED':
        return 'La fecha límite terminó, pero todavía puedes enviar una respuesta tardía.';

      case 'EXPIRED':
        return 'La fecha límite terminó y ya no se permiten nuevas entregas.';
    }
  });

  ngOnInit(): void {
    this.startDeadlineClock();

    const assignedCaseId = this.route.snapshot.paramMap.get('id');

    if (!assignedCaseId) {
      this.isLoading.set(false);
      return;
    }

    this.errorService.clear();
    this.loadAssignedCase(assignedCaseId);
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  toggleCasePanel(): void {
    this.casePanelOpen.update((isOpen) => !isOpen);
    this.renderIcons();
  }

  toggleSubmissionPanel(): void {
    this.submissionPanelOpen.update((isOpen) => !isOpen);
    this.renderIcons();
  }

  reload(): void {
    const assignedCaseId = this.route.snapshot.paramMap.get('id');

    if (!assignedCaseId || this.isLoading()) {
      return;
    }

    this.loadAssignedCase(assignedCaseId);
  }

  startSubmission(): void {
    const assignedCaseId = this.assignedCase()?.id;

    if (!assignedCaseId || !this.canStartSubmission()) {
      return;
    }

    this.errorService.clear();
    this.isStartingSubmission.set(true);

    this.assignedApi
      .startSubmission(assignedCaseId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isStartingSubmission.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: () => {
          this.loadAssignedCase(assignedCaseId, false);
          this.renderIcons();
        },
        error: () => {
          this.renderIcons();
        },
      });
  }

  saveSubmission(): void {
    const detail = this.submissionDetail();

    if (!detail) {
      return;
    }

    detail.save();
  }

  submitSubmission(): void {
    const detail = this.submissionDetail();

    if (!detail || this.assignmentStatus() === 'EXPIRED') {
      return;
    }

    detail.submit();
  }

  private loadAssignedCase(assignedCaseId: string, showPageLoading = true): void {
    if (showPageLoading) {
      this.isLoading.set(true);
    }

    this.errorService.clear();

    this.assignedApi
      .findById(assignedCaseId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (response) => {
          const isFirstLoad = this.assignedCase() === null;

          this.assignedCase.set(response);

          if (isFirstLoad) {
            this.configureResponsivePanels();
          }
        },
        error: () => {
          if (showPageLoading) {
            this.assignedCase.set(null);
          }
          this.renderIcons();
        },
      });
  }

  private startDeadlineClock(): void {
    interval(60_000)
      .pipe(startWith(0), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentTime.set(Date.now());
      });
  }

  private configureResponsivePanels(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      this.casePanelOpen.set(false);
      this.submissionPanelOpen.set(true);
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
