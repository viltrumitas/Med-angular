import { User } from "../../../core/models/user.model";
import { AssignmentResponseDto } from "../../assignments/dto/assignment-response.dto";
import { CaseResponseDto } from "../../cases/dto/case-response.dto";
import { TeacherModel } from "../../cases/dto/teacher-response.dto";
import { OpqrstModel, SamplerModel } from "../models/anamnesis.model";
import { FocusedAssessmentModel } from "../models/focusedAssessment.model";
import { OtherInterventionsModel } from "../models/otherInterventions.model";
import { PatientPriorityModel } from "../models/patientPriority.model";
import { PhysicalExaminationModel } from "../models/physicalExamination.model";
import { PrimaryAssessmentModel } from "../models/primaryAssessment.model";
import { SceneManagementModel } from "../models/sceneManagment.model";
import { VitalSignsModel } from "../models/vitalSigns.model";

export interface ReviewResponseDto {
  id: string;
  caseId: string;

  teacher: TeacherModel;
  student: User;

  case: CaseResponseDto;
  assignment: AssignmentResponseDto;

  sceneManagement: SceneManagementModel;
  primaryAssessment: PrimaryAssessmentModel;
  patientPriority: PatientPriorityModel;
  vitalSigns: VitalSignsModel;
  focusedAssessment: FocusedAssessmentModel;
  physicalExamination: PhysicalExaminationModel;
  sampler: SamplerModel;
  opqrst: OpqrstModel;
  otherInterventions: OtherInterventionsModel;
  totalScore: number;
  feedback: string | null;
  createdAt: Date;
}
