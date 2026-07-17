import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionApi } from '../../../../submissions/service/submission-api.service';
import { SubmissionsListItem } from '../../../models/submissions-list.model';
import { StudentPendingCard } from "../../components/student-pending-card/student-pending-card";

@Component({
  selector: 'app-my-pending',
  standalone: true,
  imports: [StudentPendingCard],
  templateUrl: './my-pending.html',
  styleUrl: './my-pending.scss',
})
export class MyPending implements OnInit {
  private readonly router = inject(Router);
  private readonly submissionService = inject(SubmissionApi);

  submissions = signal<SubmissionsListItem[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.loading.set(true);

    this.submissionService.findPendingStudent().subscribe({
      next: (data) => {
        this.submissions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  openSubmission(submission: SubmissionsListItem) {
    console.log('Submission seleccionada:', submission);

    if (submission.status === 'DRAFT') {
      console.log('assignedCaseId:', submission.assignedCaseId);

      this.router.navigate([
        '/dashboard/student/assigned-cases',
        submission.assignedCaseId,
      ]);

      return;
    }

    console.log('submission id:', submission.id);

    this.router.navigate([
      '/dashboard/student/submissions',
      submission.id,
    ]);
  }
}
