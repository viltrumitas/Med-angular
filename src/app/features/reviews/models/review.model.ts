import { TeacherModel } from '../../cases/dto/teacher-response.dto';

import { SceneManagementModel } from './sceneManagment.model';
import { PrimaryAssessmentModel } from './primaryAssessment.model';
import { PatientPriorityModel } from './patientPriority.model';
import { VitalSignsModel } from './vitalSigns.model';
import { FocusedAssessmentModel } from './focusedAssessment.model';
import { PhysicalExaminationModel } from './physicalExamination.model';
import { SamplerModel } from './anamnesis.model';
import { OpqrstModel } from './anamnesis.model';
import { OtherInterventionsModel } from './otherInterventions.model';
import { User } from '../../../core/models/user.model';

export interface ReviewModel {
  id: string;

  caseId: string;

  teacher: TeacherModel;

  student: User;

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
