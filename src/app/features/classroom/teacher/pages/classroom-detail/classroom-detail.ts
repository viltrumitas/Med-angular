import { AfterViewInit, Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomApi } from '../../../service/clasroom-api.service';
import { ClassroomDetailModel } from '../../../models/classroom-detail.model';
import { AssignmentCreate } from '../../../components/assignment-create/assignment-create';
import { AssignmentCard } from '../../../components/assignment-card/assignment-card';
import { createIcons, icons } from 'lucide';
import { StudentCard } from '../../../components/student-card/student-card';
import { ClassroomTeacherDetailModel } from '../../../models/classroom-teacher-detail.model';
import { SubmissionApi } from '../../../../submissions/service/submission-api.service';
import { SubmissionsListItem } from '../../../../reviews/models/submissions-list.model';

@Component({
  selector: 'app-classroom-detail',
  standalone: true,
  imports: [AssignmentCreate, AssignmentCard, StudentCard],
  templateUrl: './classroom-detail.html',
  styleUrl: './classroom-detail.scss',
})
export class ClassroomDetail implements AfterViewInit, OnInit {
  private readonly api = inject(ClassroomApi);
  private readonly submissionApi = inject(SubmissionApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly classroom = signal<ClassroomTeacherDetailModel | null>(null);
  readonly loading = signal(true);

  readonly pendingReviews = signal<SubmissionsListItem[]>([]);
  readonly loadingPendingReviews = signal(false);

  readonly activeTab = signal<'assignments' | 'students' | 'pending'>('assignments');
  readonly showCreateAssignment = signal(false);

  ngOnInit() {
    this.loadClassroom();
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  loadClassroom() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findTeacherDetail(id).subscribe({
      next: (data) => {
        this.classroom.set(data);
        this.loading.set(false);
        this.loadPendingReviews();
        this.renderIcon();
      },
      error: () => {
        this.loading.set(false);
        this.renderIcon();
      },
    });
  }

  loadPendingReviews() {
    const classroomId = this.classroom()?.id;

    if (!classroomId) return;

    this.loadingPendingReviews.set(true);

    this.submissionApi.findPendingByClassroom(classroomId).subscribe({
      next: (submissions) => {
        console.log('[Pending reviews]', submissions);

        this.pendingReviews.set(submissions);
        this.loadingPendingReviews.set(false);
      },

      error: (err) => {
        console.error('Error cargando revisiones pendientes', err)

        this.loadingPendingReviews.set(false);
      }
    });
  }

  openSubmissionReview(submissionId: string) {
    this.router.navigate([
      '/dashboard/teacher/reviews/crear',
      submissionId,
    ], {
      queryParams: {
        classroomId: this.classroom()!.id
      }
    });
  }

  openAssignment(assignmentId: string) {
    const classroomId = this.classroom()!.id;

    this.router.navigate([
      '/dashboard/teacher/classrooms',
      classroomId,
      'assignments',
      assignmentId,
    ]);
  }

  toggleCreateAssignment() {
    this.showCreateAssignment.update((value) => !value);
    this.renderIcon();
  }

  changeTab(tab: 'assignments' | 'students' | 'pending') {
    this.activeTab.set(tab);
    this.renderIcon();
  }

  // =========================
  // MODAL
  // =========================

  openCreateAssignment(): void {
    this.showCreateAssignment.set(true);
    document.body.style.overflow = 'hidden';
    this.renderIcon();
  }

  closeCreateAssignment(): void {
    this.showCreateAssignment.set(false);
    document.body.style.overflow = '';
  }

  onAssignmentCreated(): void {
    this.closeCreateAssignment();
    this.loadClassroom();
  }

  reload() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findTeacherDetail(id).subscribe((data) => {
      this.classroom.set(data);
      this.showCreateAssignment.set(false);
      this.renderIcon();
    });
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
