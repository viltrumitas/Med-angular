import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { AssignedSubmission } from '../../../core/models/assigned-submission.model';
import { User } from '../../../core/models/user.model';

export interface AssignedCase {
  id: string;

  student: User;

  case: CaseResponseDto;

  submission: AssignedSubmission | null;

  assignedAt: string;
}
