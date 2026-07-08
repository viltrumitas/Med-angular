import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { ClassroomApi } from '../../service/clasroom-api.service';
import { ClassroomModel } from '../../models/classroom.model';
import { RouterLink } from '@angular/router';
import { ClassroomCardComponent } from '../../components/classroom-card/classroom-card';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-classroom-list',
  standalone: true,
  imports: [RouterLink, ClassroomCardComponent],
  templateUrl: './classroom-list.html',
  styleUrl: './classroom-list.scss',
})
export class ClassroomList implements OnInit, AfterViewInit {
  private readonly api = inject(ClassroomApi);
  readonly classrooms = signal<ClassroomModel[]>([]);
  readonly loading = signal(true);

  ngOnInit() {
    this.loadClassrooms();
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  loadClassrooms() {
    this.loading.set(true);

    this.api.findMy().subscribe({
      next: (classrooms) => {
        console.log('[ClassroomList] Clases recibidas:', classrooms);
        this.classrooms.set(classrooms);
        this.loading.set(false);
        this.renderIcon();
      },
      error: () => {
        console.error('No se pudieron cargar las clases.');

        this.loading.set(false);
        this.renderIcon();
      },
    });
  }

  private renderIcon(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
