import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AssignmentSummaryModel } from '../../models/assignment-summary.model';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [ButtonComponent,],
  templateUrl: './assignment-card.html',
  styleUrl: './assignment-card.scss',
})
export class AssignmentCard {

  @Input({ required: true })
  assignment!: AssignmentSummaryModel;

  @Output()
  viewAssignment = new EventEmitter<string>();

  open() {
    this.viewAssignment.emit(this.assignment.id);
  }

}