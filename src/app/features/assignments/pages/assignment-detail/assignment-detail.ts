import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AssignmentApi } from '../../services/assignment-api';
import { AssignmentDetail as AssignmentDetailModel } from '../../models/assignment-detail.model';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-assignment-detail',
  imports: [ButtonComponent, DatePipe],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.scss',
})
export class AssignmentDetailPage {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(AssignmentApi);

  assignment = signal<AssignmentDetailModel | null>(null);

  loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.api.findOne(id).subscribe({
      next: assignment => {
        console.log('NEXT');
        console.log(assignment);

        this.assignment.set(assignment);

        console.log('loading antes:', this.loading());
        this.loading.set(false);
        console.log('loading después:', this.loading());
      },

      error: err => {
        console.error('ERROR', err);
        this.loading.set(false);
      },

      complete: () => {
        console.log('COMPLETE');
      }
    });
  }

  publish() {
    const assignment = this.assignment();

    if (!assignment) return;

    this.api.publish(assignment.id).subscribe({
      next: updated => {
        this.assignment.set(updated);
      }
    });
  }

  delete() {
    const assignment = this.assignment();

    if (!assignment) return;

    if (!confirm('¿Eliminar actividad?')) return;

    this.api.delete(assignment.id).subscribe(() => {
      this.router.navigate(['/dashboard/teacher/assignments']);
    });
  }
}