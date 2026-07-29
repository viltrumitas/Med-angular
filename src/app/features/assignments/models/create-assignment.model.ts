import { LateSubmissionPolicy } from "../../../core/enum/late-submission-policy";

export interface CreateAssignment {
  title: string;

  description?: string;

  caseIds: string[];

  dueDate?: string;

  lateSubmissionPolicy?: LateSubmissionPolicy;
}