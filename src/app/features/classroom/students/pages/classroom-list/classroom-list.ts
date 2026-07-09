import { AfterViewInit, Component, effect, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { createIcons, icons } from 'lucide';

import { ClassroomApi } from '../../../service/clasroom-api.service';
import { ClassroomModel } from '../../../models/classroom.model';
import { JoinClassroom } from '../../../components/join-classroom/join-classroom';

@Component({
  selector: 'app-classroom-list',
  imports: [JoinClassroom],
  templateUrl: './classroom-list.html',
  styleUrl: './classroom-list.scss',
})
export class ClassroomList implements AfterViewInit {
  private readonly classroomApi = inject(ClassroomApi);

  readonly isJoinModalOpen = signal(false);

  readonly classroomsResource = resource({
    loader: () => this.fetchMyClassrooms(),
  });

  constructor() {
    effect(() => {
      this.classroomsResource.value();
      this.renderIcons();
    });
  }

  ngAfterViewInit(): void {
    this.renderIcons();
  }

  onClassroomJoined(): void {
    this.isJoinModalOpen.set(false);
    this.classroomsResource.reload();
  }

  private fetchMyClassrooms(): Promise<ClassroomModel[]> {
    return firstValueFrom(this.classroomApi.findMy());
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
