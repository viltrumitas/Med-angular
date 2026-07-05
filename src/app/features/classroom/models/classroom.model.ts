import { TeacherModel } from '../../cases/dto/teacher-response.dto';

export interface Classroom {
  id: string;
  name: string;
  description: string | null;
  code: string;
  teacher: TeacherModel;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
