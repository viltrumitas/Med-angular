import { Priority } from '../../../core/enum/priority.enum';

export interface SubmissionDto {
  sceneManagnment?: string;
  sss?: string;
  primaryTest?: string;
  sample?: string;
  opqrst?: string;
  presumptiveDiagnosis?: string;
  priority?: Priority;
  transferDecision?: boolean;
  treatmentPlan?: string;
  reportPatient?: string;
}
