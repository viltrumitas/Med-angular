import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SubmissionsListItem } from '../../models/submissions-list.model';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [ButtonComponent, DatePipe],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class SubmissionCard {
  @Input({ required: true })
  submission!: SubmissionsListItem;

  @Output()
  viewSubmissions = new EventEmitter<string>();

  open() {
    this.viewSubmissions.emit(this.submission.id);
  }
}
