import { TeacherModel } from './teacher-response.dto';
import { CincinnatiModel } from '../models/cincinnati.model';
import { Gender } from '../models/patient.model';
import { Area } from '../models/area.model';

export interface CaseResponseDto {
  id: string;

  title: string | null;

  teacher: TeacherModel | null;

  consult: string | null;
  scenery: string | null;

  patientName: string | null;
  gender: Gender | null;
  age: number | null;

  medicalHistory: string[] | null;
  medications: string | null;

  generalFindings: string | null;

  ta: string | null;
  fc: number | null;
  fr: number | null;
  spo2: number | null;
  glucose: number | null;
  temperature: number | null;
  capillaryFiller: number | null;

  cincinnati: CincinnatiModel | null;

  glasgow: number | null;

  area: Area;

  isPublished: boolean | null;

  createdAt: string;
  updatedAt: string;
}
