import { TeacherModel } from "../../cases/models/teacher-response.model";

export interface AssignmentListItem {
  id: string;
  title: string;

  teacher: TeacherModel;

  isPublished: boolean;

  createdAt: string;
  updatedAt: string;
}