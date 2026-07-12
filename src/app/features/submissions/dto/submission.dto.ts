import { Priority } from '../../../core/enum/priority.enum';

export interface SubmissionDto {
  sceneManagement?: string;
  sss?: string;
  primaryTest?: string;
  sample?: string;
  opqrst?: string;
  presumptiveDiagnosis?: string;
  priority?: Priority | null;
  transferDecision?: boolean;
  treatmentPlan?: string;
  reportPatient?: string;
}
