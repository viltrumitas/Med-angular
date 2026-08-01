import { SubmissionTiming } from "../enum/submission-timing";
import { SubmissionStatus } from "./submission-status.enum";

export interface AssignedSubmission {
  id: string;
  status: SubmissionStatus;

  submissionTiming: SubmissionTiming;

  submittedAt: string;

  reviewId: string | null;
}
