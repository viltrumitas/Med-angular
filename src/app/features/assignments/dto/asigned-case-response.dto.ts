import { AssignedSubmission } from '../../../core/models/assigned-submission.model';
import { User } from '../../../core/models/user.model';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export interface AssignedCaseResponseDto {
  id: string;

  student: User;

  case: CaseResponseDto;

  submission: AssignedSubmission | null;

  assignedAt: string;
}
