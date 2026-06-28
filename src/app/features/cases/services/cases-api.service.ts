import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseResponseDto } from '../dto/case-response.dto';

@Service()
export class CasesApi {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  createCase(data: any) {
    return this.http.post(`${this.apiUrl}/cases`, data);
  }

  publishCase(id: string): Observable<CaseResponseDto> {
    return this.http.patch<CaseResponseDto>(`${this.apiUrl}/cases/${id}/publish`, {});
  }
}
