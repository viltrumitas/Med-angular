import { User } from '../../../core/models/user.model';
import { AssignmentResponseDto } from '../../assignments/dto/assignment-response.dto';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { SubmissionStatus } from './submission.model';

export interface SubmissionsListItem {
  id: string;

  reviewId: string;

  student: User;

  assignment: AssignmentResponseDto;
  case: CaseResponseDto;

  status: SubmissionStatus;
  createdAt: Date;
}
