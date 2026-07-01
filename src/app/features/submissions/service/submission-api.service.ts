import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Service()
export class SubmissionApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/submissions`;
}
