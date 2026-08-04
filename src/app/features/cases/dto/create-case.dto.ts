import { GeneralFindingsModel } from '../models/general-findings.model';
import { GeneralInfoModel } from '../models/general-info.model';
import { PatientModel } from '../models/patient.model';
import { VitalSignsModel } from '../models/vital-signs.model';
import { NeurologicalModel } from '../models/neurological.model';
import { PublishModel } from './publish.dto';

export interface CreateCaseModel {
  general: GeneralInfoModel | null;
  patient: PatientModel | null;
  findings: GeneralFindingsModel;
  vitalSigns: VitalSignsModel;
  neurological: NeurologicalModel;
  medicalAreaId: string;
  publishCase: PublishModel;
  feedback: string | null;
}
