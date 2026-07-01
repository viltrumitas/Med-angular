import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AssignedCaseApiService } from '../../services/assigned-case-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AssignedStudentCase } from '../../model/assigned-case.model';
import { DatePipe } from '@angular/common';
import { CaseContent } from '../../../cases/pages/case-content/case-content';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-assigned-detail',
  imports: [CaseContent, ButtonComponent],
  templateUrl: './assigned-detail.html',
  styleUrl: './assigned-detail.scss',
})
export class AssignedDetail implements OnInit {
  private readonly assignedApi = inject(AssignedCaseApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  assignedCase = signal<AssignedStudentCase | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[CaseDetail] Id extraido de la ruta:', id);
    if (!id) return;

    this.isLoading.set(true);

    this.assignedApi
      .findById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.assignedCase.set(response);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('[CaseDetail] Error al cargar el caso: ', err);
          this.error.set('No se pudo cargar el caso');
          this.isLoading.set(false);
        },
      });
  }

  startSubmission(): void {
    const id = this.assignedCase()?.id;
    if (!id) return;

    this.assignedApi
      .startSubmission(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (submission) => {
          this.router.navigate(['/dashboard/student/submission', submission.id]);
        },
        error: (err) => {
          console.error('[AsignedDetail] Error al iniciar submisison:', err);
          this.error.set('No se pudo iniciar el caso. Intenta de nuevo');
        },
      });
  }
}
