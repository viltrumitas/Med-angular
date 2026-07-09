import { ClassroomResponseDto } from '../dto/classroon-response.dto';
import { ClassroomModel } from '../models/classroom.model';

export function mapClassroomResponse(dto: ClassroomResponseDto): ClassroomModel {
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
