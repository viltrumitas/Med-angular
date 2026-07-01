import { AssignedCaseSubmission } from '../../../core/models/assigned-case-submission.model';
import { AssignmentResponseDto } from '../../assignments/dto/assignment-response.dto';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export interface AssignedCaseDto {
  id: string;
  assignment: AssignmentResponseDto;
  case: CaseResponseDto;
  submission: AssignedCaseSubmission | null;
  assignedAt: string;
}
