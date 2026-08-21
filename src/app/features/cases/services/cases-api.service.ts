import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseResponseDto } from '../dto/case-response.dto';
import { CreateCaseModel } from '../dto/create-case.dto';

@Service()
export class CasesApi {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  createCase(data: CreateCaseModel) {
    return this.http.post<CaseResponseDto>(
      `${this.apiUrl}/cases`,
      data
    );
  }

  publishCase(id: string): Observable<CaseResponseDto> {
    return this.http.patch<CaseResponseDto>(`${this.apiUrl}/cases/${id}/publish`, {});
  }
}
