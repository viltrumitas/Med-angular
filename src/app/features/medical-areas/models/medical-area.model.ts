export interface MedicalArea {
  id: string;

  name: string;

  description: string | null;

  casesCount: number;

  canDelete: boolean;

  createdAt: Date;

  updatedAt: Date;
}