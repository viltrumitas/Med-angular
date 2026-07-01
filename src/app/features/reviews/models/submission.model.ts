import { UserModel } from '../../../shared/models/user.model';

import { Assignment } from '../../assignments/models/assignment.model';
import { CaseResponseDto } from '../../cases/dto/case-response.dto'; 

export type SubmissionStatus =
  | 'DRAFT'
  | 'SUBMITTED';

export type Priority =
  | 'GREEN'
  | 'YELLOW'
  | 'RED'
  | 'BLACK';

export interface SubmissionModel {

  id: string;

  reviewId: string | null;

  student: UserModel;

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