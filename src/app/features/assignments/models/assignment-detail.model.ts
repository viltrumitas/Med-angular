import { AssignedCase } from "./assigned-case.model";
import { Assignment } from "./assignment.model";

export interface AssignmentDetail extends Assignment {
  assignedCases: AssignedCase[];
}