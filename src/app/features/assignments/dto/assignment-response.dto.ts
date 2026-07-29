import { LateSubmissionPolicy } from '../../../core/enum/late-submission-policy';
import { TeacherModel } from '../../cases/dto/teacher-response.dto';
import { ClassroomResponseDto } from '../../classroom/dto/classroon-response.dto';

export interface AssignmentResponseDto {
  id: string;

  title: string;

  description: string | null;

  classroom: ClassroomResponseDto;

  isPublished: boolean;

  dueDate: string | null;

  lateSubmissionPolicy: LateSubmissionPolicy;

  createdAt: string;

  updatedAt: string;
}
