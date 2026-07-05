import { ClassroomResponseDto } from '../dto/classroon-response.dto';

export function mapClassroom(dto: ClassroomResponseDto) {
  return {
    ...dto,
    createdAt: new Date(dto.createdAt),
    update: new Date(dto.updatedAt),
  };
}

// getById(id: string): Observable<Classroom> {
//   return this.http
//     .get<ClassroomResponseDto>(...)
//     .pipe(map(mapClassroom));
// }
