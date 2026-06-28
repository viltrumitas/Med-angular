import { TeacherModel } from '../../cases/dto/teacher-response.dto';

export interface AssignmentResponseDto {
  id: string;

  title: string;

  description: string | null;

  teacher: TeacherModel;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
}
