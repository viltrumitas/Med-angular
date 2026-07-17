import {
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubmissionsDetail } from '../../components/submissions-detail/submissions-detail';


@Component({
  selector: 'app-submission-detail-page',
  imports: [SubmissionsDetail],
  template: `
    @if (submissionId) {
      <app-submissions-detail 
        [submissionId]="submissionId"
      />
    }
  `,
})
export class SubmissionDetailPage implements OnInit {

  private readonly route = inject(ActivatedRoute);

  submissionId = '';

  ngOnInit(): void {

    this.submissionId =
      this.route.snapshot.paramMap.get('id') ?? '';

  }
}