import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

import { ClassroomApi } from '../../../service/clasroom-api.service';
import { ClassroomStudentDetailModel } from '../../../models/classroom-student-detail.model';
import { AssignmentCard } from '../../../components/assignment-card/assignment-card';

@Component({
  selector: 'app-classroom-detail',
  standalone: true,
  imports: [AssignmentCard],
  templateUrl: './classroom-detail.html',
  styleUrl: './classroom-detail.scss',
})
export class ClassroomDetail implements OnInit, AfterViewInit {
  private readonly api = inject(ClassroomApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly classroom = signal<ClassroomStudentDetailModel | null>(null);

  readonly loading = signal(true);

  ngOnInit() {
    this.loadClassroom();
  }

  ngAfterViewInit() {
    this.renderIcon();
  }

  loadClassroom() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findStudentDetail(id).subscribe({
      next: (data) => {
        this.classroom.set(data);
        this.loading.set(false);

        this.renderIcon();
      },

      error: () => {
        this.loading.set(false);
      },
    });
  }

  openAssignment(id: string) {
    this.router.navigate([
      '/dashboard/student/classrooms',
      this.classroom()!.id,
      'assignments',

      id,
    ]);
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
