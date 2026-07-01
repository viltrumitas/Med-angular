import { Assignment } from '../../assignments/models/assignment.model';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { AssignedCaseSubmission } from '../../../core/models/assigned-case-submission.model';

export interface AssignedStudentCase {
  id: string;
  assignment: Assignment;
  case: CaseResponseDto;
  submission: AssignedCaseSubmission | null;
  assignedAt: Date;
}
