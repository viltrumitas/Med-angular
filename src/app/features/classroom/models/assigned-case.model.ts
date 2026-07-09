import { SubmissionStatusModel } from './submission-status.model';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { User } from '../../../core/models/user.model';

export interface AssignedCase {
  id: string;

  student: User;

  case: CaseResponseDto;

  submission: SubmissionStatusModel | null;

  assignedAt: string;
}
