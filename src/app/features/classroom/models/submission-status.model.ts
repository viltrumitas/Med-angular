import { SubmissionTiming } from "../../../core/enum/submission-timing";
import { SubmissionStatus } from "../../../core/models/submission-status.enum";

export interface SubmissionStatusModel {
  id: string;

  status: SubmissionStatus;

  submissionTiming: SubmissionTiming;

  submittedAt: string;

  reviewId: string | null;
}
