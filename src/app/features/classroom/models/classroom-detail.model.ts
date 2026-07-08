import { ClassroomModel } from "./classroom.model";
import { AssignmentSummaryModel } from "./assignment-summary.model";
import { User } from "../../../core/models/user.model";

export interface ClassroomDetailModel extends ClassroomModel {

  assignments: AssignmentSummaryModel[];

  students: User[];
}