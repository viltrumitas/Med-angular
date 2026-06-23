import { GeneralFindingsModel } from './general-findings.model';
import { GeneralInfoModel } from './general-info.model';
import { PatientModel } from './patient.model';
import { VitalSignsModel } from './vital-signs.model';
import { NeurologicalModel } from './neurological.model';
import { PublishModel } from './publish.model';

export interface CaseModel {
  general: GeneralInfoModel;
  patient: PatientModel;
  findings: GeneralFindingsModel;
  vitalSigns: VitalSignsModel;
  neurological: NeurologicalModel;
  publishCase: PublishModel;

  feedback: string;
  createdAt: string;
}
