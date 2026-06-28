import { AssignmentResponseDto } from "./assignment-response.dto";
import { AssignedCaseResponseDto } from "./asigned-case-response.dto";

export interface AssignmentDetailResponseDto extends AssignmentResponseDto {
  assignedCases: AssignedCaseResponseDto[];
}