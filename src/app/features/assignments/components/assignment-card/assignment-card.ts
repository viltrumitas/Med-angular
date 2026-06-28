import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AssignmentListItem } from '../../models/assignment-list.model';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [ButtonComponent, DatePipe],
  templateUrl: './assignment-card.html',
  styleUrl: './assignment-card.scss',
})
export class AssignmentCard {

  @Input({ required: true })
  assignment!: AssignmentListItem;

  @Output()
  viewAssignment = new EventEmitter<string>();

  open() {
    this.viewAssignment.emit(this.assignment.id);
  }

}