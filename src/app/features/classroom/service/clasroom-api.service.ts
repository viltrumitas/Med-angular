import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { map, Observable } from 'rxjs';
import { Classroom } from '../classroom';
import { mapClassroom } from '../mappers/map-clasroom.mapper';
import { ClassroomResponseDto } from '../dto/classroon-response.dto';
import { JoinClassroomDto } from '../dto/join-classroom.dto';

@Service()
export class ClasroomApiService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/classroom`;

  create(dto: CreateClassroomDto): Observable<Classroom> {
    return this.http.post<ClassroomResponseDto>(this.api, dto).pipe(map(mapClassroom));
  }

  join(dto: JoinClassroomDto) {
    return this.http.post(`${this.api}/join`, dto);
  }
}
