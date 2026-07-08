import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentSummaryModel } from '../../models/assignment-summary.model';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [],
  templateUrl: './assignment-card.html',
  styleUrl: './assignment-card.scss',
})
export class AssignmentCard implements AfterViewInit {
  @Input({ required: true })
  assignment!: AssignmentSummaryModel;

  @Output()
  viewAssignment = new EventEmitter<string>();

  open() {
    this.viewAssignment.emit(this.assignment.id);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
