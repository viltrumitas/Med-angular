import { ENVIRONMENT_INITIALIZER, inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Service()
export class CasesApi {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  createCase(data: any) {
    return this.http.post(`${this.apiUrl}/cases`, data);
  }

  publishCase(id: string) {
    return this.http.patch(`${this.apiUrl}/cases/${id}/publish`, {});
  }
}
