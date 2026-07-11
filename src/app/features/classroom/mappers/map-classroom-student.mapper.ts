import { ClassroomStudentResponseDto } from '../dto/classroom-student-response.dto';
import { ClassroomStudentModel } from '../models/classroom-student.model';

export function mapClassroomStudent(dto: ClassroomStudentResponseDto): ClassroomStudentModel {
  return {
    id: dto.id,

    name: dto.name,

    description: dto.description,

    teacher: dto.teacher,

    assignmentsCount: dto.assignmentsCount,

    createdAt: dto.createdAt,

    updatedAt: dto.updatedAt,
  };
}
