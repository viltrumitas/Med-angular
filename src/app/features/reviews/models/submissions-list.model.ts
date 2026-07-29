import { SubmissionTiming } from '../../../core/enum/submission-timing';
import { SubmissionStatus } from '../../../core/models/submission-status.enum';
import { User } from '../../../core/models/user.model';
import { AssignmentResponseDto } from '../../assignments/dto/assignment-response.dto';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export interface SubmissionsListItem {
  id: string;

  assignedCaseId: string; 

  reviewId: string;

  student: User;

  assignment: AssignmentResponseDto;
  case: CaseResponseDto;

  submissionTiming: SubmissionTiming;

  submittedAt: string | null;

  status: SubmissionStatus;
  createdAt: Date;
}
