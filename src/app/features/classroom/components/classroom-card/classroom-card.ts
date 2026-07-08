import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClassroomModel } from '../../models/classroom.model';

@Component({
  selector: 'app-classroom-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './classroom-card.html',
  styleUrl: './classroom-card.scss',
})
export class ClassroomCardComponent {
  classroom = input.required<ClassroomModel>();
}
