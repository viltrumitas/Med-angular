import { ClassroomTeacherResponseDto } from "../dto/classroom-teacher-response.dto";
import { ClassroomTeacherModel } from "../models/classroom-teacher.model";


export function mapClassroomTeacher(
  dto: ClassroomTeacherResponseDto
): ClassroomTeacherModel {

  return {

    id: dto.id,

    name: dto.name,

    description: dto.description,

    code: dto.code,

    isActive: dto.isActive,

    studentsCount: dto.studentsCount,

    assignmentsCount: dto.assignmentsCount,

    createdAt: dto.createdAt,

    updatedAt: dto.updatedAt,

  };
}
