import { AfterViewInit, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { ClassroomTeacherModel } from '../../models/classroom-teacher.model';
import { ClassroomStudentModel } from '../../models/classroom-student.model';


type ClassroomCardModel =
  | ClassroomTeacherModel
  | ClassroomStudentModel;


@Component({
  selector: 'app-classroom-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './classroom-card.html',
  styleUrl: './classroom-card.scss',
})
export class ClassroomCardComponent implements AfterViewInit {

  classroom = input.required<ClassroomCardModel>();


  isTeacherClassroom(): boolean {
    return 'code' in this.classroom();
  }


  get teacherClassroom(): ClassroomTeacherModel | null {
    const classroom = this.classroom();

    return 'code' in classroom
      ? classroom
      : null;
  }


  get studentClassroom(): ClassroomStudentModel | null {
    const classroom = this.classroom();

    return 'teacher' in classroom
      ? classroom
      : null;
  }


  ngAfterViewInit(): void {
    createIcons({ icons });
  }
}