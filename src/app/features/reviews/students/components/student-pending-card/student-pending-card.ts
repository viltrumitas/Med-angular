import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ButtonComponent } from '../../../../../shared/components/button/button';
import { SubmissionsListItem } from '../../../models/submissions-list.model';

@Component({
  selector: 'app-student-pending-card',
  standalone: true,
  imports: [ButtonComponent, DatePipe],
  templateUrl: './student-pending-card.html',
  styleUrl: './student-pending-card.scss',
})
export class StudentPendingCard {
  @Input({ required: true })
  submission!: SubmissionsListItem;

  @Output()
  submissionSelected = new EventEmitter<SubmissionsListItem>();

  open() {
    this.submissionSelected.emit(this.submission);
  }
}
