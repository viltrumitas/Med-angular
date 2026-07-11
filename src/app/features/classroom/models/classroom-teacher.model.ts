import { ClassroomModel } from './classroom.model';

export interface ClassroomTeacherModel extends ClassroomModel {

  code: string;

  isActive: boolean;

  studentsCount: number;
}