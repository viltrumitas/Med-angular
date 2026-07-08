import { Component, inject, signal, computed, AfterViewInit, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentApi } from '../../../../assignments/services/assignment-api';
import { AssignmentDetail as AssignmentDetailModel } from '../../../models/assignment-detail.model';
import { createIcons, icons } from 'lucide';

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
