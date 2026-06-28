import { TeacherModel } from "../../cases/dto/teacher-response.dto";


export interface Assignment {
  id: string;

  title: string;

  description: string | null;

  teacher: TeacherModel;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
}