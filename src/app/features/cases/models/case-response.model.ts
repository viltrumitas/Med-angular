import { TeacherModel } from './teacher-response.model';
import { CincinnatiModel } from './cincinnati.model';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface CaseModel {
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

  isPublished: boolean | null;

  createdAt: string;
  updatedAt: string;
}
