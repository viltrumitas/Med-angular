import { TeacherModel } from '../../cases/dto/teacher-response.dto';

export interface ClassroomResponseDto {
  id: string;
  name: string;
  description: string | null;
  code: string;
  isActive: boolean;
  studentsCount: number;
  assignmentsCount: number;
  createdAt: string;
  updatedAt: string;
}
