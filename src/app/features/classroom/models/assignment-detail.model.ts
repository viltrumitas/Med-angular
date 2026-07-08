import { Assignment } from './assignment.model';
import { AssignedCase } from './assigned-case.model';
import { ClassroomSummaryModel } from './classroom-summary.model';


export interface AssignmentDetail extends Assignment {

  classroom: ClassroomSummaryModel;
  assignedCases: AssignedCase[];

}