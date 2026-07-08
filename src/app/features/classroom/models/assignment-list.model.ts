import { TeacherModel } from '../../cases/dto/teacher-response.dto';
import { ClassroomSummaryModel } from './classroom-summary.model';

export interface AssignmentListItem {
  id: string;
  title: string;

  description: string | null;

  classroom: ClassroomSummaryModel;

  isPublished: boolean;

  createdAt: string;
  updatedAt: string;
}
