import { Priority } from '../../../core/enum/priority.enum';
import { SubmissionStatus } from '../../../core/models/submission-status.enum';
import { User } from '../../../core/models/user.model';
import { AssignmentResponseDto } from '../../assignments/dto/assignment-response.dto';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export interface SubmissionResponseDto {
  id: string;

  reviewId: string;

  student: User;

  assignment: AssignmentResponseDto;
  case: CaseResponseDto;
  sceneManagment?: string | null;
  sss?: string | null;
  primaryTest?: string | null;
  sample?: string | null;
  opqrst?: string | null;
  presumptiveDiagnosis?: string | null;
  priority?: Priority | null;
  transferDecision?: boolean | null;
  treatmentPlan?: string | null;
  reportPatient?: string | null;
  status: SubmissionStatus | null;

  createdAt: Date;
  updatedAt: Date;
}
