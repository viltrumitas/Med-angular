import { AfterViewInit, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClassroomModel } from '../../models/classroom.model';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-classroom-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './classroom-card.html',
  styleUrl: './classroom-card.scss',
})
export class ClassroomCardComponent implements AfterViewInit {
  classroom = input.required<ClassroomModel>();

  ngAfterViewInit(): void {
    createIcons({ icons });
  }
}
