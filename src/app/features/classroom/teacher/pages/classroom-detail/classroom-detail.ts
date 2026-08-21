import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { createIcons, icons } from 'lucide';
import { ErrorService } from '../../../../../core/services/error.service';
import { AssignmentCard } from '../../../components/assignment-card/assignment-card';
import { AssignmentCreate } from '../../../components/assignment-create/assignment-create';
import { StudentCard } from '../../../components/student-card/student-card';
import { ClassroomTeacherDetailModel } from '../../../models/classroom-teacher-detail.model';
import { ClassroomApi } from '../../../service/clasroom-api.service';
import { SubmissionsListItem } from '../../../../reviews/models/submissions-list.model';
import { SubmissionApi } from '../../../../submissions/service/submission-api.service';
import { Modal } from '../../../../../shared/components/modal/modal';
import { ButtonComponent } from '../../../../../shared/components/button/button';

type ClassroomTab = 'assignments'| 'evaluations' | 'students' | 'pending';

@Component({
  selector: 'app-classroom-detail',
  standalone: true,
  imports: [AssignmentCreate, AssignmentCard, StudentCard, Modal, ButtonComponent],
  templateUrl: './classroom-detail.html',
  styleUrl: './classroom-detail.scss',
})
export class ClassroomDetail implements OnInit, AfterViewInit {
  private readonly api = inject(ClassroomApi);
  private readonly submissionApi = inject(SubmissionApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly errorService = inject(ErrorService);
  private readonly destroyRef = inject(DestroyRef);

  readonly classroom = signal<ClassroomTeacherDetailModel | null>(null);
  readonly loading = signal(true);

  readonly pendingReviews = signal<SubmissionsListItem[]>([]);
  readonly loadingPendingReviews = signal(false);
  readonly pendingReviewsError = signal<string | null>(null);

  readonly activeTab = signal<ClassroomTab>('assignments');
  readonly showCreateAssignment = signal(false);

  ngOnInit(): void {
    this.loadClassroom();
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  loadClassroom(): void {
    const classroomId = this.getClassroomId();

    if (!classroomId) {
      this.loading.set(false);
      return;
    }

    this.errorService.clear();
    this.loading.set(true);

    this.api
      .findTeacherDetail(classroomId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (classroom) => {
          this.classroom.set(classroom);
          this.loadPendingReviews(classroom.id);
        },
        error: () => {
          this.classroom.set(null);
          this.pendingReviews.set([]);
        },
      });
  }

  loadPendingReviews(classroomId?: string): void {
    const resolvedClassroomId = classroomId ?? this.classroom()?.id;

    if (!resolvedClassroomId || this.loadingPendingReviews()) {
      return;
    }

    this.pendingReviewsError.set(null);
    this.loadingPendingReviews.set(true);

    this.submissionApi
      .findPendingByClassroom(resolvedClassroomId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loadingPendingReviews.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (submissions) => {
          this.pendingReviews.set(submissions);
        },
        error: () => {
          this.pendingReviews.set([]);
          this.pendingReviewsError.set('No pudimos cargar las revisiones pendientes.');
        },
      });
  }

  openSubmissionReview(submissionId: string): void {
    const classroomId = this.classroom()?.id;

    if (!classroomId) {
      return;
    }

    void this.router.navigate(['/dashboard/teacher/reviews/crear', submissionId], {
      queryParams: {
        classroomId,
      },
    });
  }

  openAssignment(assignmentId: string): void {
    const classroomId = this.classroom()?.id;

    if (!classroomId) {
      return;
    }

    void this.router.navigate([
      '/dashboard/teacher/classrooms',
      classroomId,
      'assignments',
      assignmentId,
    ]);
  }

  changeTab(tab: ClassroomTab): void {
    if (this.activeTab() === tab) {
      return;
    }

    this.activeTab.set(tab);
    this.renderIcons();
  }

  openCreateAssignment(): void {
    this.errorService.clear();
    this.showCreateAssignment.set(true);
  }

  closeCreateAssignment(): void {
    this.showCreateAssignment.set(false);
    this.errorService.clear();
  }

  onAssignmentCreated(): void {
    this.showCreateAssignment.set(false);
    this.loadClassroom();
  }

  retryPendingReviews(): void {
    this.loadPendingReviews();
  }

  private getClassroomId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  private renderIcons(): void {
    queueMicrotask(() => {
      createIcons({ icons });
    });
  }
}
