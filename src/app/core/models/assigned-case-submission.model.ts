import { SubmissionTiming } from '../enum/submission-timing';
import { SubmissionStatus } from './submission-status.enum';

export interface AssignedCaseSubmission {
  id: string;
  status: SubmissionStatus;
  submissionTiming: SubmissionTiming;
}
