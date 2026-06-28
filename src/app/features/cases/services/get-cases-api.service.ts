import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { CaseSummaryModel } from '../dto/case-summary.dto';
import { CaseResponseDto } from '../dto/case-response.dto';

@Service()
export class GetCasesApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCases(): Observable<CaseSummaryModel[]> {
    return this.http.get<CaseSummaryModel[]>(`${this.apiUrl}/cases/my`).pipe(
      tap((response) => {
        if (!environment.production) {
          console.log('[GetCasesApi] getCases: ', response);
        }
      }),
    );
  }

  getCaseById(id: string): Observable<CaseResponseDto> {
    return this.http.get<CaseResponseDto>(`${this.apiUrl}/cases/${id}`).pipe(
      tap((response) => {
        if (!environment.production) {
          console.log('[GetCasesApi] getCasesById: ', response);
        }
      }),
    );
  }
}
