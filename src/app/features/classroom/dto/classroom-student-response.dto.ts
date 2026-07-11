import { TeacherModel } from '../../cases/dto/teacher-response.dto';

export interface ClassroomStudentResponseDto {
  id: string;

  name: string;

  description: string | null;

  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };

  assignmentsCount: number;

  createdAt: string;

  updatedAt: string;
}
