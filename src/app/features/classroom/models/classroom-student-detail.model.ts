import { AssignmentSummaryModel } from './assignment-summary.model';
import { ClassroomModel } from './classroom.model';

export interface ClassroomStudentDetailModel extends ClassroomModel {

  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };

  assignments: AssignmentSummaryModel[];
}