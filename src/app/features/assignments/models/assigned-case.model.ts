
import { CaseModel } from "../../cases/models/case-response.model";
import { UserModel } from "../../../shared/models/user.model";

export interface AssignedCase {
  id: string;

  student: UserModel;

  case: CaseModel;

  submissionId: string | null;

  assignedAt: string;
}