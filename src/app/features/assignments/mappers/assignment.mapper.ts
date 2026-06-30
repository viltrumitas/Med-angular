import { AssignmentResponseDto } from '../dto/assignment-response.dto';
import { AssignmentDetailResponseDto } from '../dto/assignment-detail-response.dto';
import { AssignedCaseResponseDto } from '../dto/asigned-case-response.dto';

import { Assignment } from '../models/assignment.model';
import { AssignmentListItem } from '../models/assignment-list.model';
import { AssignmentDetail } from '../models/assignment-detail.model';
import { AssignedCase } from '../models/assigned-case.model';

export class AssignmentMapper {

  static toModel(dto: AssignmentResponseDto): Assignment {
    return {
      id: dto.id,

      title: dto.title,

      description: dto.description,

      teacher: dto.teacher,

      isPublished: dto.isPublished,

      createdAt: dto.createdAt,

      updatedAt: dto.updatedAt,
    };
  }

  static toListItem(dto: AssignmentResponseDto): AssignmentListItem {
    return {
      id: dto.id,

      title: dto.title,

      teacher: dto.teacher,

      isPublished: dto.isPublished,

      createdAt: dto.createdAt,

      updatedAt: dto.updatedAt,
    };
  }

  static toAssignedCase(
    dto: AssignedCaseResponseDto,
  ): AssignedCase {
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

  static toDetail(
    dto: AssignmentDetailResponseDto,
  ): AssignmentDetail {
    return {
      ...AssignmentMapper.toModel(dto),

      assignedCases: dto.assignedCases.map(
        AssignmentMapper.toAssignedCase,
      ),
    };
  }
}