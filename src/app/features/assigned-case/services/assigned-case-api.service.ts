import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { AssignedStudentCase } from '../model/assigned-case.model';
import { AssignedCaseMapper } from '../mapper/assigned-case.mapper';
import { AssignedCaseDto } from '../dto/assigned-case.dto';

@Service()
export class AssignedCaseApiService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/assigned-case`;

  findMyAssignedCase(): Observable<AssignedStudentCase[]> {
    return this.http
      .get<AssignedCaseDto[]>(`${this.api}/my`)
      .pipe(map((dtos) => dtos.map(AssignedCaseMapper.toModel)));
  }

  findById(id: string): Observable<AssignedStudentCase> {
    return this.http
      .get<AssignedCaseDto>(`${this.api}/${id}`)
      .pipe(map(AssignedCaseMapper.toModel));
  }
}
