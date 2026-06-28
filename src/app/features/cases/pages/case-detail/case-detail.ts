import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GetCasesApi } from '../../services/get-cases-api.service';
import { ActivatedRoute } from '@angular/router';
import { CaseResponseDto } from '../../dto/case-response.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-case-detail',
  imports: [],
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.scss',
})
export class CaseDetail implements OnInit {
  private readonly caseService = inject(GetCasesApi);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  case = signal<CaseResponseDto | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[CaseDetail] ID extraído de la ruta:', id);
    if (!id) return;

    this.isLoading.set(true);

    this.caseService
      .getCaseById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (reponse) => {
          this.case.set(reponse);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('[CaseDetail] Error al cargar el caso: ', err);
          this.error.set('No se pudo cargar el caso ');
          this.isLoading.set(false);
        },
      });
  }
}
