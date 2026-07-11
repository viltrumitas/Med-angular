import { ClassroomTeacherDetailModel } from './classroom-teacher-detail.model';
import { ClassroomStudentDetailModel } from './classroom-student-detail.model';

export type ClassroomDetailModel =
  | ClassroomTeacherDetailModel
  | ClassroomStudentDetailModel;