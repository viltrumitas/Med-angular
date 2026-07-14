import { Assignment } from './assignment.model';
import { AssignedCase } from './assigned-case.model';
import { ClassroomSummaryModel } from './classroom-summary.model';

export interface AssignmentDetail extends Assignment {
  classroom: ClassroomSummaryModel;
  assignedCases: AssignedCase[];
}

export interface StudentAssignmentDetailModel {
  id: string;

  title: string;

  description: string | null;
  
  classroom: {
    id: string;
    name: string;
  }

  assignedCases: {
    id: string;

    case: {
      id: string;
      title: string;
    };

    submission: {
      id: string;
      status: 'DRAFT' | 'SUBMITTED' | 'REVIEWED';
    } | null;

    assignedAt: string;
  }[];
}