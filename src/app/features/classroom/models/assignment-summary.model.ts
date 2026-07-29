import { LateSubmissionPolicy } from "../../../core/enum/late-submission-policy";

export interface AssignmentSummaryModel {
  id: string;

  title: string;

  description: string | null;

  isPublished: boolean;

  dueDate: string | null;

  lateSubmissionPolicy: LateSubmissionPolicy;

  createdAt: string;

  updatedAt: string;
}
