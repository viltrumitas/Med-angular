import { TeacherModel } from '../../cases/dto/teacher-response.dto';

export interface ClassroomResponseDto {
  id: string;
  name: string;
  description: string | null;
  code: string;
  teacher: TeacherModel;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
