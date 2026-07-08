import { Component, inject, signal } from '@angular/core';
import { ClassroomApi } from '../../service/clasroom-api.service';
import { ClassroomModel } from '../../models/classroom.model';
import { RouterLink } from '@angular/router';
import { ClassroomCardComponent } from '../../components/classroom-card/classroom-card';

@Component({
  selector: 'app-classroom-list',
  standalone: true,
  imports: [RouterLink, ClassroomCardComponent],
  templateUrl: './classroom-list.html',
  styleUrl: './classroom-list.scss',
})
export class ClassroomList {
  private readonly api = inject(ClassroomApi);

  readonly classrooms = signal<ClassroomModel[]>([]);
  readonly loading = signal(true);

  ngOnInit() {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.loading.set(true);

    this.api.findMy().subscribe({
      next: classrooms => {
        this.classrooms.set(classrooms);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
