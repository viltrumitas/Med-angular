import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UpdateSubmissionDto } from '../dto/update-submission.dto';
import { SubmissionResponseDto } from '../dto/submission-response.dto';

@Service()
export class SubmissionApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/submissions`;

  findOne(id: string): Observable<SubmissionResponseDto> {
    return this.http.get<SubmissionResponseDto>(`${this.api}/${id}`);
  }

  update(id: string, dto: UpdateSubmissionDto): Observable<SubmissionResponseDto> {
    return this.http.patch<SubmissionResponseDto>(`${this.api}/${id}`, dto);
  }

  submit(id: string): Observable<SubmissionResponseDto> {
    return this.http.patch<SubmissionResponseDto>(`${this.api}/${id}/submit`, {});
  }
}
