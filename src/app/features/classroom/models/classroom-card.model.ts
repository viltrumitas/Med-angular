import { ClassroomTeacherModel } from './classroom-teacher.model';
import { ClassroomStudentModel } from './classroom-student.model';

export type ClassroomCardModel =
  | ClassroomTeacherModel
  | ClassroomStudentModel;