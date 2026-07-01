import { SubmissionStatus } from './submission-status.enum';

export interface AssignedCaseSubmission {
  id: string;
  status: SubmissionStatus;
}
