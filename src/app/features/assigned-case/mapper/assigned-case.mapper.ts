import { AssignedCaseDto } from '../dto/assigned-case.dto';
import { AssignedStudentCase } from '../model/assigned-case.model';

export class AssignedCaseMapper {
  static toModel(dto: AssignedCaseDto): AssignedStudentCase {
    return {
      id: dto.id,
      assignment: dto.assignment,
      case: dto.case,
      submission: dto.submission,
      assignedAt: new Date(dto.assignedAt),
    };
  }
}
