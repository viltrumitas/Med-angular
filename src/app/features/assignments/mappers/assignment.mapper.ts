import { AssignmentResponseDto } from '../dto/assignment-response.dto';
import { AssignmentDetailResponseDto } from '../dto/assignment-detail-response.dto';
import { AssignedCaseResponseDto } from '../dto/asigned-case-response.dto';

import { Assignment } from '../../classroom/models/assignment.model';
import { AssignmentListItem } from '../../classroom/models/assignment-list.model';
import { AssignmentDetail } from '../../classroom/models/assignment-detail.model'; 
import { AssignedCase } from '../../classroom/models/assigned-case.model';
import { mapCreateClassroom } from '../../classroom/mappers/map-clasroom.mapper';

export class AssignmentMapper {
  static toModel(dto: AssignmentResponseDto): Assignment {
    return {
      id: dto.id,

      title: dto.title,

      description: dto.description,

      classroom: dto.classroom,

      isPublished: dto.isPublished,

      createdAt: dto.createdAt,

      updatedAt: dto.updatedAt,
    };
  }

  static toListItem(dto: AssignmentResponseDto): AssignmentListItem {
    return {
      id: dto.id,

      title: dto.title,

      description: dto.description,

      classroom: dto.classroom,

      isPublished: dto.isPublished,

      createdAt: dto.createdAt,

      updatedAt: dto.updatedAt,
    };
  }
  static toAssignedCase(dto: AssignedCaseResponseDto): AssignedCase {
    return {
      id: dto.id,

      student: dto.student,

      case: dto.case,

      submission: dto.submission
        ? {
            id: dto.submission.id,
            status: dto.submission.status,
          }
        : null,

      assignedAt: dto.assignedAt,
    };
  }

  static toDetail(dto: AssignmentDetailResponseDto): AssignmentDetail {
    return {
      ...AssignmentMapper.toModel(dto),

      assignedCases: dto.assignedCases.map(AssignmentMapper.toAssignedCase),
    };
  }
}
