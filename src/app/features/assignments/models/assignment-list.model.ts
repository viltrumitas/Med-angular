import { TeacherModel } from "../../cases/dto/teacher-response.dto";

export interface AssignmentListItem {
  id: string;
  title: string;

  teacher: TeacherModel;

  isPublished: boolean;

  createdAt: string;
  updatedAt: string;
}