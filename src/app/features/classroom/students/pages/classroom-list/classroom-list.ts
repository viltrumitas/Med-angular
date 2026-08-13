import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';

import { Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { ClassroomApi } from '../../../service/clasroom-api.service';
import { ClassroomStudentModel } from '../../../models/classroom-student.model';
import { JoinClassroom } from '../../../components/join-classroom/join-classroom';
import { ErrorService } from '../../../../../core/services/error.service';

@Component({
  selector: 'app-classroom-list',
  standalone: true,
  imports: [JoinClassroom],
  templateUrl: './classroom-list.html',
  styleUrl: './classroom-list.scss',
})
export class ClassroomList implements OnInit, AfterViewInit {
  private readonly api = inject(ClassroomApi);
  private readonly router = inject(Router);
  private readonly errorService = inject(ErrorService);

  readonly classrooms = signal<ClassroomStudentModel[]>([]);
  readonly loading = signal(true);
  readonly isJoinModalOpen = signal(false);

  ngOnInit() {
    this.loadClassrooms();
  }

  ngAfterViewInit() {
    this.renderIcon();
  }

  loadClassrooms() {
    this.loading.set(true);

    this.api.findMy<ClassroomStudentModel[]>().subscribe({
      next: (classrooms) => {
        console.log('[Student Classroom]', classrooms);
        this.classrooms.set(classrooms);
        this.loading.set(false);
        this.renderIcon();
      },

      error: () => {
        this.loading.set(false);
        this.renderIcon();
      },
    });
  }

  openClassroom(id: string) {
    this.router.navigate(['/dashboard/student/classrooms', id]);
  }

  onClassroomJoined() {
    this.isJoinModalOpen.set(false);

    this.loadClassrooms();
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
