import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AssignedCaseApiService } from '../../services/assigned-case-api.service';
import { AssignedStudentCase } from '../../model/assigned-case.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-assigned-list',
  imports: [RouterLink],
  templateUrl: './assigned-list.html',
  styleUrl: './assigned-list.scss',
})
export class AssignedList implements OnInit {
  private readonly assignedApi = inject(AssignedCaseApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly assignedCase = signal<AssignedStudentCase[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.assignedApi
      .findMyAssignedCase()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responde) => {
          this.assignedCase.set(responde);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('[AssignedCases] Error al cargar los casos asignados', err);
          this.error.set('No se pudieron cargar tus casos asignados. Intenta de nuevo');
          this.isLoading.set(false);
        },
      });
  }
}
