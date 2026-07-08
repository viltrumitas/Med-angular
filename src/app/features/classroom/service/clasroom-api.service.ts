import { inject, Service } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ClassroomModel } from "../models/classroom.model";
import { ClassroomDetailModel } from "../models/classroom-detail.model";
import { User } from "../../../core/models/user.model";
import { CreateClassroomDto } from "../dto/create-classroom.dto";
import { UpdateClassroomDto } from "../dto/update-classroom.dto";
import { JoinClassroomDto } from "../dto/join-classroom.dto";
import { CreateAssignment } from "../../assignments/models/create-assignment.model";
import { Assignment } from "../models/assignment.model";

@Service()
export class ClassroomApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/classrooms`;

  create(dto: CreateClassroomDto): Observable<ClassroomModel> {
    return this.http.post<ClassroomModel>(this.api, dto)
  }

  createAssignment(classroomId: string, dto: CreateAssignment): Observable<Assignment> {
    return this.http.post<Assignment>(
      `${this.api}/${classroomId}/assignments`,
      dto
    )
  }

  join(dto: JoinClassroomDto): Observable<ClassroomModel> {
    return this.http.post<ClassroomModel>(
      `${this.api}/join`,
      dto
    )
  }

  findMy(): Observable<ClassroomModel[]> {
    return this.http.get<ClassroomModel[]>(
      `${this.api}/my`,
    ).pipe(
      tap(data => console.log('CLASSROOMS:', data))
    );
  }

  findOne(id: string): Observable<ClassroomDetailModel> {
    return this.http.get<ClassroomDetailModel>(
      `${this.api}/${id}`
    );
  }

  update(
    id: string,
    dto: UpdateClassroomDto,
  ): Observable<ClassroomModel> {
    return this.http.patch<ClassroomModel>(
      `${this.api}/${id}`,
      dto,
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/${id}`,
    );
  }

  getStudents(id: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.api}/${id}/students`,
    );
  }
}
