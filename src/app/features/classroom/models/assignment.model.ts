import { LateSubmissionPolicy } from '../../../core/enum/late-submission-policy';
import { ClassroomSummaryModel } from './classroom-summary.model';

export interface Assignment {
  id: string;

  title: string;

  description: string | null;

  classroom: ClassroomSummaryModel;

  isPublished: boolean;

  dueDate: string | null;

  lateSubmissionPolicy: LateSubmissionPolicy;

  createdAt: string;

  updatedAt: string;
}
