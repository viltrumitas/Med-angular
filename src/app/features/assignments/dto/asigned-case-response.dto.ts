import { UserModel } from "../../../shared/models/user.model";
import { CaseModel } from "../../cases/models/case-response.model";

export interface AssignedCaseResponseDto {
  id: string;

  student: UserModel;

  case: CaseModel;

  submissionId: string | null;

  assignedAt: string;
}