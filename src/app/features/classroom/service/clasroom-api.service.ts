import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClassroomModel } from '../models/classroom.model';
import { ClassroomDetailModel } from '../models/classroom-detail.model';
import { User } from '../../../core/models/user.model';
import { CreateClassroomDto } from '../dto/create-classroom.dto';
import { UpdateClassroomDto } from '../dto/update-classroom.dto';
import { JoinClassroomDto } from '../dto/join-classroom.dto';
import { CreateAssignment } from '../../assignments/models/create-assignment.model';
import { Assignment } from '../models/assignment.model';
import { ClassroomTeacherModel } from '../models/classroom-teacher.model';
import { ClassroomStudentModel } from '../models/classroom-student.model';
import { ClassroomTeacherDetailModel } from '../models/classroom-teacher-detail.model';
import { ClassroomStudentDetailModel } from '../models/classroom-student-detail.model';

@Service()
export class ClassroomApi {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/classrooms`;

  create(dto: CreateClassroomDto): Observable<ClassroomModel> {
    return this.http.post<ClassroomModel>(this.api, dto);
  }

  createAssignment(classroomId: string, dto: CreateAssignment): Observable<Assignment> {
    return this.http.post<Assignment>(`${this.api}/${classroomId}/assignments`, dto);
  }

  join(dto: JoinClassroomDto): Observable<ClassroomStudentModel> {
    return this.http.post<ClassroomStudentModel>(`${this.api}/join`, dto);
  }

  findMy<T>(): Observable<T> {
    return this.http.get<T>(`${this.api}/my`);
  }


  findTeacherDetail(id: string) {
    return this.http.get<ClassroomTeacherDetailModel>(
      `${this.api}/${id}`
    )
  }

  findStudentDetail(id: string) {
    return this.http.get<ClassroomStudentDetailModel>(
      `${this.api}/${id}`
    )
  }

  update(id: string, dto: UpdateClassroomDto): Observable<ClassroomModel> {
    return this.http.patch<ClassroomModel>(`${this.api}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getStudents(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/${id}/students`);
  }
}
