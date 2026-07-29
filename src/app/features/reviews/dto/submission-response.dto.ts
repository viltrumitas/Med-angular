import { Priority } from '../../../core/enum/priority.enum';
import { SubmissionTiming } from '../../../core/enum/submission-timing';
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

  submissionTiming: SubmissionTiming;

  submittedAt: string | null;

  createdAt: Date;
  updatedAt: Date;
}
