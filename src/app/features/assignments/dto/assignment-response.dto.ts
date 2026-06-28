import { TeacherModel } from "../../cases/models/teacher-response.model";

export interface AssignmentResponseDto {
  id: string;

  title: string;

  description: string | null;

  teacher: TeacherModel;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
}