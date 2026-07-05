import { Priority } from '../../../core/enum/priority.enum';
import { SubmissionStatus } from '../../../core/models/submission-status.enum';
import { User } from '../../../core/models/user.model';
import { Assignment } from '../../assignments/models/assignment.model';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';

export interface SubmissionModel {
  id: string;

  reviewId: string | null;

  student: User;

  assignment: Assignment;

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
