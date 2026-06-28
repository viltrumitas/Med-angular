import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GetCasesApi } from '../../services/get-cases-api.service';
import { CaseSummaryModel } from '../../dto/case-summary.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cases-list',
  imports: [RouterLink],
  templateUrl: './cases-list.html',
  styleUrl: './cases-list.scss',
})
export class CasesList implements OnInit {
  private readonly casesApi = inject(GetCasesApi);
  private readonly destroyRed = inject(DestroyRef);

  cases = signal<CaseSummaryModel[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.casesApi
      .getCases()
      .pipe(takeUntilDestroyed(this.destroyRed))
      .subscribe({
        next: (response) => {
          this.cases.set(response);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('[Cases] Error al cargar los casos:', err);
          this.error.set('No se pudieron cargar los casos. Intenta de nuevo.');
          this.isLoading.set(false);
        },
      });
  }
}
