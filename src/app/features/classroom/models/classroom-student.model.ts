import { ClassroomModel } from './classroom.model';

export interface ClassroomStudentModel extends ClassroomModel {

  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
}