import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { createIcons, icons } from 'lucide';

import { ErrorService } from '../../../../../core/services/error.service';

import { ClassroomCardComponent } from '../../../components/classroom-card/classroom-card';
import { ClassroomTeacherModel } from '../../../models/classroom-teacher.model';
import { ClassroomApi } from '../../../service/clasroom-api.service';

import { CreateClassroom } from '../create-classroom/create-classroom';
import { Modal } from '../../../../../shared/components/modal/modal';
import { ButtonComponent } from '../../../../../shared/components/button/button';

@Component({
  selector: 'app-classroom-list',
  standalone: true,
  imports: [ClassroomCardComponent, CreateClassroom, Modal, ButtonComponent],
  templateUrl: './classroom-list.html',
  styleUrl: './classroom-list.scss',
})
export class ClassroomList implements OnInit, AfterViewInit {
  private readonly api = inject(ClassroomApi);
  private readonly errorService = inject(ErrorService);
  private readonly destroyRef = inject(DestroyRef);

  readonly classrooms = signal<ClassroomTeacherModel[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly showCreateClassroom = signal(false);

  ngOnInit(): void {
    this.loadClassrooms();
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  loadClassrooms(): void {
    if (this.loading() && this.classrooms().length > 0) {
      return;
    }

    this.errorService.clear();
    this.loadError.set(null);
    this.loading.set(true);

    this.api
      .findMy<ClassroomTeacherModel[]>()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading.set(false);
          this.renderIcons();
        }),
      )
      .subscribe({
        next: (classrooms) => {
          this.classrooms.set(classrooms);
        },
        error: () => {},
      });
  }

  openCreateClassroom(): void {
    this.errorService.clear();
    this.showCreateClassroom.set(true);
  }

  closeCreateClassroom(): void {
    this.showCreateClassroom.set(false);
    this.errorService.clear();
  }

  onClassroomCreated(): void {
    this.showCreateClassroom.set(false);
    this.loadClassrooms();
  }

  private renderIcons(): void {
    queueMicrotask(() => {
      createIcons({ icons });
    });
  }
}
