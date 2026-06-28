
import { CaseResponseDto } from "../../cases/dto/case-response.dto"; 
import { UserModel } from "../../../shared/models/user.model";

export interface AssignedCase {
  id: string;

  student: UserModel;

  case: CaseResponseDto;

  submissionId: string | null;

  assignedAt: string;
}