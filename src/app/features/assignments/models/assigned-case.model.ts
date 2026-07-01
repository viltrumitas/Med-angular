import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { UserModel } from '../../../shared/models/user.model';
import { AssignedSubmission } from '../../../core/models/assigned-submission.model';

export interface AssignedCase {
  id: string;

  student: UserModel;

  case: CaseResponseDto;

  submission: AssignedSubmission | null;

  assignedAt: string;
}
