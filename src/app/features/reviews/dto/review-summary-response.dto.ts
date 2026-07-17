import { User } from "../../../core/models/user.model";
import { CaseSummaryModel } from "../../cases/dto/case-summary.dto";
import { TeacherModel } from "../../cases/dto/teacher-response.dto";
import { AssignmentSummaryModel } from "../../classroom/models/assignment-summary.model";

export interface ReviewSummaryResponseDto {
  id: string;

  case: CaseSummaryModel;

  teacher: TeacherModel;

  student: User;

  assignment: AssignmentSummaryModel;

  totalScore: number;

  createdAt: Date;
}