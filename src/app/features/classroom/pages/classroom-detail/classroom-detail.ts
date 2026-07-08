import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomApi } from '../../service/clasroom-api.service';
import { ClassroomDetailModel } from '../../models/classroom-detail.model';
import { AssignmentCreate } from "../../components/assignment-create/assignment-create";
import { AssignmentCard } from '../../components/assignment-card/assignment-card';

@Component({
  selector: 'app-classroom-detail',
  standalone: true,
  imports: [AssignmentCreate, AssignmentCard],
  templateUrl: './classroom-detail.html',
  styleUrl: './classroom-detail.scss',
})
export class ClassroomDetail {
  private readonly api = inject(ClassroomApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly classroom = signal<ClassroomDetailModel | null>(null);
  readonly loading = signal(true);

  readonly activeTab = signal<'assignments' | 'students'>('assignments');
  readonly showCreateAssignment = signal(false);



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findOne(id).subscribe({
      next: (data) => {
        this.classroom.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  openAssignment(assignmentId: string) {
    const classroomId = this.classroom()!.id;

    this.router.navigate([
      '/dashboard/teacher/classroom',
      classroomId,
      'assignments',
      assignmentId,
    ]);
  }

  toggleCreateAssignment() {
    this.showCreateAssignment.update(value => !value);
  }

  changeTab(tab: 'assignments' | 'students') {
    this.activeTab.set(tab);
  }

  reload() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findOne(id).subscribe(data => {
      this.classroom.set(data);
      this.showCreateAssignment.set(false);
    });
  }
}
