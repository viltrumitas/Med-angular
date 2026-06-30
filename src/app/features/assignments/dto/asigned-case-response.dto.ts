import { UserModel } from '../../../shared/models/user.model';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export interface AssignedCaseSubmissionDto {
  id: string;
  status: 'DRAFT' | 'SUBMITTED';
}

export interface AssignedCaseResponseDto {
  id: string;

  student: UserModel;

  case: CaseResponseDto;

  submission: AssignedCaseSubmissionDto | null;

  assignedAt: string;
}
