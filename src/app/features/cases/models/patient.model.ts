export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface PatientModel {
  patientName: string;
  gender: Gender;
  age: number;
  medicalHistory: string[];
  medications: string;
}
