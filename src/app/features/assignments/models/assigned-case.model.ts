import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { UserModel } from '../../../shared/models/user.model';

export interface AssignedCaseSubmission {
  id: string;
  status: 'DRAFT' | 'SUBMITTED';
}

export interface AssignedCase {
  id: string;

  student: UserModel;

  case: CaseResponseDto;

  submission: AssignedCaseSubmission | null;

  assignedAt: string;
}
