import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AssignmentCard } from '../../components/assignment-card/assignment-card';
import { AssignmentApi } from '../../services/assignment-api';
import { AssignmentListItem } from '../../models/assignment-list.model';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [AssignmentCard],
  templateUrl: './assignment-list.html',
  styleUrl: './assignment-list.scss',
})
export class AssignmentList implements OnInit {

  private readonly router = inject(Router);
  private readonly assignmentService = inject(AssignmentApi);

  assignments = signal<AssignmentListItem[]>([]);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.loading.set(true);

    this.assignmentService.findMyAssignments().subscribe({
      next: (data) => {
        this.assignments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  openAssignment(id: string) {
    this.router.navigate([
      '/dashboard/teacher/assignments',
      id,
    ]);
  }
}