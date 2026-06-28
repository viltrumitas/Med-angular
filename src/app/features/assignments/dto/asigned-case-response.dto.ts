import { UserModel } from "../../../shared/models/user.model";
import { CaseResponseDto } from "../../cases/dto/case-response.dto"; 

export interface AssignedCaseResponseDto {
  id: string;

  student: UserModel;

  case: CaseResponseDto;

  submissionId: string | null;

  assignedAt: string;
}