import { AfterViewInit, Component, inject, OnInit, signal, computed } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { AssignedCaseApiService } from '../../../../assigned-case/services/assigned-case-api.service';
import { AssignedStudentCase } from '../../../../assigned-case/model/assigned-case.model';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetail implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly assignedApi = inject(AssignedCaseApiService);

  readonly assignedCases = signal<AssignedStudentCase[]>([]);
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
