export type Gender = 'MALE' | 'FAMELE' | 'OTHER';

export interface PatientModel {
  patientName: string;
  gender: Gender;
  age: number;
  medicalHistory: string[];
  medications: string;
}
