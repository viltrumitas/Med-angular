import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssignedCaseApiService } from '../../services/assigned-case-api.service';
import { AssignedStudentCase } from '../../models/assigned-case.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorService } from '../../../../core/services/error.service';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-assigned-list',
  imports: [RouterLink],
  templateUrl: './assigned-list.html',
  styleUrl: './assigned-list.scss',
})
export class AssignedList implements OnInit {
  private readonly assignedApi = inject(AssignedCaseApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errorService = inject(ErrorService);

  readonly assignedCase = signal<AssignedStudentCase[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.errorService.clear();

    this.assignedApi
      .findMyAssignedCase()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responde) => {
          this.assignedCase.set(responde);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  private renderIcons(): void {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
