import { ClassroomSummaryModel } from './classroom-summary.model';

export interface Assignment {
  id: string;

  title: string;

  description: string | null;

  classroom: ClassroomSummaryModel;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
}
