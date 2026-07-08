import { AfterViewInit, Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomApi } from '../../service/clasroom-api.service';
import { ClassroomDetailModel } from '../../models/classroom-detail.model';
import { AssignmentCreate } from '../../components/assignment-create/assignment-create';
import { AssignmentCard } from '../../components/assignment-card/assignment-card';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-classroom-detail',
  standalone: true,
  imports: [AssignmentCreate, AssignmentCard],
  templateUrl: './classroom-detail.html',
  styleUrl: './classroom-detail.scss',
})
export class ClassroomDetail implements AfterViewInit, OnInit {
  private readonly api = inject(ClassroomApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly classroom = signal<ClassroomDetailModel | null>(null);
  readonly loading = signal(true);

  readonly activeTab = signal<'assignments' | 'students'>('assignments');
  readonly showCreateAssignment = signal(false);

  ngOnInit() {
    this.loadClassroom();
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  loadClassroom() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findOne(id).subscribe({
      next: (data) => {
        this.classroom.set(data);
        this.loading.set(false);
        this.renderIcon();
      },
      error: () => {
        this.loading.set(false);
        this.renderIcon();
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
    this.showCreateAssignment.update((value) => !value);
    this.renderIcon();
  }

  changeTab(tab: 'assignments' | 'students') {
    this.activeTab.set(tab);
    this.renderIcon();
  }

  // =========================
  // MODAL
  // =========================

  openCreateAssignment(): void {
    this.showCreateAssignment.set(true);
    document.body.style.overflow = 'hidden';
    this.renderIcon();
  }

  closeCreateAssignment(): void {
    this.showCreateAssignment.set(false);
    document.body.style.overflow = '';
  }

  onAssignmentCreated(): void {
    this.closeCreateAssignment();
    this.loadClassroom();
  }

  reload() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findOne(id).subscribe((data) => {
      this.classroom.set(data);
      this.showCreateAssignment.set(false);
      this.renderIcon();
    });
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
