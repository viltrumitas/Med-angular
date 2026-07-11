import { AssignmentSummaryModel } from './assignment-summary.model';
import { User } from '../../../core/models/user.model';
import { ClassroomModel } from './classroom.model';

export interface ClassroomTeacherDetailModel extends ClassroomModel {

  code: string;

  isActive: boolean;

  studentsCount: number;



  assignments: AssignmentSummaryModel[];

  students: User[];
}