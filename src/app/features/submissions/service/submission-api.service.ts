import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UpdateSubmisson } from '../models/update-submission.model';
import { SubmissionResponseDto } from '../dto/submission-response.dto';

@Service()
export class SubmissionApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/submissions`;

  findOne(id: string): Observable<SubmissionResponseDto> {
    return this.http.get<SubmissionResponseDto>(`${this.api}/${id}`);
  }

  update(id: string, dto: UpdateSubmisson): Observable<SubmissionResponseDto> {
    return this.http.patch<SubmissionResponseDto>(`${this.api}/${id}`, dto);
  }

  submit(id: string): Observable<SubmissionResponseDto> {
    return this.http.patch<SubmissionResponseDto>(`${this.api}/${id}/submit`, {});
  }
}
