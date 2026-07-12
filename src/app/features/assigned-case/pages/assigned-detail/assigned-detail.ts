import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AssignedCaseApiService } from '../../services/assigned-case-api.service';
import { AssignedStudentCase } from '../../model/assigned-case.model';

import { CaseContent } from '../../../cases/pages/case-content/case-content';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { SubmissionsDetail } from '../../../submissions/pages/submissions-detail/submissions-detail';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-assigned-detail',
  imports: [CaseContent, ButtonComponent, SubmissionsDetail],
  templateUrl: './assigned-detail.html',
  styleUrl: './assigned-detail.scss',
})
export class AssignedDetail implements OnInit, AfterViewInit {
  private readonly assignedApi = inject(AssignedCaseApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly submissionDetail = viewChild(SubmissionsDetail);
  readonly assignedCase = signal<AssignedStudentCase | null>(null);
  readonly isLoading = signal(false);
  readonly isStartingSubmission = signal(false);
  readonly error = signal<string | null>(null);
  readonly casePanelOpen = signal(true);
  readonly submissionPanelOpen = signal(true);

  toggleCasePanel(): void {
    this.casePanelOpen.update((isOpen) => !isOpen);
    this.renderIcon();
  }

  toggleSubmissionPanel(): void {
    this.submissionPanelOpen.update((isOpen) => !isOpen);
    this.renderIcon();
  }

  ngOnInit(): void {
    const assignedCaseId = this.route.snapshot.paramMap.get('id');

    if (!assignedCaseId) {
      this.error.set('No se encontró el identificador del caso asignado.');
      return;
    }

    this.loadAssignedCase(assignedCaseId);
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  startSubmission(): void {
    const assignedCaseId = this.assignedCase()?.id;

    if (!assignedCaseId || this.isStartingSubmission()) {
      return;
    }

    this.isStartingSubmission.set(true);
    this.error.set(null);

    this.assignedApi
      .startSubmission(assignedCaseId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadAssignedCase(assignedCaseId, false);
        },
        error: (err) => {
          console.error('[AssignedDetail] Error al iniciar la submission:', err);

          this.error.set('No se pudo iniciar la respuesta. Intenta nuevamente.');

          this.isStartingSubmission.set(false);
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
    if (!detail) {
      return;
    }
    detail.submit();
  }

  private loadAssignedCase(assignedCaseId: string, showPageLoading = true): void {
    if (showPageLoading) {
      this.isLoading.set(true);
    }

    this.error.set(null);

    this.assignedApi
      .findById(assignedCaseId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.assignedCase.set(response);
          this.isLoading.set(false);
          this.isStartingSubmission.set(false);
          this.configureResponsivePanels();
        },
        error: (err) => {
          console.error('[AssignedDetail] Error al cargar el caso asignado:', err);

          this.error.set('No se pudo cargar el caso.');

          this.isLoading.set(false);
          this.isStartingSubmission.set(false);
        },
      });
  }

  private configureResponsivePanels(): void {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      this.casePanelOpen.set(false);
      this.submissionPanelOpen.set(true);
    }
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
