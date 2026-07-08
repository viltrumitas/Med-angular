import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GetCasesApi } from '../../services/get-cases-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseResponseDto } from '../../dto/case-response.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CasesApi } from '../../services/cases-api.service';
import { CaseContent } from '../case-content/case-content';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-case-detail',
  imports: [CaseContent],
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.scss',
})
export class CaseDetail implements OnInit, AfterViewInit {
  private readonly getCaseService = inject(GetCasesApi);
  private readonly casesApi = inject(CasesApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  case = signal<CaseResponseDto | null>(null);
  isLoading = signal(false);
  isPublishing = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[CaseDetail] ID extraído de la ruta:', id);
    if (!id) return;

    this.isLoading.set(true);

    this.getCaseService
      .getCaseById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (reponse) => {
          this.case.set(reponse);
          this.isLoading.set(false);
          this.renderIcon();
        },
        error: (err) => {
          console.error('[CaseDetail] Error al cargar el caso: ', err);
          this.error.set('No se pudo cargar el caso ');
          this.isLoading.set(false);
          this.renderIcon();
        },
      });
  }

  ngAfterViewInit(): void {
    this.renderIcon();
  }

  publishCase() {
    const id = this.case()?.id;
    if (!id) return;

    this.isPublishing.set(true);

    this.casesApi
      .publishCase(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.case.set(response);
          this.isPublishing.set(false);
          this.router.navigate(['/dashboard/teacher/cases']);
        },
        error: (err) => {
          console.error('[CaseDetail] Error al publicar: ', err);
          this.isLoading.set(false);
        },
      });
  }

  editCase() {
    const id = this.case()?.id;
    if (!id) return;

    this.router.navigate(['/dashboard/teacher/cases/crear-caso'], {
      queryParams: { id },
    });
  }

  private renderIcon() {
    setTimeout(() => {
      createIcons({ icons });
    });
  }
}
