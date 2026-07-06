import { OpqrstModel, SamplerModel } from "../models/anamnesis.model";
import { FocusedAssessmentModel } from "../models/focusedAssessment.model";
import { OtherInterventionsModel } from "../models/otherInterventions.model";
import { PatientPriorityModel } from "../models/patientPriority.model";
import { PhysicalExaminationModel } from "../models/physicalExamination.model";
import { PrimaryAssessmentModel } from "../models/primaryAssessment.model";
import { SceneManagementModel } from "../models/sceneManagment.model";
import { VitalSignsModel } from "../models/vitalSigns.model";

export interface CreateReviewModel {
  sceneManagement: SceneManagementModel;
  primaryAssessment: PrimaryAssessmentModel;
  patientPriority: PatientPriorityModel;
  vitalSigns: VitalSignsModel;
  focusedAssessment: FocusedAssessmentModel;
  physicalExamination: PhysicalExaminationModel;
  sampler: SamplerModel;
  opqrst: OpqrstModel;
  otherInterventions: OtherInterventionsModel;
  
  feedback?: string;
}