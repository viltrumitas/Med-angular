import { Priority } from '../../../core/enum/priority.enum';
import { SubmissionStatus } from '../../../core/models/submission-status.enum';
import { AssignmentResponseDto } from '../../assignments/dto/assignment-response.dto';
import { CaseResponseDto } from '../../cases/dto/case-response.dto';
import { StudentResponseDto } from '../models/student.response.model';

export interface SubmissionResponseDto {
  id: string;

  reviewed: string;

  student: StudentResponseDto;

  assigment: AssignmentResponseDto;
  case: CaseResponseDto;
  sceneManagement?: string | null;
  sss?: string | null;
  primaryTest?: string | null;
  sample?: string | null;
  opqrst?: string | null;
  presumptiveDiagnosis?: string | null;
  priority?: Priority | null;
  transferDecision?: boolean | null;
  treatmentPlan?: string | null;
  reportPatient?: string | null;
  status?: SubmissionStatus | null;

  createdAt: Date;
  updateAt: Date;
}
