import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ButtonComponent } from '../../../../shared/components/button/button';
import { SubmissionsListItem } from '../../models/submissions-list.model';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class SubmissionCard {
  readonly submission = input.required<SubmissionsListItem>();
  readonly viewSubmissions = output<string>();

  open(): void {
    this.viewSubmissions.emit(this.submission().id);
  }
}
