import { User } from '../../../core/models/user.model';
import { AssignmentResponseDto } from '../../assignments/dto/assignment-response.dto';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export type SubmissionStatus = 'DRAFT' | 'SUBMITTED';

export type Priority = 'GREEN' | 'YELLOW' | 'RED' | 'BLACK';

export interface SubmissionResponseDto {
  id: string;

  reviewId: string;

  student: User;

  assignment: AssignmentResponseDto;
  case: CaseResponseDto;

  sceneManagement: string;
  sss: string;
  primaryTest: string;
  sample: string;
  opqrst: string;
  presumptiveDiagnosis: string;
  priority: Priority;
  transferDecision: boolean;
  treatmentPlan: string;
  reportPatient: string;
  status: SubmissionStatus;

  createdAt: Date;
  updatedAt: Date;
}
