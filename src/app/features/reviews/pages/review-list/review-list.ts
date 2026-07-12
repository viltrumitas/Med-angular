import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SubmissionCard } from '../../components/review-card/review-card';
import { ReviewApi } from '../../services/review-api';
import { SubmissionsListItem } from '../../models/submissions-list.model';
import { SubmissionApi } from '../../../submissions/service/submission-api.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [SubmissionCard],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList implements OnInit {
  private readonly router = inject(Router);
  private readonly reviewsService = inject(ReviewApi);
  private readonly submissionsService = inject(SubmissionApi)

  submissions = signal<SubmissionsListItem[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.loading.set(true);

    this.submissionsService.findPending().subscribe({
      next: (data) => {
        this.submissions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  openSubmission(id: string) {
    this.router.navigate([
      '/dashboard/teacher/reviews/crear',
      id,
    ]);
  }
}
