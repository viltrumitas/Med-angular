import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Assignment } from '../../classroom/models/assignment.model';
import { AssignmentDetail } from '../../classroom/models/assignment-detail.model';
import { AssignmentListItem } from '../../classroom/models/assignment-list.model';
import { CreateAssignment } from '../models/create-assignment.model';
import { HttpClient } from '@angular/common/http';
import { AssignmentResponseDto } from '../dto/assignment-response.dto';
import { AssignmentListResponseDto } from '../dto/assignment-list-response.dto';
import { AssignmentDetailResponseDto } from '../dto/assignment-detail-response.dto';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

@Service()
export class AssignmentApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/assignments`;

  create(dto: CreateAssignment): Observable<Assignment> {
    return this.http.post<AssignmentResponseDto>(this.api, dto).pipe(map(AssignmentMapper.toModel));
  }

  findMyAssignments(): Observable<AssignmentListItem[]> {
    return this.http
      .get<AssignmentListResponseDto[]>(`${this.api}/my`)
      .pipe(map((assignments) => assignments.map(AssignmentMapper.toListItem)));
  }

  findMyPublishedCases(): Observable<CaseResponseDto[]> {
    return this.http.get<CaseResponseDto[]>(`${environment.apiUrl}/assignments/my/published-cases`);
  }

  findOne(id: string): Observable<AssignmentDetail> {
    return this.http
      .get<AssignmentDetailResponseDto>(`${this.api}/${id}`)
      .pipe(map(AssignmentMapper.toDetail));
  }

  publish(id: string): Observable<AssignmentDetail> {
    return this.http
      .patch<AssignmentDetailResponseDto>(`${this.api}/${id}/publish`, {})
      .pipe(map(AssignmentMapper.toDetail));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
