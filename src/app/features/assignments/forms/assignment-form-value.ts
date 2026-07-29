import { LateSubmissionPolicy } from "../../../core/enum/late-submission-policy";

export interface AssignmentFormValue {
  title: string;
  description: string;
  caseIds: string[];

  hasDueDate: boolean;
  dueDate: string | null;
  
  lateSubmissionPolicy: LateSubmissionPolicy;
}