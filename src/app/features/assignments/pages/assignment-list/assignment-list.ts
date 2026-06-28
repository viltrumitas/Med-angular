import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';

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

  assignments: AssignmentListItem[] = [];

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.findMyAssignments().subscribe({
      next: (data) => {
        this.assignments = data;
      },
      error: (err) => {
        console.error(err);
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